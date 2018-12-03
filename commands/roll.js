const main = require("../index.js")
var droll = require('droll');
// This file is used to roll dice
// Users can specify the number of dice to roll, the number of sides a die has, and any additional modifiers to be applied to the roll.

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


