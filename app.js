const builder = require('botbuilder');
const restify = require('restify');

const routes = require('./src/routes/dialogRoutes');
const consts = require('./src/config/consts');
// require('./src/helpers/fb-helper').getStarted('Get_Started');
// require('./src/helpers/fb-helper').persistentMenu(consts.persistentMenu);

//=========================================================
// Bot Setup
//=========================================================

/**Create chat bot*/
const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
const bot = new builder.UniversalBot(connector, (session) => {
    var msg = session.message;
    if (msg.attachments && msg.attachments.length > 0) {
     // Echo back attachment
     var attachment = msg.attachments[0];
        session.send({
            text: "You sent:",
            attachments: [
                {
                    contentType: attachment.contentType,
                    contentUrl: attachment.contentUrl,
                    name: attachment.name
                }
            ]
        });
    } else {
        // Echo back users text
        session.send("You said: %s", session.message.text);
    }
});

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
            session.beginDialog('/Menu');
        }else { next(); }

    }
});

//=========================================================
// Bot's Dialogs
//=========================================================

routes(bot, consts.bot);

//=========================================================
// Server Setup
//=========================================================

const server = restify.createServer();

/**Endpoint for incoming messages*/
server.post('/api/messages', connector.listen());

server.listen(process.env.PORT || process.env.port || consts.PORT, () => {
    console.log('Restify to port', server.url);
});
