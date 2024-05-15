const { Client, GatewayIntentBits, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Collection, Partials, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, ModalSubmitInteraction, ActionRowBuilder, Events, Embed, GuildMember } = require(`discord.js`);
const fs = require('fs');
const { getPlayers } = require("./api");
const express = require("express");
const os = require("os");
const app = express();
const DiscordOauth2 = require("discord-oauth2");
const cookieParser = require('cookie-parser');
const client = new Client({ intents: [Object.keys(GatewayIntentBits)], partials: [Object.keys(Partials)] });

client.commands = new Collection();
client.pcommands = new Collection();
client.aliases = new Collection();
client.config = require('./config.json')
client.cooldowns = new Collection();
module.exports.client = client;

app.enable("trust proxy");
app.set("etag", false);
app.use(express.static(__dirname + "/website"));
app.set("views", __dirname);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
process.oauth = new DiscordOauth2({
    clientId: "1229639454331764787",
    clientSecret: "xgd5yf7uNHhgm3gT1xOYBZC62UxHsDCv",
    redirectUri: "http://localhost:3000/callback"
});

require('dotenv').config();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const pcommandFolders = fs.readdirSync('./src/pCommands')
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client)
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
    client.prefixCommands(pcommandFolders, './src/pCommands')
    client.login(process.env.token)
})();

let files = fs.readdirSync("./src/website/public").filter(f => f.endsWith(".js"));
files.forEach(f => {
    const file = require(`./website/public/${f}`);
    if(file && file.name) {
        app.get(file.name, file.run);
        console.log(`[Dashboard] - Loaded ${file.name}`);
    }
});



app.post('/send-embed', async (req, res) => {
    const buttonId = req.body.buttonId;
    
    // Check which button was clicked
    if (buttonId === 'endSession') {
        const embed = new EmbedBuilder()
            .setTitle("** <:isrp:1211196186657038336> | Server Shutdown**")
            .setDescription("<:pin:1211190555996852325> Our in-game server has now shut down. Our next session will commence at the scheduled time, thank you all for attending!")
            .setColor("#1f53bb")
            .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=66294b95&is=6627fa15&hm=ae8716a932cb288f6ab3ddceecf9d5c9ebcb8b6b2c0a03868ef587e155000796&")
            .setImage("https://cdn.discordapp.com/attachments/1211161269772615699/1211164127439884358/Shutdown.png?ex=662a813e&is=66292fbe&hm=42897696781d9c8613cfc4ee75a7bf18cafad6c78698f8de102523fad4eb526c&");

        const guild = client.guilds.cache.get("1211161267532857444");
        const channelId = '1236574825053425674';
        const channel = guild.channels.cache.get(channelId);
        await channel.send({ embeds: [embed] });

        res.sendStatus(200); // Respond to the client's request
    } else if (buttonId === 'startVote') {
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

        const guild = client.guilds.cache.get("1211161267532857444");
        const channelId = '1236574825053425674';
        const channel = guild.channels.cache.get(channelId);
        await channel.send({ content: "@here", embeds: [embed], components: [row] });

        res.sendStatus(200);
    } else if (buttonId === 'startSession') {
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
        const guild = client.guilds.cache.get("1211161267532857444");
        const channelId = '1236574825053425674';
        const channel = guild.channels.cache.get(channelId);
        const sentMessage = await channel.send({ content: `<@&1211161267692245053>`, embeds: [embed], components: [row1] });

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
        res.sendStatus(200);
    } else if (buttonId === 'fullSession') {
        const timestamp = Math.floor(Date.now() / 1000)

        const embed = new EmbedBuilder()
        .setColor("#1f53bb")
        .setDescription(`Our in game server is now full! We have been full since <t:${timestamp}:R>.`)
        
        const guild = client.guilds.cache.get("1211161267532857444");
        const channelId = '1236574825053425674';
        const channel = guild.channels.cache.get(channelId);

        await channel.send({ embeds: [embed] });
        res.sendStatus(200);
    } else if (buttonId === 'clearData') {
        let votesData;
        votesData = {};
        fs.writeFileSync('./votes.json', JSON.stringify(votesData, null, 2), 'utf8');

    } else {
        res.status(400).send('Invalid buttonId'); // Respond with an error for invalid buttonId
    }
});




app.get('/get-prefix', (req, res) => {
    try {
        const configData = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));
        res.json({ prefix: configData.prefix }); // Send the prefix as JSON response
    } catch (error) {
        console.error("Error fetching prefix:", error);
    }
});




