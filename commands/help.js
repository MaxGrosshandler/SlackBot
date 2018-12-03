const main = require("../index.js")
const helpCommands = main.helpCommands;
const slack = main.slack;
// This command displays all the available commands of the bot
module.exports = {
    func: async (data, stuff) => {
        let str = "";
        if (typeof stuff[0] == "undefined") {
            str += "`Command List:` \n"
            helpCommands.forEach(cmd => {
                str += "`!" + cmd[0] + " - " + cmd[1] + "`\n";
            });
            str += "`Use !help <command> for more detailed information.`";
            slack.sendMsg(data.channel, str)
            str = "";
        } else if (typeof stuff[0] !== "undefined") {
            let cmd;
            helpCommands.forEach(c => {
                if (c[0] == stuff[0]) {
                    cmd = c;
                    return;
                }
            });
            if (typeof cmd !== "undefined") {
                slack.sendMsg(data.channel,"**" + cmd[0] + "**\n" + cmd[2] + "\n" + cmd[3] )
                         
            }
        }
    },
    options: {
        description: "this command",
        fullDescription: "gives a list of the commands the bot has",
        usage: "`!help`"
    },
    name: "help"
};
