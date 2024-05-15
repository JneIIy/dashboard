const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: "userinfo",

    async execute(message) {
        const roleId1 = '1211161267796975629'; 

        if (
            !message.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }


        const user = message.mentions.users.first();
        const member = message.guild.members.cache.get(user.id);
        const userName = user.username;
        const userId = user.id;
        const userAvatar = user.displayAvatarURL();
        const accountDate = Math.floor(user.createdAt / 1000);
        const accountJoin = Math.floor(member.joinedAt / 1000);

        const UserInfoEmbed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("User Information")
        .addFields(
            { name: "User:", value: `${user}`, inline: false },
            { name: "Display Name:", value: `\` ${member.displayName} \``, inline: false },
            { name: "Username:", value: `\` ${userName} \``, inline: false },
            { name: "User ID:", value: `\` ${userId} \``, inline: false },
            { name: "Account Created:", value: `<t:${accountDate}:D>`, inline: false },
            { name: "Joined Server:", value: `<t:${accountJoin}:D>`, inline: false },
        )
        .setColor("#2c2d31")
        .setImage("https://cdn.discordapp.com/attachments/1039052043450593281/1237258007285338132/New_Project_-_2023-06-03T195413.png?ex=663afdd0&is=6639ac50&hm=28e5bc92ec3206d419abbd263f8386eef748610c9337969b7bff113f323415c6&");


        await message.channel.send({ embeds: [UserInfoEmbed] });
    },
};