app.post('/update-prefix', (req, res) => {
    const newPrefix = req.body.prefix; 
    try {
        let configData = JSON.parse(fs.readFileSync('./src/config.json', 'utf8'));
        configData.prefix = newPrefix;
        fs.writeFileSync('./src/config.json', JSON.stringify(configData, null, 2));
        
        client.config.prefix = newPrefix;
        
    } catch (error) {
        console.error("Error updating prefix:", error);
        res.status(500).send('Internal Server Error');
    }
});



app.listen(process.env.PORT || 3000);




//WELCOME MODULE
client.on('guildMemberAdd', (member) => {
    const channelId = '1211161268598345775';
    const channel = member.guild.channels.cache.get(channelId);
    if (!channel) return;

    const memberCountButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setLabel(`Member: ${member.guild.memberCount}`)
        .setDisabled(true)
        .setCustomId('member_count_button');

    const row = new ActionRowBuilder().addComponents(memberCountButton);

    channel.send({
        content: `<:isrp:1211196186657038336> **Welcome** ${member.toString()} **to Illinois State Roleplay!** We are now at \`${member.guild.memberCount}\` members.`,
        components: [row],
    });
});





//info menu
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'informationmenu') return;

    let embedToSend1;
    let embedToSend2;
    let row;

    const selectedValue = interaction.values[0];
    switch (selectedValue) {
        case 'reactroles':

            embedToSend1 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943768635293827/1142885517894103122/Roles.png?ex=6637cd95&is=66255895&hm=8201745f130114447f4ec853d04c332d8672d71b388e668a39c4e01e269e6796&")
                .setColor("#2c2d31");

            embedToSend2 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&")
                .setColor("#2c2d31")
                .setDescription("Looking to get notified of special events within the server? Take a look below and select the roles to be pinged each time the following event happens!\n\n**🎮 I <@&1211161267692245053>**\nBe advised every time we host a **session**.\n\n**📣 I <@&1211161267692245050>**\nBe advised every time we post a new **announcement**.\n\n**🎁 I <@&1211161267692245051>**\nBe advised every time we host a **giveaway**.\n\n**🚔 I <@&1211161267692245048>**\nBe advised with what is going on within **departments**.\n\n**🎈 I <@&1211161267692245049>**\nBe advised every time we host a new **event**.");



            const button1 = new ButtonBuilder()
                .setEmoji("🎮")
                .setCustomId("sessionbutton")
                .setStyle(ButtonStyle.Primary);

            const button2 = new ButtonBuilder()
                .setEmoji("📣")
                .setCustomId("announcementbutton")
                .setStyle(ButtonStyle.Primary);

            const button3 = new ButtonBuilder()
                .setEmoji("🎁")
                .setCustomId("giveawaybutton")
                .setStyle(ButtonStyle.Primary);

            const button4 = new ButtonBuilder()
                .setEmoji("🚔")
                .setCustomId("deptbutton")
                .setStyle(ButtonStyle.Primary);

            const button5 = new ButtonBuilder()
                .setEmoji("🎈")
                .setCustomId("eventbutton")
                .setStyle(ButtonStyle.Primary);

            row = new ActionRowBuilder().addComponents(button1, button2, button3, button4, button5);
            await interaction.reply({ embeds: [embedToSend1, embedToSend2], components: [row], ephemeral: true });
            break;

        case 'discordrules':
            embedToSend1 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943768635293827/1142885548139229305/Discord_Rules.png?ex=6626aa1c&is=6625589c&hm=21fa5a0333c4d95e59c2f710d344c17372903b06177b805c40f4c4ad216c6e7e&")
                .setColor("#2c2d31");

            embedToSend2 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&")
                .setColor("#2c2d31")
                .setDescription("<:person:1211190825392807986> While you are here you must follow the rules listed below. If you have a person that has violated one of these rules in our server or in a partnered server you can report them via an IA ticket in <#1211161268371726350>.\n\n<:pin:1211190555996852325> You also must follow [Discord ToS](https://discord.com/terms) & [Community Guidelines](https://discord.com/guidelines)\n\n`` 1 ``  **Profile & Nickname**\nPlease keep your discord nickname as what Bloxlink sets it to - you may manually change it if you changed your ROBLOX name and Bloxlink won't update you.\n\n `` 2 ``  **Drama**\nDrama is not allowed in this server, please keep drama out of our chats as it generally speaking floods them.\n\n`` 3 ``  **Respect**\nPlease respect everybody on this server. This means don't start being homophobic, racist, or judging someone by culture or religion or their opinions, and so on.\n\n`` 4 ``  **Self Promotion/Advertising**\nAdvertising isn't allowed in this server at all, if you'd like to advertise, please be more civil and attempt to partner or purchase a paid ad. DM advertising members is also not allowed, if you get DM advertised by someone also, please report it to the server staff.\n\n `` 5 ``  **NSFW Content**\nKeep NSFW such as gore, and pornographic content like videos, pictures, or gifs out of our server. \n\n `` 6 ``  **Profanity**\nLight profanity is allowed inside of our server, but we will not allow anybody to use slurs.\n\n`` 7 ``  **Channel Misusage**\nPlease keep each corresponding channel to be used for their right purpose, so don't be for example using a Lounge VC as a Music VC.\n\n `` 8 ``   **Common Sense**\nPlease use common sense, don't act stupid to annoy others, and please follow our rules even ones that you know but aren't listed.\n\n`` 9 `` **English Only**\nWe are an **English** only server, therefore please do not use any other languages besides English, failure to do so will result in moderation.\n\n`` 10 `` **Pinging**\nYou must have a valid reason in order to ping someone. Do not ghost-ping people or spam-ping people. Only ping people if you have a reason behind it.\n\n`` 11 `` **Spamming**\nSpamming in any channel is no longer allowed. If caught in violation of this rule, you will be timed out or warned for spamming.\n\n\n<:crown:1211191070487085066> **Server moderators have full permission to moderate you for common sense situations, meaning implied rules not listed.**")
                .setFooter({
                    text: "Property of Illinois State Roleplay,© 2024 ISRP",
                });
            await interaction.reply({ embeds: [embedToSend1, embedToSend2], ephemeral: true });
            break;

        case 'gamerules':
            embedToSend1 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943768635293827/1142885549003259934/Game_Rules.png?ex=6637cd9c&is=6625589c&hm=692a0658b00cc11d69d4a4cc262ad672a517c2140aa31868babb81b4c50a124e&")
                .setColor("#2c2d31");

            embedToSend2 = new EmbedBuilder()
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&")
                .setColor("#2c2d31")
                .setDescription("<:link:1211184058206396417> [Click here](https://app.gitbook.com/o/e7erMBUUJqPZOgf2mNLk/s/2OXsbjpFdiTtwoxkEsJZ/) to access our gitbook to view all of the banned items/roleplays.\n\n\n`` 1 `` **New Life Rule**\nOnce you die and respawn, you may not go back to get revenge or to go to the same roleplay, this is New Life Rule.\n\n`` 2 `` **Random Deathmatch**\nRandom Deathmatch, or RDM is strictly prohibited. RDM is killing another player with a weapon with no reason/roleplay behind it.\n\n`` 3 `` **Vehicle Deathmatch**\nVehicle Deathmatch, or VDM is strictly prohibited. VDM is destroying another player's car with no reason/roleplay behind it.\n\n`` 4 `` **Fail Roleplay**\nFail roleplay is not allowed in Illinois Roleplay. Fail Roleplay is when you fail to roleplay properly, being unrealistic.\n\n`` 5 `` **Banned Cars/Weapons**\nYou are prohibited from using any banned cars unless you are a server booster. Nobody is allowed to use the banned guns.\n\n`` 6 `` **Safe Zones**\nCivilian spawn, the police station, fire department, sheriff's office, and DOT station are all safe zones. No priority roleplays are to be started here.\n\n`` 7 `` **Realistic Avatars**\nPlease have a realistic avatar on at all times. Do not join the server just to troll and annoy others.\n\n`` 8 `` **Fear Roleplay**\nWhen someone is pointing a gun at you, act scared for your life. Doesn't matter what kind of gun it is, it may even be a melee weapon.\n\n`` 9 `` **Uniforms and Liveries**\nYou are not to use ERLC liveries/uniforms. You must use the liveries and uniforms that we have provided you with.\n\n`` 10 `` **Mafia Limit**\nThe Mafia limit is 5 mafia members. Any more is considered gang roleplay.\n\n`` 11 `` **Cuff Rushing/Auto Arresting**\nYou are to use cuff motion when cuffing people at all times. For example, \"-cuffs-\". You also must transport suspects to the jail, police station, or sheriff's office before jailing them.\n\n`` 12 `` **Realistic Roleplays**\nPlease be sure to keep everything realistic. Roleplay all crashes above 25+ miles per hour. After dying, wait at least 2 minutes before respawning.\n\n`` 13 `` **Cop Baiting**\nCop baiting is when you intentionally try to grab a cops attention to initiate a pursuit or traffic stop. This can consist of speeding up or ramming into the side of a cop car, this is completely prohibited.\n\n`` 14 `` **Terms of Service**\nYou are required to follow all of Roblox's terms of service.")
                .setFooter({
                    text: "Property of Illinois State Roleplay,© 2024 ISRP",
                });
            await interaction.reply({ embeds: [embedToSend1, embedToSend2], ephemeral: true });
            break;



        default:
            break;
    }


});



