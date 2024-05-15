const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const noblox = require("noblox.js");

module.exports = {
    name: "rblxinfo",

    async execute(message) {
        if (!message.member.roles.cache.some(role => role.name === 'Directive Team' || role.name === 'Discord Moderator')) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        const user = message.mentions.users.first();
        if (!user) {
            return message.channel.send("<:checkx:1233193269966667797> Please provide a user mention.");
        }
        const member = message.guild.members.cache.get(user.id);
        if (!member) {
            return message.channel.send("<:checkx:1233193269966667797> Cannot find this user in the server.");
        }

        const rblxUser = member.displayName;
        let rblxUserId;
        let rblxAvatarUrl;
        let rblxAvatarHead;
        let playerInfo;
        let profilePage;
        let oldnames;

        try {
            rblxUserId = await noblox.getIdFromUsername(rblxUser);
            rblxAvatarHead = await noblox.getPlayerThumbnail([rblxUserId], "720x720", "png", false, "headshot");
            playerInfo = await noblox.getPlayerInfo([rblxUserId]);

            profilePage = `https://www.roblox.com/users/${rblxUserId}/profile`;
            oldnames = playerInfo.oldNames;

            const rblxAvatar = await noblox.getPlayerThumbnail([rblxUserId]);
            rblxAvatarUrl = rblxAvatar[0].imageUrl;
        } catch (error) {
            return message.channel.send("<:checkx:1233193269966667797> Cannot find this user or they might be unverified.");
        }

        const RblxInfoEmbed = new EmbedBuilder()
            .setThumbnail(rblxAvatarUrl)
            .setAuthor({
                name: `· Roblox Information`,
                iconURL: rblxAvatarHead[0].imageUrl,
            })
            .addFields(
                { name: "Roblox Username:", value: `\` ${rblxUser} \``, inline: false },
                { name: "Roblox Display Name:", value: `\` ${playerInfo.displayName} \``, inline: false },
                { name: "Roblox User ID:", value: `\` ${rblxUserId} \``, inline: false },
                { name: "Account Created:", value: `<t:${Math.floor(playerInfo.joinDate / 1000)}:D> (<t:${Math.floor(playerInfo.joinDate / 1000)}:R>)`, inline: false },
                { name: "Friends", value: `\` ${playerInfo.friendCount} \``, inline: true },
                { name: "Followers", value: `\` ${playerInfo.followerCount} \``, inline: true },
                { name: "Following", value: `\` ${playerInfo.followingCount} \``, inline: true },
                { name: "Previous Usernames:", value: `\` ${oldnames} \``, inline: false },

            )
            .setColor("#2c2d31");

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("View Profile")
                    .setStyle(ButtonStyle.Link)
                    .setURL(profilePage)
            );

        await message.channel.send({ embeds: [RblxInfoEmbed], components: [row] });
    },
};
