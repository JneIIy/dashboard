const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { getPlayers } = require("../../api");

module.exports = {
    name: "ssu",

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
            .setTitle("** <:isrp:1211196186657038336> | Server Startup**")
            .setDescription(`**<:pin:1211190555996852325> We have now started our in game server up, join for a quality roleplay experience!**\n\n\n**:video_game: | Information**\n**Server Name:** \`Illinois State Roleplay I Strict I Custom I A\`\n**Server Owner:** \`Lionsdovewwe2\`\n**Join Code:** \`ISRP\``)
            .setColor("#1f53bb")
            .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=66294b95&is=6627fa15&hm=ae8716a932cb288f6ab3ddceecf9d5c9ebcb8b6b2c0a03868ef587e155000796&")
            .setImage("https://cdn.discordapp.com/attachments/1211161269772615699/1211164127892873296/Startup.png?ex=6629d87e&is=662886fe&hm=e4dc6aff1513064559a2b613fde66e897e425dfb49debe3c807767b949addd13&");

        const button = new ButtonBuilder()
            .setLabel("Quick Join")
            .setStyle(ButtonStyle.Link)
            .setURL("https://policeroleplay.community/join/ISRP");

        let playerCount;
        const serverKey = "GLukvbbgOe-QbtGuURyPPnfEXxEpVNgAiOHXUsWdyVQKkBOkHec";
        const response = await getPlayers(serverKey);
        playerCount = response.length;

        const button2 = new ButtonBuilder()
            .setLabel(`${playerCount}/40 Players`)
            .setStyle(ButtonStyle.Secondary)
            .setCustomId("playerCountButton")
            .setDisabled(true);

        const row1 = new ActionRowBuilder().addComponents(button, button2);
        const sentMessage = await message.channel.send({ content: `<@&1211161267692245053>`, embeds: [embed], components: [row1] });

        setInterval(async () => {
            const response = await getPlayers(serverKey);
            playerCount = response.length;

            const button = new ButtonBuilder()
                .setLabel("Quick Join")
                .setStyle(ButtonStyle.Link)
                .setURL("https://policeroleplay.community/join/ISRP");

            const newButton2 = new ButtonBuilder(button2)
                .setLabel(`${playerCount}/40 Players`)
                .setStyle(ButtonStyle.Secondary)
                .setCustomId("playerCountButton")
                .setDisabled(true);

            const updatedRow = new ActionRowBuilder().addComponents(button, newButton2);

            sentMessage.edit({ components: [updatedRow] });
        }, 180000);
    },
};