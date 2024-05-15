const { ActivityType } = require("discord.js");
const mongoose = require('mongoose');
const mongodbUrl = process.env.mongoURL;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        client.user.setActivity({
            type: ActivityType.Watching,
            name: 'Illinois',
        })

        console.log('Ready!');

        if (!mongodbUrl) return;

        await mongoose.connect(mongodbUrl);

        if (mongoose.connect) {
            console.log("MongoDB Connected.")
        }

        async function pickPresence () {
            const option = Math.floor(Math.random() * statusArray.length);

            try {
                await client.user.setPresence({
                    activities: [
                        {
                            name: statusArray[option].content,
                            type: statusArray[option].type,

                        },
                    
                    ],

                    status: statusArray[option].status
                })
            } catch (error) {
                console.error(error);
            }
        }
    },
};