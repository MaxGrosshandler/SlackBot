const main = require("../index.js")
const slack = main.slack;
module.exports = {
    func: async (data, stuff) => {
      // ping
      slack.sendMsg(data.channel, "This is simply a test command.");
  },
  options: {
    description: "test",
    fullDescription: "tests!",
    usage: "`!test`"
  },
    name: "test"
  };