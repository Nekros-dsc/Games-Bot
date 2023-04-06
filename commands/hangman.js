const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hangman')
    .setDescription('Jouer à Hangman')
}