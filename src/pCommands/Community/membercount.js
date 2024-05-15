const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "membercount",
    aliases: ["mc"],

    async execute(message) {

        const members = message.guild.memberCount;
        const boosters = message.guild.premiumSubscriptionCount;

        const membercountEmbed = new EmbedBuilder()
            .setAuthor({
                name: message.guild.name,
                iconURL: message.guild.iconURL(),
            })
            .setColor("#2c2d31")
            .addFields(
                { name: "Membercount", value: `${members}`, inline: true },
                { name: "Boosters", value: `${boosters}`, inline: true },
            );

        message.channel.send({ embeds: [membercountEmbed] });
    },
};