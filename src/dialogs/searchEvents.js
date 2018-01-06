const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports.byDate = [
    (session, args) => {
        builder.Prompts.time(session, "What is your desired visit date?");
    }, 
    (session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            console.log(results.response.resolution.start)
            api.searchByDate(results.response.resolution.start, (res) => {
                console.log(res.data.length)
                if(res.data.length != 0) {
                    var msg = card.events(session, res.data, 'search');
                    builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
                } else {
                    session.endConversation('Sorry, there\'s no available event. ☹');
                } 
            });
        }
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

module.exports.byPax = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]

module.exports.byName = [
    (session, args) => {
        builder.Prompts.text(session, "Type the name of the event you want to search.");
    }, 
    (session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            api.searchByName(results.response, (res) => {
                if(res.data.length != 0) {
                    var msg = card.events(session, res.data);
                    builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
                } else {
                    session.endConversation('Sorry, there\'s no available event. ☹');
                } 
            });
        }
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

module.exports.byLocation = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]

module.exports.byBudget = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]