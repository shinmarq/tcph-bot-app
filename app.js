const builder = require('botbuilder');
const restify = require('restify');

const dialogs = require('./src/dialogs');
const consts = require('./src/config/consts');
// require('./src/helpers/apiRequest').getStarted('Get_Started');
// require('./src/helpers/apiRequest').persistentMenu(consts.persistentMenu);

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
            session.beginDialog('/Menu');
        }else { next(); }

    }
});

//=========================================================
// Bot's Dialogs
//=========================================================

bot.dialog('/', dialogs.default);
bot.dialog('/GetStarted', dialogs.getStarted);
bot.dialog('/Menu', dialogs.menu)
.triggerAction({
    matches: /^Menu|menu$/i
});
bot.dialog('/Booking', dialogs.booking);
bot.dialog('/Events/Popular', dialogs.events.popularEvents);
bot.dialog('/Events/Upcoming', dialogs.events.upcomingEvents);
bot.dialog('/Events/Search', dialogs.events.searchEvents);
bot.dialog('/Events/Inclusions', dialogs.events.showInclusions);
bot.dialog('/Events/Availability', dialogs.events.showAvailability);
bot.dialog('/Search/ByDate', dialogs.searchEvents.byDate);
bot.dialog('/Search/ByName', dialogs.searchEvents.byPax);
bot.dialog('/Search/ByPax', dialogs.searchEvents.byName);


//=========================================================
// Server Setup
//=========================================================

const server = restify.createServer();

/**Endpoint for incoming messages*/
server.post('/api/messages', connector.listen());

server.listen(process.env.PORT || process.env.port || consts.PORT, () => {
    console.log('Restify to port', server.url);
});
