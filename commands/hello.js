const main = require("../index.js")
const slack = main.slack;
module.exports = {
    func: async (data, stuff) => {
      // ping
      slack.sendMsg(data.channel, 'Oh, hello @' + slack.getUser(data.user).name + ' !');
  },
  options: {
    description: "hello",
    fullDescription: "goodbye?",
    usage: "`!hello`"
  },
    name: "hello"
  };