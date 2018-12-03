const main = require("../index.js")
const slack = main.slack;
// This command serves to echo speech from a user
module.exports = {
    func: async (data, stuff) => {
        slack.sendMsg(data.channel, stuff.join(" "));
  },
  options: {
    description: "say",
    fullDescription: "makes the bot say something",
    usage: "`!say <text>`"
  },
    name: "say"
  };


