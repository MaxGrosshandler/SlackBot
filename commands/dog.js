const main = require("../index.js")
const slack = main.slack;
module.exports = {
    func: async (data, stuff) => {
      // ping
      slack.sendMsg(data.channel, "https://www.pexels.com/photo/adorable-animal-breed-canine-356378/");
  },
    name: "dog"
  };