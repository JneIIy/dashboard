const { PermissionsBitField, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");

module.exports = {
    name: "information",
    aliases: ["info"],

    async execute(message, client) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("<:checkx:1233193269966667797> You do not have permission to use this command.");
        }

        await message.delete();


        const embed = new EmbedBuilder()
            .setColor('#2c2d31')
            .setImage('https://cdn.discordapp.com/attachments/1039052043450593281/1142884286232539256/Your_paragraph_text_7.png?ex=662e91ef&is=661c1cef&hm=82a3f6a884cad81a393826373246c0861bb471ffd6e6b53b5d672e3e965e54be&');


        const embed2 = new EmbedBuilder()
            .setDescription("<a:hello:1211186490328219718> Welcome to **Illinois State Roleplay!** We hold our staff to a high standard to achieve the best roleplay possible. Feel free to join sessions whenever they are available. Below you can find further information.\n\n➜ Staff Application: [Click here!](https://forms.gle/vGAJcksmRT26f5oP7)\n➜ Ban Appeal: [Click here to appeal!](https://forms.gle/yhSZzvDbqX2gAups6)\n➜ Roblox Group: [Click this to go to the group!](https://www.roblox.com/groups/14805979/Illinois-Roleplay-ER-LC#!/about)\n\n```fix\nDepartments are currently under development. You can find announcements and information regarding them in the whitelisted tab of the server.\n```\n```fix\nPartnerships are handpicked. Do not open tickets to request a partnership. The directive team will reach out to you if we think an affiliation is suitable.\n```\n**Directive Team**\n<@&1211161267897901176> ➜ <@1150764106375245834>\n<@&1211161267864338441> ➜ <@1009272785102704710>\n<@&1211161267864338440> ➜ <@810988362697277510>")
            .setColor('#2c2d31')
            .setImage('https://cdn.discordapp.com/attachments/1009277212484186183/1114748959907401728/New_Project_-_2023-06-03T195413.276.png?ex=6625289f&is=6623d71f&hm=63cccbfc209835013ed406a39912d2f3e1b6037abd865a70e70a3f02e4bd77f4&')
            .setFooter({
                text: "Property of Illinois State Roleplay,© 2024 ISRP",
            });

        const menu = new StringSelectMenuBuilder()
            .setPlaceholder('Select an option')
            .setCustomId('informationmenu')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Discord Rules')
                    .setEmoji("<:rules:1232886173639249950>")
                    .setDescription('View our server guidelines.')
                    .setValue('discordrules'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Game Rules')
                    .setEmoji("<:game:1233193202505224212>")
                    .setDescription('View our in-game server guidelines.')
                    .setValue('gamerules'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Reaction Roles')
                    .setEmoji("<:__:1232886177271517236>")
                    .setDescription('View our reaction roles.')
                    .setValue('reactroles'),
            )

            
            
        const row = new ActionRowBuilder().addComponents(menu);
        await message.channel.send({
            embeds: [embed, embed2],
            components: [row],
        });

    },
};