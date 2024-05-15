const { Embed, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "shop",

    async execute(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply("<:checkx:1233193269966667797> You do not have permission to use this command.");
        }

        await message.delete();

        const embe = new EmbedBuilder()
            .setColor("#2c2d31")
            .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1231820481716293642/Shop.png?ex=66385938&is=6625e438&hm=69554a4da645285d325a23a8720dcf5f0b8f34434c640c6d60103000afcd8201&");


        const embed = new EmbedBuilder()
            .setColor("#2c2d31")
            .setImage("https://cdn.discordapp.com/attachments/1113943709483008172/1127465420388053113/New_Project_-_2023-06-03T195413.png?ex=6637137f&is=66249e7f&hm=1a4bfd8995d958fcb49633092bccb1d5f019c062e4d1fb05d02e3d5d2197141a&")
            .setTitle("**Information on Purchases**")
            .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=6637cc15&is=66255715&hm=194bdf6880ccc236dc48f0c33c047b7817eeb7d2e88735a6a67506a504d8682d&")
            .setDescription("- If you have purchased one of the following products, please make an Internal Affairs ticket to claim your perks. You must have proof of your purchase.\n- If you are kicked/banned from the server or leave, make an Internal Affairs ticket to get your roles back.\n- Do not ask for more perks than what's given.\n- <@&1211161267704832109> and <@&1211161267725930518> are handpicked and are not otherwise obtainable, do not ask for either of these roles.\n\n**ALL SALES ARE FINAL AND NON REFUNDABLE.**");


            const menu = new StringSelectMenuBuilder()
            .setPlaceholder('🛒 Select an shop option to get started.')
            .setCustomId('shopmenu')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Premium')
                    .setEmoji("<:Premium:1233581388826153000>")
                    .setDescription('View our premium perks.')
                    .setValue('premium'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Donations')
                    .setEmoji("<:Donator:1233581387609673728>")
                    .setDescription('View our donation perks.')
                    .setValue('donations'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Boosting')
                    .setEmoji("<:Booster:1233581386309435423>")
                    .setDescription('View our boosting perks.')
                    .setValue('boosting'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Paid Advertisements & Giveaways')
                    .setEmoji("<:handshakeemojiclipartxl:1233581385147744306>")
                    .setDescription('View our paid advertisement perks.')
                    .setValue('paidads'),
                    
            )

            const row = new ActionRowBuilder().addComponents(menu)

        await message.channel.send({ embeds: [embe, embed], components: [row] });
    }
}