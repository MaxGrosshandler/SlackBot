const main = require("../index.js")
let slack = main.slack;
const sf = main.sf;
const config = require("../config.json")
// This command is used to display the given exchange rate between two currencies
module.exports = {
  func: async (data, stuff) => {
          try {
            // uses the alphavantage api ti get relevant results
        await sf.get("https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency="+stuff[0]+"&to_currency="+stuff[1]+"&apikey="+config.STOCKS, {redirect:true} ).then(result => {
        let results = result.body["Realtime Currency Exchange Rate"]
        let str = ""  
        for (item in results) {
            str += "`"+item.substring(3) + ": " + results[item] + "`\n"
        } 
        console.log(str)
        return slack.sendMsg(data.channel,"The information is below:\n"+str);
        })
    }
    catch (err){
        return slack.sendMsg(data.channel,"Invalid format!")
    }
},
  options: {
    description: "Currency converter!",
    fullDescription: "Check the exchange rate between two currencies",
    usage: "`!convert <currency 1> <currency 2>`"
  },
  name: "convert"
};
