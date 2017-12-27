const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
// const api = require('../helpers/apiRequest');

module.exports = [
    (session) => {
        var cardName = card.getName(consts.cards.sample_event);
        var msg = card(session, consts.cards.sample_event, cardName);

        builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
    },
    (session, results) => {
        var choices =  card.choices(consts.cards.sample_event);

        if(!results.response){
            session.replaceDialog('/');
        } else if(results.resonse.entity == choices[0]) {

        } else if(results.resonse.entity == choices[1]) {

        }
    },
    (session, results) => {
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