const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
// const api = require('../helpers/apiRequest');

module.exports = [
    (session, args, next) => {
        builder.Prompts.choice(session, msg, ['January 1 - 4', 'February 1 - 4'], consts.styles.mr_button);
    },
    (session, results) => {
        builder.Prompts.number(session, 'How many of you will join this event?');
    },
    (session, results) => {
        session.send('Alright got it!');
        builder.Prompts.number(session, 'Please enter your contact number');
    },
    (session, results) => {
        session.send('Cool thanks!');
        session.endConversation('Your booking is ready but you are not yet reserved for the slots \nplease settle downpayment Amounting: P5000 \n before 24hrs to these accounts');
    }
]