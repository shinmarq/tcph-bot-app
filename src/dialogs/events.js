const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports.popularEvents = [
    (session) => {
        api.popularEvents((res) => {
            var msg = card.events(session, res.data);
            builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
        });
        // var cardName = card.getName(consts.cards.sample_event);
        // var msg = card(session, consts.cards.sample_event, cardName);

        // builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
    },
    (session, results) => {
        if(!results.response) {
            session.replaceDialog('/');
        } else {
            var choice = results.response.entity;
            var split = choice.split(':');

            switch(split[0]) {
                case 'IN':
                    session.replaceDialog('/Events/Inclusions', { event_id: split[1] });
                break;

                case 'AV':
                    session.replaceDialog('/Events/Availability', { event_id: split[1] });
                break;
                
                default:
                    session.replaceDialog('/Booking', { event_id: split[1] });
            }
            
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
            var choice = results.response.entity;
            var split = choice.split(':');

            switch(split[0]) {
                case 'IN':
                    session.replaceDialog('/Events/Inclusions', { event_id: split[1] });
                break;

                case 'AV':
                    session.replaceDialog('/Events/Availability', { event_id: split[1] });
                break;
                
                default:
                    session.replaceDialog('/Booking', { event_id: split[1] });
            }
            
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

module.exports.showInclusions = [
    (session, args) => {
        // session.endConversation('ID ' + args.event_id);
        api.eventById(args.event_id, (res) => {
            session.endConversation(format('These are inclusions on this tour: <br/><br/>{0}', res.data[0].inclusions));
        });
    }
]

module.exports.showAvailability = [
    (session, args) => {
        session.endConversation('ID ' + args.event_id);
    }
]
