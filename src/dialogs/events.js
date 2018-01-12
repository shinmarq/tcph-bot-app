const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
// const api = require('../helpers/apiRequest');
const event = require('../helpers/event-helper');

module.exports.popularEvents = [
    async(session) => {
        // api.popularEvents((res) => {
        //     console.log(res)
        //     var msg = card.events(session, res.data);
        //     builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
        // });
        // var cardName = card.getName(consts.cards.sample_event);
        // var msg = card(session, consts.cards.sample_event, cardName);

        // builder.Prompts.choice(session, msg, card.choices(consts.cards.sample_event), consts.styles.mr_button);
        const res = await event.popularEvents();
        console.log(res)
        var msg = card.events(session, res.data);
        builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
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
        api.upcomingEvents((res) => {
            var msg = card.events(session, res.data, 'upcoming');
            builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'upcoming'), consts.styles.mr_button);
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

module.exports.searchEvents = [
    (session) => {
        builder.Prompts.choice(session, 'Please choose your search option.', consts.choices.search_options, consts.styles.mr_button);
    },
    (session, results) => {
        var choices = consts.choices.search_options;

        if(!results.response) {
            session.replaceDialog('/');
        } else { 
            switch(results.response.entity) {
                case choices[0]:
                    session.replaceDialog('/Search/ByDate');
                break;
    
                case choices[1]:
                    session.replaceDialog('/Search/ByPax');
                break;
    
                case choices[2]:
                    session.replaceDialog('/Search/ByName');
                break;
    
                case choices[3]:
                    session.replaceDialog('/Search/ByLocation');
                break;

                case choices[4]:
                    session.replaceDialog('/Search/ByBudget');
                break;
            }
        }
        
    },
    (session, results) => {
        console.log(results)
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

module.exports.showInclusions = [
    (session, args) => {
        api.eventById(args.event_id, (res) => {
            session.endConversation(format('These are inclusions on this tour: <br/><br/>{0}', res.data[0].inclusions));
        });
    }
]

module.exports.showAvailability = [
    (session, args) => {
        api.availability(args.event_id, (res) => {
            session.endConversation(format('Here\'s the available dates and slots for this package: <br/><br/>{0}', card.availabilityDetails(res.data)));
        });
    }
]
