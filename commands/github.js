module.exports = {
  func: async (data) => {
    slack.sendMsg(data.channel,
      "https://github.com/MaxGrosshandler/SlackBot"
    );
  },

  options: {
    description: "See the codebase!",
    fullDescription: "Spits out a link to my github!",
    usage: "`sk github`"
  },
  name: "github"
};