//shop menu
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'shopmenu') return;

    let embed;

    const selectedValue = interaction.values[0];
    switch (selectedValue) {
        case 'premium':
            embed = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("**Premium**")
                .setThumbnail("https://cdn.discordapp.com/attachments/1122299112428146841/1231814094890209371/Premium.png?ex=66385346&is=6625de46&hm=082f846dd975ecd2bec92ff8e3baabfba49940911d9b982d96268bd752ff6924&")
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&")
                .setDescription("Looking to help out our server, stand out compared to others, and get cool perks? Then this is for you! What perks you may ask? Look below!\n\n• Access to an exclusive chat with special giveaways\n• Custom-made role of choice\n• GIF Permissions\n• Get the <@&1211161267704832108> Role\n\n[Buy Premium Here!](https://www.roblox.com/catalog/13773075176/Illinois-Premium)");

            break;

        case 'donations':
            embed = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("**Donations**")
                .setDescription("Donating to our server helps tremendously. You help fund our future giveaways, paid events in the future, and help our server afford perks that help enhance your roleplay experience!\n\n• Get the <@&1211161267704832107> Role\n• Custom Emoji of Choice\n• Helps support us!!\n\n[Tiny Donation](https://www.roblox.com/catalog/13772989855/Tiny-Donation)\n[Small Donation](https://www.roblox.com/catalog/13773004340/Small-Donation)\n[Medium Donation](https://www.roblox.com/catalog/13773036267/Medium-Donation)\n[Large Donation](https://www.roblox.com/catalog/13773052762/Large-Donation)")
                .setThumbnail("https://cdn.discordapp.com/attachments/1122299112428146841/1231814094345076767/Donator.png?ex=66272fc6&is=6625de46&hm=28f3ee917929c6687bc74a9909671f94093b3795ed2e1aac4bc779cdbbfa8516&")
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&");

            break;

        case 'boosting':
            embed = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("**Boosting**")
                .setDescription("Boosting helps our server unlock some very special perks such as role icons, banners, and custom links to make our server easier to access!\n\n• Unlocks Server Perks\n• GIF perms\n• Access to All Exotic Vehicles\n• Access to an exclusive chat with special giveaways\n• Get the <@&1211395354193305671> Role")
                .setThumbnail("https://cdn.discordapp.com/attachments/1122299112428146841/1231815030865920101/Booster.png?ex=66385425&is=6625df25&hm=d7d250e551853769833a896278d1062e72b275cc24c2d969e4ff7f61b13f4888&")
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&");

            break;

        case 'paidads':
            embed = new EmbedBuilder()
                .setColor("#2c2d31")
                .setTitle("**Paid Advertisements & Giveaways**")
                .setDescription("Looking to grow your own server? You can purchase a paid ad below! Be sure to open an Internal Affairs ticket once ordered.\n\n[No Ping](https://www.roblox.com/catalog/13773082313/Paid-Advertisement-Giveaway-1) ``-`` **150 Robux**\n[Here Ping](https://www.roblox.com/catalog/13773095740/Paid-Advertisement-Giveaway-2) ``-`` **350 Robux**\n[Everyone Ping](https://www.roblox.com/catalog/13773103029/Paid-Advertisement-Giveaway-3) ``-`` **500 Robux**")
                .setThumbnail("https://cdn.discordapp.com/attachments/1113943709483008172/1127465519642066954/handshake-emoji-clipart-xl.png?ex=66371397&is=66249e97&hm=4ace6555eedff934cc551d096efad309d3970e00d3b7dff7fd5a456b7fab9983&")
                .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&");

            break;

        default:
            break;


    }
    await interaction.reply({ embeds: [embed], ephemeral: true });

});


