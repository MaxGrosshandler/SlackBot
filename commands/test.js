const main = require("../index.js")
const slack = main.slack;
const client = main.client;
module.exports = {
    func: async (data, stuff) => {

       if (stuff[0] == null) {
        let spoop = [];
        spoop[0] = data.user

        if (typeof data.user == "undefined") {
            slack.sendMsg(data.channel,"You have no <:steak:481449443204530197> ! You can get some with `sk currency daily`")
        }
        else {
            slack.sendMsg(data.channel,"You have 50 <:steak:481449443204530197>")
        }

      // ping
      
      }
      else {
        slack.sendMsg(data.channel, "This is: " + data.user);
      }
    },
  options: {
    description: "test",
    fullDescription: "tests!",
    usage: "`!test`"
  },
    name: "test"
  };