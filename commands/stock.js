const main = require("../index.js")
let slack = main.slack;
const sf = main.sf;
const config = require("../config.json")
// This command allows the user to look up information on a given stock
module.exports = {
  func: async (data, stuff) => {
          try {
        await sf.get("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+stuff[0]+"&apikey="+config.STOCKS, {redirect:true} ).then(result => {
        let results = result.body["Global Quote"]
        let str = ""  
        for (item in results) {
            str += "`"+item.substring(3) + ": " + results[item] + "`\n"
        } 
        console.log(str)
        return slack.sendMsg(data.channel,"The results for " +stuff[0] +" are below:\n"+str);
        })
    }
    catch (err){
        return slack.sendMsg(data.channel,"Invalid symbol!")
    }
},
  options: {
    description: "Stock checker!",
    fullDescription: "Get the current stock info of a company!",
    usage: "`!stock <symbol>`"
  },
  name: "stock"
};
