const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('find')
    .setDescription('find')
    .addSubcommandGroup(s =>
        s
        .setName('the')
        .setDescription('the')
        .addSubcommand(s =>
            s
            .setName('emoji')
            .setDescription('Jouer Trouver le jeu Emoji')))
}