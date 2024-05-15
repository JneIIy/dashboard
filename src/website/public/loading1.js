const client = require("../../index.js").client;
const { ChannelType } = require("discord.js");
const fs = require("fs");

module.exports = {
    name: "/loading-YWQIJIN3BN",
    run: async (req, res) => {
        delete require.cache[require.resolve("../html/loading.html")];

        let file = fs.readFileSync("./src/website/html/loading.html", { encoding: "utf8" });
        res.send(file);
    }
}
