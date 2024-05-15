const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ssd",

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

        const embed = new EmbedBuilder()
        .setTitle("** <:isrp:1211196186657038336> | Server Shutdown**")
        .setDescription("<:pin:1211190555996852325> Our in game server has now shut down. Our next session will commence at the scheduled time, thank you all for attending!")
        .setColor("#1f53bb")
        .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=66294b95&is=6627fa15&hm=ae8716a932cb288f6ab3ddceecf9d5c9ebcb8b6b2c0a03868ef587e155000796&")
        .setImage("https://cdn.discordapp.com/attachments/1211161269772615699/1211164127439884358/Shutdown.png?ex=662a813e&is=66292fbe&hm=42897696781d9c8613cfc4ee75a7bf18cafad6c78698f8de102523fad4eb526c&");


        
        await message.channel.send({ embeds: [embed] });
    },
};