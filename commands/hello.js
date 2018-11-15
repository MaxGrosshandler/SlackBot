const main = require("../index.js")
const slack = main.slack;
module.exports = {
    func: async (data) => {
      // ping
      slack.sendMsg(data.channel, 'Oh, hello @' + slack.getUser(data.user).name + ' !');
  },
  options: {
    description: "hello!",
    fullDescription: "greets the user",
    usage: "`!hello`"
  },
    name: "hello"
  };