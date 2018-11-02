const main = require("../index.js")
var droll = require('droll');


const slack = main.slack;
module.exports = {
    func: async (data, stuff) => {
        let c = data.channel
        var result = droll.roll(stuff[0])
        console.log(result)
        if (result) slack.sendMsg(c, `The result of ${stuff[0]} was: ` + result.total);
        else {
            slack.sendMsg(c, "That isn't a valid roll!")
        }
    },
    options: {
        description: "roll",
        fullDescription: "role?",
        usage: "`!roll <1d6>`"
      },
    name: "roll"
  };


