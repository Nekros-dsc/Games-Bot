const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wordle')
    .setDescription('Jouer à Wordle')
}