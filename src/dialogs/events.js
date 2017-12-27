const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
// const api = require('../helpers/apiRequest');

module.exports.popularEvents = [
    (session) => {
        var cardName = card.getName(consts.cards.sample_event);
        var msg = card(session, consts.cards.sample_event, cardName);

        builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
    },
    (session, results) => {
        console.log(!results.response);
        if(!results.response) {
            session.replaceDialog('/');
        } else {
            session.replaceDialog('/Booking', 'test parameter');
        }
    }
]

module.exports.upcomingEvents = [
    (session) => {
        var cardName = card.getName(consts.cards.sample_event);
        var msg = card(session, consts.cards.sample_event, cardName);

        builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
    },
    (session, results) => {

        if(!results.response) {
            session.replaceDialog('/');
        } else {
            session.replaceDialog('/Booking', 'test parameter');
        }
    }
]

module.exports.searchEvents = [
    (session) => {
        var cardName = card.getName(consts.cards.sample_event);
        var msg = card(session, consts.cards.sample_event, cardName);

        builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
    },
    (session, results) => {

        if(!results.response) {
            session.replaceDialog('/');
        } else {
            session.replaceDialog('/Booking');
        }
    }
]