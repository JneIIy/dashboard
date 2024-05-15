const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "full",

    async execute(message) {
        const roleId1 = '1211161267796975629'; 

        if (
            !message.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        await message.delete();

        const timestamp = Math.floor(Date.now() / 1000)

        const embed = new EmbedBuilder()
        .setColor("#1f53bb")
        .setDescription(`Our in game server is now full! We have been full since <t:${timestamp}:R>.`)
        
        await message.channel.send({ embeds: [embed] });
    },
};