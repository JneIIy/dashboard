const client = require("../../index.js").client;
const { ChannelType } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "/",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/login.html")];

        let file = fs.readFileSync("./src/website/html/login.html", { encoding: "utf8" });

        res.send(file);
    }
}
