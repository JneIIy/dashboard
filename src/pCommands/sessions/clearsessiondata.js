const fs = require("fs");

module.exports = {
    name: "csd",

    async execute(message) {
        const roleId1 = '1211161267864338433'; 

        if (
            !message.member.roles.cache.some(role =>
                [roleId1].includes(role.id)
            )
        ) {
            return message.reply('<:checkx:1233193269966667797> You do not have permission to use this command.');
        }

        let votesData;
        votesData = {};
        fs.writeFileSync('votes.json', JSON.stringify(votesData, null, 2), 'utf8');

        await message.channel.send("<:checkmark:1233193268481888298> Session data cleared.")
    }
}