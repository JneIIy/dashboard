module.exports = {
    name: "id",

    async execute(message) {

        const user = message.mentions.users.first();

        if (!user) {
            await message.reply(`> ${message.author} your Discord user ID is \`${message.author.id}\`.`)
        } else {
            message.reply(`> **${user.username}'s** Discord user ID is \`${user.id}\`.`)
        };
    },
};