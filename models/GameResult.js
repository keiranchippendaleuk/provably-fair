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
const mongoose = require('mongoose');

const gameResultSchema = new mongoose.Schema({
  gameId: String,
  clientSeed: String,
  serverSeed: String,
  nonce: Number,
  result: String,
});

module.exports = mongoose.model('GameResult', gameResultSchema);
