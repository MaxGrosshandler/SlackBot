const slackAPI = require('slackbotapi');
// slackbotapi is a module used to connect to and interact with Slack's RTM (Real Time Messaging) API

const Eris = require("eris");
// eris is a module used to connect to and interact with Discord's API 

const sf = require('snekfetch')
// snekfetch is a popular module among Discord bot developers to deal with HTTP requests

const pg = require('pg')
// pg is the module used to interact with the Postgres-based database hosted on ElephantSQL

const slackweatherbot = require('slackweatherbot');
// slackweatherbot is used to implement weather functionality into the bot, but I plan on making my own implementation soon

const config = require("./config.json")
// The config file allows me to store information like tokens I'd rather not have on a public repo


weatherBot = new slackweatherbot();
// The Slack bot uses this to check for the weather

let client = new pg.Client(config.pgurl);
// This is the Postgres client the Slack bot uses

const slack = new slackAPI({
    'token': config.stoken,
    'logging': true,
    'autoReconnect': true
});
// This is the object representation of the Slack bot, and also where the Slack bot connects


const discord = new Eris(config.dtoken);
// This is the object representation of the Discord bot

discord.connect();
// This is where the Discord bot connects

discord.on("ready", () => { 
    console.log("Ready!"); 
});
// When the Discord bot is ready, it logs a message to the console

discord.on("messageCreate", async (msg) => { // When a message is created
    if (msg.content === "#ping") { // If the message content is "!ping"
        discord.createMessage(msg.channel.id, "Pong!");
        // Send a message in the same channel with "Pong!"
    } else if (msg.content === "#pong") { // Otherwise, if the message is "!pong"
        discord.createMessage(msg.channel.id, "Ping!");
        // Respond with "Ping!"
    }
    else if (msg.content.startsWith("#slack")) {
        let disc = msg.content.split('#slack ');
        try {
            await sf
                .post(config.shook)
                .send({ text: disc[1] });
        }
        catch (err) {
            console.error(err);
        }



    }
});



// Slack on EVENT message, send data.
slack.on('message', async function (data) {
    // If no text, return.

    if (typeof data.text === 'undefined') return;
    // If someone says `cake!!` respond to their message with 'user OOH, CAKE!! :cake:'
    if (data.text === 'cake!!') slack.sendMsg(data.channel, '@' + slack.getUser(data.user).name + ' OOH, CAKE!! :cake:');

    // If the first character starts with %, you can change this to your own prefix of course.
    if (data.text.charAt(0) === '!') {
        // Split the command and it's arguments into an array
        var command = data.text.substring(1).split(' ');

        // If command[2] is not undefined, use command[1] to have all arguments in command[1]
        if (typeof command[2] !== 'undefined') {
            for (var i = 2; i < command.length; i++) {
                command[1] = command[1] + ' ' + command[i];
            }
        }

        // Switch to check which command has been requested.
        switch (command[0].toLowerCase()) {
            // If hello
            case 'hello':
                // Send message
                slack.sendMsg(data.channel, 'Oh, hello @' + slack.getUser(data.user).name + ' !');
                break;

            case 'say':
                var say = data.text.split('!say ');
                slack.sendMsg(data.channel, say[1]);
                break;


            case 'disc':
                var disc = data.text.split('!disc ');
                try {
                    await sf
                        .post(config.dhook)
                        .send({ content: disc[1], username: "Doot", });
                }
                catch (err) {
                    console.error(err);
                }
                break;
            case "weather":
                var location = command[1];
                weatherBot.getWeather(location, function (err, message) {
                    if (message) slack.sendMsg(data.channel, message);
                });
                break;

        }
    }
});

slack.on('team_join', function (data) {
    // Greet a new member that joins
    slack.sendPM(data.user.id, 'Hello and welcome to the team! :simple_smile: :beers:');
});