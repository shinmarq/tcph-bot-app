const builder = require('botbuilder');
const restify = require('restify');

const dialogs = require('./src/dialogs');
const consts = require('./src/config/consts');

//=========================================================
// Bot Setup
//=========================================================

/**Create chat bot*/
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector);

//=========================================================
// Bots Middleware
//=========================================================
/**
 bot.use({
    send: (event, next) => {
        console.log(event);
        next();
    },
    receive: (event, next) => {
        console.log(event);
        next();
    },
});
 */
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
bot.use(builder.Middleware.sendTyping());
bot.use({
    botbuilder: (session, next) => {
        var restart = /^restart|started|get started|start over|get_started/i.test(session.message.text);

        if (restart) {
            session.userData = {}; 
            session.privateConversationData = {};
            session.conversationData = {};
            session.dialogData = {};

            /**INSERT BEGIN DIALOG HERE*/
        }else { next(); }

    }
});

//=========================================================
// Bot's Dialogs
//=========================================================

bot.dialog('/', dialogs.default);

//=========================================================
// Server Setup
//=========================================================

const server = restify.createServer();

/**Endpoint for incoming messages*/
server.post('/api/messages', connector.listen());

server.listen(process.env.PORT || process.env.port || consts.PORT, () => {
    console.log('Restify to port', server.url);
});