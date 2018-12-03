const main = require("../index.js")
const slack = main.slack;
// This command allows for code to be evaluated mid-runtime
module.exports = {
  func: async (data, stuff) => {
      let toExecute;
      let c = data.channel
      let code = stuff.join(" ");
      if (code.split("\n").length === 1)
        toExecute = eval(`async () => ${code}`);
      else toExecute = eval(`async () => { ${code} }`);
      toExecute.bind(this);
      try {
        slack.sendMsg(c, "The result was: " + await toExecute());
      } catch (err) {
        slack.sendMsg(c,err.stack);
      }
  },

  options: {
    description: "Owner-only eval",
    fullDescription: "You don't get to use this unless you're me",
    usage: "`sk eval`"
  },
  name: "eval"
};
