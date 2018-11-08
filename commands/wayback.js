const main = require("../index.js")
let slack = main.slack;
const sf = main.sf;
module.exports = {
  func: async (data, stuff) => {
          try {
        await sf.get("http://timetravel.mementoweb.org/api/json/2016/www."+stuff[0]+".com", {redirect:true} ).then(result => {
                return slack.sendMsg(data.channel,"The Wayback Machine spat this out: <" +result.body.mementos.first.uri[0]+">");
        })
    }
    catch (err){
        return slack.sendMsg(data.channel,"The Wayback Machine couldn't find anything! Make sure it's a valid url!")
    }
},
  options: {
    description: "Wayback Machine!",
    fullDescription: "Go back in time! You can find the earliest known snapshot of a website by putting in a url!",
    usage: "`!wayback <url>`"
  },
  name: "wayback"
};