//information role button handlers
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'announcementbutton') return;
    const member = interaction.member;
    if (member) {
        const roleId = "1211161267692245050";
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({ content: "Removed <@&1211161267692245050> from your user.", ephemeral: true });
            } else {
                await member.roles.add(role);
                await interaction.reply({ content: "Added <@&1211161267692245050> to your user.", ephemeral: true });
            }
        }
    }
});
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'sessionbutton') return;
    const member = interaction.member;
    if (member) {
        const roleId = "1211161267692245053";
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({ content: "Removed <@&1211161267692245053> from your user.", ephemeral: true });
            } else {
                await member.roles.add(role);
                await interaction.reply({ content: "Added <@&1211161267692245053> to your user.", ephemeral: true });
            }
        }
    }
});
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'giveawaybutton') return;
    const member = interaction.member;
    if (member) {
        const roleId = "1211161267692245051";
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({ content: "Removed <@&1211161267692245051> from your user.", ephemeral: true });
            } else {
                await member.roles.add(role);
                await interaction.reply({ content: "Added <@&1211161267692245051> to your user.", ephemeral: true });
            }
        }
    }
});
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'deptbutton') return;
    const member = interaction.member;
    if (member) {
        const roleId = "1211161267692245048";
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({ content: "Removed <@&1211161267692245048> from your user.", ephemeral: true });
            } else {
                await member.roles.add(role);
                await interaction.reply({ content: "Added <@&1211161267692245048> to your user.", ephemeral: true });
            }
        }
    }
});
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'eventbutton') return;
    const member = interaction.member;
    if (member) {
        const roleId = "1211161267692245049";
        const role = interaction.guild.roles.cache.get(roleId);
        if (role) {
            if (member.roles.cache.has(roleId)) {
                await member.roles.remove(role);
                await interaction.reply({ content: "Removed <@&1211161267692245049> from your user.", ephemeral: true });
            } else {

                await member.roles.add(role);
                await interaction.reply({ content: `Added <@&1211161267692245049> to your user.`, ephemeral: true });
            }
        }
    }
});



