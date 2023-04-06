const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rock')
    .setDescription('rock')
    .addSubcommandGroup(s =>
        s
        .setName('paper')
        .setDescription('paper')
        .addSubcommand(s =>
            s
            .setName('scissors')
            .setDescription('Jouer Rock papier ciseaux jeu')
            .addUserOption(o =>
                o
                .setName('user')
                .setDescription('Fournir un utilisateur avec qui jouer')
                .setRequired(true))))
}