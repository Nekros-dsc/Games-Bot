const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('minesweeper')
    .setDescription('Jouer au démineur')
}