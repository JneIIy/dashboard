const { EmbedBuilder, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { getPlayers, getQueue } = require("../../api");
const serverKey = "GLukvbbgOe-QbtGuURyPPnfEXxEpVNgAiOHXUsWdyVQKkBOkHec";

module.exports = {
    name: "guildinfo",

    async execute(message) {
        if (!message.member.roles.cache.some(role => role.name === 'Directive Team' || role.name === 'Discord Moderator')) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        const roles = message.guild.roles.cache.size;
        const boosters = message.guild.premiumSubscriptionCount;
        const creationTimestamp = Math.floor(message.guild.createdAt / 1000);
        const description = message.guild.description || "This server does not have a description";
        const memberCount = message.guild.memberCount;
        const owner = await message.guild.fetchOwner();
        const categories = message.guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size;
        const text_channels = message.guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size;
        const voice_channels = message.guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;

        const guildName = message.guild.name;
        const guildId = message.guild.id;
        const guildIcon = message.guild.iconURL();

        // Function to fetch player count
        const getPlayerCount = async () => {
            const response = await getPlayers(serverKey);
            return response.length;
        };

        // Function to fetch queue count
        const getQueueCount = async () => {
            const response = await getQueue(serverKey);
            return response.length;
        };

        const loadingEmbed = new EmbedBuilder()
            .setColor("#2c2d31")
            .setDescription("<a:illinoisloading:1233662357696282704> Fetching data. Please wait...")
            .setTimestamp();

        const loadingMessage = await message.channel.send({ embeds: [loadingEmbed] });

        // Fetch player count immediately
        const playercount = await getPlayerCount();

        // Schedule fetching queue count after 5 seconds
        setTimeout(async () => {
            const queueCount = await getQueueCount();

            const embed = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("Guild Information")
                .addFields(
                    { name: "Server Name:", value: `${guildName}`, inline: false },
                    { name: "Server Description:", value: `${description}`, inline: false },
                    { name: "Server ID:", value: `\` ${guildId} \``, inline: false },
                    { name: "Server Owner:", value: `${owner}`, inline: false },
                    { name: "Server Created:", value: `<t:${creationTimestamp}:D>`, inline: false },
                    { name: "Members", value: `\` ${memberCount} \``, inline: true },
                    { name: "Boosters", value: `\` ${boosters} \``, inline: true },
                    { name: "Server Roles", value: `\` ${roles} \``, inline: true },
                    { name: "Categories", value: `\` ${categories} \``, inline: true },
                    { name: "Text Channels", value: `\` ${text_channels} \``, inline: true },
                    { name: "Voice Channels", value: `\` ${voice_channels} \``, inline: true }
                )
                .setThumbnail(guildIcon)
                .setImage("https://cdn.discordapp.com/attachments/1039052043450593281/1237258007285338132/New_Project_-_2023-06-03T195413.png?ex=663afdd0&is=6639ac50&hm=28e5bc92ec3206d419abbd263f8386eef748610c9337969b7bff113f323415c6&");

            const embed2 = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("In-Game Information")
                .setDescription("*Please note that in-game counts do not auto update on this embed. Please re-run the command to view accurate statistics.*")
                .addFields(
                    { name: "Server Name:", value: `\` Illinois State Roleplay \``, inline: false },
                    { name: "Server Code:", value: `\` ISRP \``, inline: false },
                    { name: "Server Owner:", value: `\` Lionsdovewwe2 \``, inline: false },
                    { name: "Player Count:", value: `\` ${playercount}/40 \``, inline: false },
                    { name: "Queue Count:", value: `\` ${queueCount} \``, inline: false }
                )
                .setImage("https://cdn.discordapp.com/attachments/1039052043450593281/1237258007285338132/New_Project_-_2023-06-03T195413.png?ex=663afdd0&is=6639ac50&hm=28e5bc92ec3206d419abbd263f8386eef748610c9337969b7bff113f323415c6&");

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("View Roles")
                        .setCustomId("viewRolesButton")
                        .setStyle(ButtonStyle.Primary)
                        .setDisabled(false),

                    new ButtonBuilder()
                        .setLabel("Join the Server")
                        .setStyle(ButtonStyle.Link)
                        .setURL("https://policeroleplay.community/join/ISRP")
                );

            await loadingMessage.edit({ embeds: [embed, embed2], components: [row] });

        }, 5000); // Delay of 5 seconds (5000 milliseconds)
    },
};
