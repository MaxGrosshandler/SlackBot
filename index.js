const slackAPI = require('slackbotapi');
// slackbotapi is a module used to connect to and interact with Slack's RTM (Real Time Messaging) API
// I prefer using existing wrappers over making my own logic for handling evetns from Slack to help keep complexity down

const sf = require('snekfetch');
// snekfetch is a popular module among bot developers to deal with HTTP requests due to the ease of use associated with the module

const fs = require("fs");
// This module is used for reading files and is popular
const pg = require("pg");
// This module is for connecting with postgres

const config = require("./config.json")
// The config file allows me to store information like tokens I'd rather not have on a public repo

const slack = new slackAPI({
    'token': config.token,
    'logging': true,
    'autoReconnect': true
});

// This is the object representation of the Slack bot, and also where the Slack bot connects

let commands = [];
let helpCommands = [];
// This is an array that will store our commands.

function readCommands() {
    fs.readdir("./commands", (err, files) => {
        if (err) console.error(err);
        console.log(
            `Loading a total of ${files.length} commands into memory.`
        );
        files.forEach(file => {
            try {
                const command = require(`./commands/${file}`);

                console.log(`Attempting to load the command "${command.name}".`);
                    commands.push(command)

                
                let newCommand = [
                    command.name,
                    command.options.description,
                    command.options.fullDescription,
                    command.options.usage,
                    command.func,
                    command.hidden
                ];
                    helpCommands.push(newCommand);
                
                

            }
            catch (err) {
                console.log(
                    "An error has occured trying to load a command. Here is the error."
                );
                console.log(err.stack);
            }
        });
    });
}
// This is a helper function for loading in commands from a directory named "commands".
// This means we can separate out commands from the main file and make it much more readable.

let client = new pg.Client(config.url);
// This creates the postgres client

function pgConnect() {
    client.connect(function (err) {
        if (err) {
            return console.error("could not connect to postgres", err);
        }
        client.query('SELECT NOW() AS "theTime"', function (err, result) {
            if (err) {
                return console.error("error running query", err);
            }
            console.log(result.rows[0].theTime);
            //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
        });
    });
}
pgConnect();
// This is a helper function to connect to the client

readCommands();
// This just calls the above helper function



// Upcoming things: will be adding support for an APi of sorts

slack.on('message', async function (data) {
    // this will trigger if a command is found
    // the way it works is that it splits the command name off from the commands arguments
    // even if the command doesn't need arguments, it'll try to get them anyway
    // one thing i can improve on in the future is to add an arguments property to commands to streamline the process
    if (typeof data.text === 'undefined') return;
    let stuff = data.text.split(" ")
    if (data.text.startsWith('!')) {
        let cmd = stuff[0].substring(1).toLowerCase();
        commands.forEach(function (command) {
            if (command.name == cmd) {
                stuff.shift();
                command.func(data, stuff)
            }


        })
    }
    // this checks to see if a webhook sent what could be a command
    // this functionality is somewhat outdated, as I no longer actively send webhook messages to the slack workspace, but it's not taking up too much space so I'll keep it as potential functionality
    else if (typeof data.user ==="undefined"){
        let cmd = stuff[0].substring(1).toLowerCase();
        commands.forEach(function (command) {
            if (command.name == cmd) {
                stuff.shift();
                command.func(data, stuff)
            }


        })
    }
});
// This handles all incoming message create events in Slack and looks for commands
// If it finds a command, it parses arguments

/*
slack.on('team_join', function (data) {

    slack.sendPM(data.user.id, 'Hello and welcome to the team! :simple_smile: :beers:');
});
*/
// Direct Messages a new user on Workspace join
module.exports.slack= slack;
module.exports.sf = sf;
module.exports.helpCommands = helpCommands;
module.exports.client = client;

// These exports are for other files in the project