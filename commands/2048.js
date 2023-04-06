const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('2048')
    .setDescription('Jouer à 2048')
}