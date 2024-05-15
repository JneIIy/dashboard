const {
    SlashCommandBuilder,
    EmbedBuilder,
    ChannelType,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trialstaffadd")
        .setDescription("Add a member to the trial moderation team.")
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('User you would like to add.')),

    async execute(interaction) {
        const roleId1 = '1211161267864338433';

        if (
            !interaction.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return interaction.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }
        const user = interaction.options.getUser('user')
        
        const guild = interaction.guild;
        const member = await guild.members.fetch(user.id);

        const roleIds = [
            '1211161267796975634',
            '1211161267796975633',
            '1211161267796975632',
            '1211161267796975631',
            '1211161267796975629'
        ];

        const rolesToAdd = roleIds.map(roleId => interaction.guild.roles.cache.get(roleId));

        if (rolesToAdd.every(role => role)) {
            if (rolesToAdd.some(role => member.roles.cache.has(role.id))) {
                await member.roles.remove(rolesToAdd);
                await interaction.reply({ content: `<:checkmark:1233193268481888298> Removed ${user} from the trial staff team.`, ephemeral: true });
            } else {
                await member.roles.add(rolesToAdd);
                await interaction.reply({ content: `<:checkmark:1233193268481888298> Added ${user} to the trial staff team.`, ephemeral: true });
            }
        }

    },
};