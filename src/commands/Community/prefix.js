const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("prefix")
    .setDescription("View the bot's prefix. This can be edited in the dashboard."),

    async execute(interaction) {

        let currentPrefix = config.prefix;

        interaction.reply({ content: `The current prefix is: **${currentPrefix}**`});
    },
};