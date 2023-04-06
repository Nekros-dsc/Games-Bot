const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Jouer à Trivia')
}