const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('tic')
    .setDescription('tic')
    .addSubcommandGroup(s =>
        s
        .setName('tac')
        .setDescription('tac')
        .addSubcommand(s =>
            s
            .setName('toe')
            .setDescription('Jouer au jeu Tic Tac Toe')
            .addUserOption(o =>
                o
                .setName('user')
                .setDescription('Fournir un utilisateur avec qui jouer')
                .setRequired(true))))
}