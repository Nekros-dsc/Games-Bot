const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('would')
    .setDescription('would')
    .addSubcommandGroup(s =>
        s
        .setName('you')
        .setDescription('you')
        .addSubcommand(s =>
            s
            .setName('rather')
            .setDescription('Jouer à Would')))
}