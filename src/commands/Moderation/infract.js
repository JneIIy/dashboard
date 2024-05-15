const { SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("infract")
        .setDescription("Infract a staff member.")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("User you would like to infract.")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("punishment")
                .setDescription("Issue a certain staff punishment to a user.")
                .setRequired(true)
                .addChoices(
                    { name: 'Termination', value: 'Termination' },
                    { name: 'Demotion', value: 'Demotion' },
                    { name: 'Strike', value: 'Strike' },
                    { name: 'Warning', value: 'Warning' },
                    { name: 'Notice', value: 'Notice' }

                )

        )
        .addStringOption((option) =>
            option
                .setName("reason")
                .setDescription("Enter the reason for the reason for the infraction.")
        ),

    async execute(interaction) {
        const roleId1 = '1211161267864338433';
        if (
            !interaction.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return interaction.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        
        const user = interaction.options.getUser("user");
        const type = interaction.options.getString("punishment");
        const reason = interaction.options.getString("reason") || "N/A";
        const timestamp = Math.floor(Date.now() / 1000);
        let infractEmbed;

        if (type == "Termination") {
            infractEmbed = new EmbedBuilder()
                .setTitle('Staff Member Infraction')
                .setColor("#f92020")
                .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1236571215716679680/Termination.png?ex=66387e30&is=66372cb0&hm=bf62ff6d0a55f57baaa0700d5b130dfe53644066eb4fc353b63ed4ba26812c28&")
                .setDescription(`*The management team has deemed it necessary to infract you prior to your recent behavior/actions. The infraction ticket has been DMed to you. Please follow those directions to appeal if you think the infraction was unnecessary.*\n\n<:person:1211190825392807986> **Username:**\n<:dropdownarrow:1233930834172448770> ${user}\n<:adduser:1232886218497462313> **Issued By:**\n<:dropdownarrow:1233930834172448770> ${interaction.user}\n<:ban:1233193278678106122> **Punishment:**\n<:dropdownarrow:1233930834172448770> ${type}\n<:menu:1232886233932501042> **Reason:**\n<:dropdownarrow:1233930834172448770> ${reason}\n<:time:1233929952102060032> **Date:**\n<:dropdownarrow:1233930834172448770> <t:${timestamp}:D>`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&")
                .setTimestamp();
        } else if (type == "Demotion") {
            infractEmbed = new EmbedBuilder()
                .setTitle('Staff Member Infraction')
                .setColor("#f95020")
                .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1236571216299561050/Demotion.png?ex=66387e30&is=66372cb0&hm=5cb38e5251acbb03eb2574a34bbb9e1dc3589125855ac791863ee2aaa0712430&")
                .setDescription(`*The management team has deemed it necessary to infract you prior to your recent behavior/actions. The infraction ticket has been DMed to you. Please follow those directions to appeal if you think the infraction was unnecessary.*\n\n<:person:1211190825392807986> **Username:**\n<:dropdownarrow:1233930834172448770> ${user}\n<:adduser:1232886218497462313> **Issued By:**\n<:dropdownarrow:1233930834172448770> ${interaction.user}\n<:ban:1233193278678106122> **Punishment:**\n<:dropdownarrow:1233930834172448770> ${type}\n<:menu:1232886233932501042> **Reason:**\n<:dropdownarrow:1233930834172448770> ${reason}\n<:time:1233929952102060032> **Date:**\n<:dropdownarrow:1233930834172448770> <t:${timestamp}:D>`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&")
                .setTimestamp();
        } else if (type == "Strike") {
            infractEmbed = new EmbedBuilder()
                .setTitle('Staff Member Infraction')
                .setColor("#f97520")
                .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1236571216639295528/Strike.png?ex=66387e30&is=66372cb0&hm=17878b48574ca4630186dc6263456326864f04f9b9c8a358db50e0f49028d444&")
                .setDescription(`*The management team has deemed it necessary to infract you prior to your recent behavior/actions. The infraction ticket has been DMed to you. Please follow those directions to appeal if you think the infraction was unnecessary.*\n\n<:person:1211190825392807986> **Username:**\n<:dropdownarrow:1233930834172448770> ${user}\n<:adduser:1232886218497462313> **Issued By:**\n<:dropdownarrow:1233930834172448770> ${interaction.user}\n<:ban:1233193278678106122> **Punishment:**\n<:dropdownarrow:1233930834172448770> ${type}\n<:menu:1232886233932501042> **Reason:**\n<:dropdownarrow:1233930834172448770> ${reason}\n<:time:1233929952102060032> **Date:**\n<:dropdownarrow:1233930834172448770> <t:${timestamp}:D>`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&")
                .setTimestamp();
        } else if (type == "Warning") {
            infractEmbed = new EmbedBuilder()
                .setTitle('Staff Member Infraction')
                .setColor("#f9ae20")
                .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1236571217633476608/Warning.png?ex=66387e30&is=66372cb0&hm=3d95ca2ce5004dbfc88b4f644dcdbbd428d58c36a939ae68e2042507217b700f&")
                .setDescription(`*The management team has deemed it necessary to infract you prior to your recent behavior/actions. The infraction ticket has been DMed to you. Please follow those directions to appeal if you think the infraction was unnecessary.*\n\n<:person:1211190825392807986> **Username:**\n<:dropdownarrow:1233930834172448770> ${user}\n<:adduser:1232886218497462313> **Issued By:**\n<:dropdownarrow:1233930834172448770> ${interaction.user}\n<:ban:1233193278678106122> **Punishment:**\n<:dropdownarrow:1233930834172448770> ${type}\n<:menu:1232886233932501042> **Reason:**\n<:dropdownarrow:1233930834172448770> ${reason}\n<:time:1233929952102060032> **Date:**\n<:dropdownarrow:1233930834172448770> <t:${timestamp}:D>`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&")
                .setTimestamp();
        } else if (type == "Notice") {
            infractEmbed = new EmbedBuilder()
                .setTitle('Staff Member Infraction')
                .setColor("#f9e720")
                .setImage("https://cdn.discordapp.com/attachments/1122299112428146841/1236571217201336330/Notice.png?ex=66387e30&is=66372cb0&hm=ce4b2a3db931a231e013eb30ffe7858de58e7a4cd8b95ed650ec278d1c7f031c&")
                .setDescription(`*The management team has deemed it necessary to infract you prior to your recent behavior/actions. The infraction ticket has been DMed to you. Please follow those directions to appeal if you think the infraction was unnecessary.*\n\n<:person:1211190825392807986> **Username:**\n<:dropdownarrow:1233930834172448770> ${user}\n<:adduser:1232886218497462313> **Issued By:**\n<:dropdownarrow:1233930834172448770> ${interaction.user}\n<:ban:1233193278678106122> **Punishment:**\n<:dropdownarrow:1233930834172448770> ${type}\n<:menu:1232886233932501042> **Reason:**\n<:dropdownarrow:1233930834172448770> ${reason}\n<:time:1233929952102060032> **Date:**\n<:dropdownarrow:1233930834172448770> <t:${timestamp}:D>`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&")
                .setTimestamp();
        } else {
            console.log("Infraction failure....")
        };

        const addSuccessfulDM = new EmbedBuilder()
            .setTitle(`Staff Infraction`)
            .setDescription("You have been infracted inside of Illinois State Roleplay, below is a copy of your infraction ticket. Believe that the infraction is false or wrongful? Please open an affairs ticket at ping a manager or director.")
            .setColor('#2c2d31')
            .setThumbnail('https://cdn.discordapp.com/attachments/1211161269772615699/1211375215716737074/isrp_logo.png?ex=662e9195&is=662d4015&hm=804329cedbb741f4f31136a60914ec2edc2777f265c275250fb0dd78781654a3&')
            .setImage(`https://cdn.discordapp.com/attachments/1039052043450593281/1233937187222061147/isrp_banner.png?ex=662ee90e&is=662d978e&hm=2712cec7e01de05548b1815954a2d4cf9d96639f22f6573448e6b330a9ccdc68&`)
            .setTimestamp()
            .addFields(
                { name: '<:arrow:1211432635356815410> Username:', value: `${user}`, inline: false },
                { name: '<:arrow:1211432635356815410> Issued By:', value: `${interaction.user}`, inline: false },
                { name: '<:arrow:1211432635356815410> Punishment:', value: `${type}`, inline: false },
                { name: '<:arrow:1211432635356815410> Reason:', value: `${reason}`, inline: false },
                { name: '<:arrow:1211432635356815410> Date:', value: `<t:${timestamp}:D>`, inline: false }

            )

        const infractbutton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('infractButton')
                    .setLabel(`You have been infracted in ${interaction.guild.name}`)
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Danger)
            )

        interaction.reply({ content: `<:checkmark:1233193268481888298> ${user} has been successfully infracted.`, ephemeral: true });

        const channelId = '1211161269025902628';
        const channel = interaction.guild.channels.cache.get(channelId);
        channel.send({ content: `${user}`, embeds: [infractEmbed] });

        await user.send({ content: `${user}`, embeds: [addSuccessfulDM], components: [infractbutton] }).catch(err => { });


    },
};