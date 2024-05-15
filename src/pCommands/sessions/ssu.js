const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "ssuvote",

    async execute(message) {
        const roleId1 = '1211161267864338433'; 

        if (
            !message.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        await message.delete();

        const embed = new EmbedBuilder()
        .setTitle("** <:isrp:1211196186657038336> | Session Vote**")
        .setDescription("<:pin:1211190555996852325> Vote below for a session startup to commence!\n\nRequired votes: **__7__**")
        .setColor("#1f53bb")
        .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=66294b95&is=6627fa15&hm=ae8716a932cb288f6ab3ddceecf9d5c9ebcb8b6b2c0a03868ef587e155000796&")
        .setImage("https://cdn.discordapp.com/attachments/1211161269772615699/1211164126764867645/Sessions.png?ex=6629d87e&is=662886fe&hm=e2ab641b317599327ff986efd51a557d79f99e4d9e5b7bf614e87ad6ae5844d8&");


        const button = new ButtonBuilder()
        .setLabel("0 Votes")
        .setCustomId("sessionVoteButton")
        .setStyle(ButtonStyle.Primary)

        const button2 = new ButtonBuilder()
        .setLabel("View Votes")
        .setCustomId("viewVotesButton")
        .setStyle(ButtonStyle.Success)

        const row = new ActionRowBuilder().addComponents(button, button2);

        await message.channel.send({ content: "@here", embeds: [embed], components: [row] });
    },
};