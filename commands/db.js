const main = require("../index.js")
const slack = main.slack;
const client = main.client;
// This command serves to show off an example of how to query a database
module.exports = {
    func: async (data, stuff) => {
        await client.query("select * from users where id = $1", [data.user]).then(user =>{
          let person = user.rows[0]
          if (typeof person == "undefined") {
            slack.sendMsg(data.channel,"You don't exist in the database, adding you to it")
            client.query("insert into users (id) values ($1) ON CONFLICT DO NOTHING", [data.user])
        }
        else {
              
          slack.sendMsg(data.channel,"You exist in the database, your id is "+person.id+
          "\nWelcome! Your options are as follows:\n1. Do a thing\n2. Do another thing\n"+
          "3. Do yet another thing")
          
        }
        })
  
          
    },
  options: {
    description: "database test",
    fullDescription: "fairly self explanatory",
    usage: "`!db`"
  },
    name: "db"
  };