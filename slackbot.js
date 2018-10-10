const slackAPI = require('slackbotapi');
// slackbotapi is a module used to connect to and interact with Slack's RTM (Real Time Messaging) API
const sf = require('snekfetch');
// snekfetch is a popular module among bot developers to deal with HTTP requests

const fs = require("fs");

const slackweatherbot = require('slackweatherbot');
// slackweatherbot is used to implement weather functionality into the bot, but I plan on making my own implementation soon

const config = require("./config.json")
// The config file allows me to store information like tokens I'd rather not have on a public repo


weatherBot = new slackweatherbot();
// The Slack bot uses this to check for the weather

const slack = new slackAPI({
    'token': config.token,
    'logging': true,
    'autoReconnect': true
});
// This is the object representation of the Slack bot, and also where the Slack bot connects

let commands = [];
function readCommands() {
    fs.readdir("./commands", (err, files) => {
        if (err) console.error(err);
        console.log(
            `Loading a total of ${files.length} commands into memory.`,
            false
        );
        files.forEach(file => {
            try {
                const command = require(`./commands/${file}`);

                console.log(`Attempting to load the command "${command.name}".`, false);
                commands.push(command)

            }
            catch (err) {
                console.log(
                    "An error has occured trying to load a command. Here is the error."
                );
                console.log(err.stack);
            }
        });
        console.log("Command Loading complete!");
        console.log("\n");
    });
}
readCommands();


// Slack on EVENT message, send data.
slack.on('message', async function (data) {
    if (typeof data.text === 'undefined') return;
    let stuff = data.text.split(" ")
    if (data.text.startsWith('!')) {
        let cmd = stuff[0].substring(1);
        commands.forEach(function (command) {
            if (command.name == cmd) {
                stuff.shift();
                console.log(stuff)
                command.func(data, stuff)
            }
            

        })
    }
});

slack.on('team_join', function (data) {
    // Greet a new member that joins
    slack.sendPM(data.user.id, 'Hello and welcome to the team! :simple_smile: :beers:');
});
module.exports.slack = slack;