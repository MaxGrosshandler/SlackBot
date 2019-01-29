const main = require("../index.js")
const slack = main.slack;
// This command serves to post an image of a dog, because dogs are great
// Currently, the image is static. I might make it dynamic in the future.
module.exports = {
    func: async (data) => {
      slack.sendMsg(data.channel, "https://www.pexels.com/photo/adorable-animal-breed-canine-356378/");
  },
  options: {
    description: "Bark",
    fullDescription: "Posts a picture of a dog",
    usage: "`!dog`"
  },
    name: "dog"
  };