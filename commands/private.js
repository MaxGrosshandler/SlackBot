
const main = require("../index.js")
const slack = main.slack;
module.exports = {
    func: async (data, stuff) => {
        slack.sendPM(data.user, stuff.join(" "));
  },
  options: {
    description: "Send a hidden message!",
    fullDescription: "Speak to someone from HR anonymously!",
    usage: "`!private <text>`"
  },
    name: "private"
  };



