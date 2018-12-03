const main = require("../index.js")
const slack = main.slack;
// This command serves to display a link to the codebase on Github
module.exports = {
  func: async (data) => {
    slack.sendMsg(data.channel,
      "https://github.com/MaxGrosshandler/SlackBot"
    );
  },

  options: {
    description: "See the codebase!",
    fullDescription: "Spits out a link to my github!",
    usage: "`!github`"
  },
  name: "github"
};
