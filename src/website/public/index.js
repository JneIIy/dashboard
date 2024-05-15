const client = require("../../index.js").client;
const { ChannelType } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "/dashboard-DFRRP5ZN7L",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/home.html")];

        let file = fs.readFileSync("./src/website/html/home.html", { encoding: "utf8" });

        const guild = client.guilds.cache.get("1211161267532857444");

        const categories = guild.channels.cache.filter((c) => c.type === ChannelType.GuildCategory).size;
        const text_channels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildText).size;
        const voice_channels = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice).size;

        file = file.replace("$$ram$$", guild.memberCount);
        file = file.replace("$$cores$$", guild.premiumSubscriptionCount);
        file = file.replace("$$cpu$$", guild.roles.cache.size);
        file = file.replace("$$Categories", categories);
        file = file.replace("$$TextChannels", text_channels);
        file = file.replace("$$VoiceChannels", voice_channels);

        res.send(file);
    }
}
