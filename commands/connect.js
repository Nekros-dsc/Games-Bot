const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('connect')
    .setDescription('Jouer à Connect 4 avec un ami')
    .addSubcommand(s =>
        s
        .setName('4')
        .setDescription('Jouer à Connect 4 avec des amis')
        .addUserOption(o =>
            o
            .setName('user')
            .setDescription('Fournir un adversaire avec qui jouer')
            .setRequired(true)))
}