//guild role info button
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId !== 'viewRolesButton') return;

    const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position);

    let description = "";
    for (const role of roles.values()) {
        description += `<@&${role.id}> \n`;
    }
    const embed = new EmbedBuilder()
        .setColor("#2c2d31")
        .setDescription(description);

    interaction.reply({ embeds: [embed], ephemeral: true });

});


client.on(Events.InteractionCreate, async interaction => {
    if (interaction.customId === "sessionVoteButton") {
        await handleVoteButton(interaction);
    } else if (interaction.customId === "viewVotesButton") {
        await handleViewVotesButton(interaction);
    }
});

async function handleVoteButton(interaction) {
    const voteUser = interaction.user;

    let votesData = {};

    try {
        const rawData = fs.readFileSync('votes.json', 'utf8');
        if (rawData) {
            votesData = JSON.parse(rawData);
        }
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
    }

    if (votesData[voteUser.id]) {
        delete votesData[voteUser.id];
    } else {
        votesData[voteUser.id] = 1;
    }

    try {
        fs.writeFileSync('votes.json', JSON.stringify(votesData, null, 2), 'utf8');
    } catch (error) {
        console.error("Error writing JSON file:", error);
    }

    const totalVotes = Object.values(votesData).reduce((acc, curr) => acc + curr, 0);

    const newButton = new ButtonBuilder()
        .setLabel(`${totalVotes} Votes`)
        .setStyle(ButtonStyle.Primary)
        .setCustomId("sessionVoteButton");

    const button2 = new ButtonBuilder()
        .setLabel("View Votes")
        .setCustomId("viewVotesButton")
        .setStyle(ButtonStyle.Success);

    let row;
    if (totalVotes >= 7) {
        await interaction.message.delete();

        const votedUsers = getVoteMentions(votesData);
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
        const sentMessage = await interaction.channel.send({ content: `<@&1211161267692245053> || Voters: ${votedUsers}`, embeds: [embed], components: [row1] });

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

        votesData = {};
        fs.writeFileSync('votes.json', JSON.stringify(votesData, null, 2), 'utf8');

        return;
    } else {
        row = new ActionRowBuilder().addComponents(newButton, button2);
    }

    await interaction.update({ components: [row] });
}

function getVoteMentions(votesData) {
    let mentions = [];
    for (const userId in votesData) {
        mentions.push(`<@${userId}>`);
    }
    return mentions.join(" ");
}

async function handleViewVotesButton(interaction) {
    let votesData = {};

    try {
        const rawData = fs.readFileSync('votes.json', 'utf8');
        if (rawData) {
            votesData = JSON.parse(rawData);
        }
    } catch (error) {
        console.error("Error reading or parsing JSON file:", error);
    }
    if (Object.keys(votesData).length === 0) {
        await interaction.reply({ content: "<:checkx:1233193269966667797> No votes yet.", ephemeral: true });
        return;
    }

    const embed = new EmbedBuilder()
        .setColor("2c2d31")
        .setThumbnail('https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&')
        .setTitle("Voters");

    let description = "";
    for (const userId in votesData) {
        const user = await client.users.fetch(userId).catch(console.error);
        if (user) {
            description += `**@${user.username}** (\`${userId}\`)\n`;
        }
    }

    embed.setDescription(description);

    await interaction.reply({ embeds: [embed], ephemeral: true });
}













