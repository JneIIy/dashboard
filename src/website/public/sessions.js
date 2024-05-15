const client = require("../../index.js").client;
const { ChannelType } = require("discord.js");
const { getPlayers, getQueue } = require("../../api.js");
const fs = require("fs");

module.exports = {
    name: "/sessions-N0XL1S5Q6R",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/session.html")];

        let file = fs.readFileSync("./src/website/html/session.html", { encoding: "utf8" });

        const guild = client.guilds.cache.get("1211161267532857444");

        let votesData = {};

        try {
            const rawData = fs.readFileSync('votes.json', 'utf8');
            if (rawData) {
                votesData = JSON.parse(rawData);
            }
        } catch (error) {
            console.error("Error reading or parsing JSON file:", error);
        }

        let description = "";
        let voteCount = 0;
        for (const userId in votesData) {
            const user = await client.users.fetch(userId).catch(console.error);
            if (user) {
                description += `@${user.username} (${userId}), `; // Add a comma after each username
                voteCount++;
            }
        }
        
        description = description.slice(0, -2);

        let playerCount;
        const serverKey = "GLukvbbgOe-QbtGuURyPPnfEXxEpVNgAiOHXUsWdyVQKkBOkHec";
        const response = await getPlayers(serverKey);
        playerCount = response.length;

        setTimeout(async () => {
            const queueResponse = await getQueue(serverKey);
            const queueCount = queueResponse.length;

            // Replace placeholders with actual counts
            file = file.replace("(0/7)", `(${voteCount})`);
            file = file.replace("(0/40)", `(${playerCount})`);
            file = file.replace("(0)", `(${queueCount})`);
            file = file.replace("$voteUsers", `${description}`);

            // Send the updated file
            res.send(file);
        }, 5000); // Delay of 5 seconds (5000 milliseconds)
    }
};
