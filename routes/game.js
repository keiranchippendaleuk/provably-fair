/*

 ________  ________  ________  ___      ___ ________  ________  ___           ___    ___      ________ ________  ___  ________          ________       ___    ___ ________  _________  _______   _____ ______           ________      ___    ___      ________        ___  ___  __    _______   ___  ________  ________  ________       ________  ________      ___  ___  ___  __       
|\   __  \|\   __  \|\   __  \|\  \    /  /|\   __  \|\   __  \|\  \         |\  \  /  /|    |\  _____\\   __  \|\  \|\   __  \        |\   ____\     |\  \  /  /|\   ____\|\___   ___\\  ___ \ |\   _ \  _   \        |\   __  \    |\  \  /  /|    |\   ___ \      |\  \|\  \|\  \ |\  ___ \ |\  \|\   __  \|\   __  \|\   ___  \    |\   ____\|\   __  \    |\  \|\  \|\  \|\  \     
\ \  \|\  \ \  \|\  \ \  \|\  \ \  \  /  / | \  \|\  \ \  \|\ /\ \  \        \ \  \/  / /    \ \  \__/\ \  \|\  \ \  \ \  \|\  \       \ \  \___|_    \ \  \/  / | \  \___|\|___ \  \_\ \   __/|\ \  \\\__\ \  \       \ \  \|\ /_   \ \  \/  / /    \ \  \_|\ \     \ \  \ \  \/  /|\ \   __/|\ \  \ \  \|\  \ \  \|\  \ \  \\ \  \   \ \  \___|\ \  \|\  \   \ \  \\\  \ \  \/  /|_   
 \ \   ____\ \   _  _\ \  \\\  \ \  \/  / / \ \   __  \ \   __  \ \  \        \ \    / /      \ \   __\\ \   __  \ \  \ \   _  _\       \ \_____  \    \ \    / / \ \_____  \   \ \  \ \ \  \_|/_\ \  \\|__| \  \       \ \   __  \   \ \    / /      \ \  \ \\ \  __ \ \  \ \   ___  \ \  \_|/_\ \  \ \   _  _\ \   __  \ \  \\ \  \   \ \  \    \ \  \\\  \   \ \  \\\  \ \   ___  \  
  \ \  \___|\ \  \\  \\ \  \\\  \ \    / /   \ \  \ \  \ \  \|\  \ \  \____    \/  /  /        \ \  \_| \ \  \ \  \ \  \ \  \\  \|       \|____|\  \    \/  /  /   \|____|\  \   \ \  \ \ \  \_|\ \ \  \    \ \  \       \ \  \|\  \   \/  /  /        \ \  \_\\ \|\  \\_\  \ \  \\ \  \ \  \_|\ \ \  \ \  \\  \\ \  \ \  \ \  \\ \  \ __\ \  \____\ \  \\\  \ __\ \  \\\  \ \  \\ \  \ 
   \ \__\    \ \__\\ _\\ \_______\ \__/ /     \ \__\ \__\ \_______\ \_______\__/  / /           \ \__\   \ \__\ \__\ \__\ \__\\ _\         ____\_\  \ __/  / /       ____\_\  \   \ \__\ \ \_______\ \__\    \ \__\       \ \_______\__/  / /           \ \_______\ \________\ \__\\ \__\ \_______\ \__\ \__\\ _\\ \__\ \__\ \__\\ \__\\__\ \_______\ \_______\\__\ \_______\ \__\\ \__\
    \|__|     \|__|\|__|\|_______|\|__|/       \|__|\|__|\|_______|\|_______|\___/ /             \|__|    \|__|\|__|\|__|\|__|\|__|       |\_________\\___/ /       |\_________\   \|__|  \|_______|\|__|     \|__|        \|_______|\___/ /             \|_______|\|________|\|__| \|__|\|_______|\|__|\|__|\|__|\|__|\|__|\|__| \|__\|__|\|_______|\|_______\|__|\|_______|\|__| \|__|
                                                                            \|___|/                                                       \|_________\|___|/        \|_________|                                                    \|___|/                                                                                                                                             
                                                                                                                                                                                                                                                                                                                                                                                        
                                                                                                                                                                                                                                                                                                                                                                                        

Provably fair system made by djkeiran.co.uk (c) 2020 - present
License: GNU Affero General Public License v3.0
Author: djkeiran.co.uk
*/
const express = require('express');
const crypto = require('crypto');
const GameResult = require('../models/GameResult');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const latestGame = await GameResult.findOne({}, {}, { sort: { nonce: -1 } });
        const nonce = latestGame ? latestGame.nonce + 1 : 0;

        const serverSeed = await getServerSeed();

        const clientSeed = crypto.randomBytes(8).toString('hex');
        const gameInput = clientSeed + serverSeed + nonce;
        const result = crypto.createHash('sha256').update(gameInput).digest('hex');

        const gameResult = new GameResult({
            gameId: crypto.randomBytes(8).toString('hex'),
            clientSeed,
            serverSeed,
            nonce,
            result,
        });
        await gameResult.save();

        await LogGameResult(gameResult);

        res.json({ gameId: gameResult.gameId, clientSeed: gameResult.clientSeed, serverSeed: gameResult.serverSeed, nonce: gameResult.nonce, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:gameId', async (req, res) => {
    const { gameId } = req.params;

    try {
        const gameResult = await GameResult.findOne({ gameId });

        if (!gameResult) {
            res.status(404).json({ error: 'Game not found' });
            return;
        }

        const gameInput = gameResult.clientSeed + gameResult.serverSeed + gameResult.nonce;
        const result = crypto.createHash('sha256').update(gameInput).digest('hex');

        if (result === gameResult.result) {
            res.json({ valid: true,  gameId: gameResult.gameId, clientSeed: gameResult.clientSeed, serverSeed: gameResult.serverSeed, nonce: gameResult.nonce });
        } else {
            res.json({ valid: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

async function getServerSeed() {
    return crypto.randomBytes(16).toString('hex');
}

async function LogGameResult(gameResult) {
    try {
        console.log('Game Result:', gameResult);
    } catch (error) {
        console.error('Failed to log game result:', error);
    }
}

module.exports = router;
