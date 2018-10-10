// Requiring our module
const Eris = require("eris");
let msg;
var bot = new Eris("MjAwMjY5ODE3OTMwODQyMTE0.Dp0OrA.j9eauTeGL-sZkHsaHBVFS2Wq3Hc");
// Replace BOT_TOKEN with your bot account's token

bot.on("ready", () => { // When the bot is ready
    console.log("Ready!"); // Log "Ready!"
});

bot.on("messageCreate", async (msg) => { // When a message is created
    if (msg.content === "#ping") { // If the message content is "!ping"
        bot.createMessage(msg.channel.id, "Pong!");
        // Send a message in the same channel with "Pong!"
    } else if (msg.content === "#pong") { // Otherwise, if the message is "!pong"
        bot.createMessage(msg.channel.id, "Ping!");
        // Respond with "Ping!"
    }
    else if (msg.content.startsWith("#slack")) {
        let disc = msg.content.split('#slack ');
        try {
            await sf
                .post("https://hooks.slack.com/services/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")
                .send({ text: disc[1] });
        }
        catch (err) {
            console.error(err);
        }



    }
});

bot.connect();
var slackAPI = require('slackbotapi');
const sf = require('snekfetch')
const pg = require('pg')
let client = new pg.Client("postgres://smvaphiq:wg_-fCGQk_jEbL5tGfe7z2V06tA5bgm-@baasu-01.db.elephantsql.com:5432/smvaphiq");
async function getBottles() {
    return client.query("SELECT * from bottle_Stats").then(num => {
        return num.rows[0];
    })
}
let num = 0;
var slackweatherbot = require('slackweatherbot');
weatherBot = new slackweatherbot();

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

async function start() {

    pgConnect()
}
start()
// Starting
var slack = new slackAPI({
    'token': 'xoxb-446010476145-452767586934-T6QEhpLUrFnWY98K1frdj1Wn',
    'logging': true,
    'autoReconnect': true
});

slack.on('start', async function (data) {


})
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

            case 'bottle':
                //let num = await client.query("SELECT * from bottle_stats")
                // slack.sendMsg(data.channel, 'I\'ve sent ' + num.rows[0].bottlenumber + ' bottles')

                num = await getBottles();
                slack.sendMsg(data.channel, "I have sent " + num.bottlenumber + " bottles")
                break;


            case 'disc':
                var disc = data.text.split('!disc ');
                msg = disc[1]
                try {
                    await sf
                        .post("https://canary.discordapp.com/api/webhooks/498868507220377611/NYePLqYTj9aJkH8u0HNnYYQxDmeGDRiceMXvn2X5bkITqADwk1Cb9pBApXYDC73Ehkme")
                        .send({ content: msg, username: "Doot", });
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