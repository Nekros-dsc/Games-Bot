const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('Jouer à Snake')
}