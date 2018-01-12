const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
// const api = require('../helpers/apiRequest');
const event = require('../helpers/event-helper');

module.exports.byDate = [
    (session, args) => {
        builder.Prompts.time(session, "What is your desired visit date? <br/><br/>eg. (january 1 2018, march 24, 01/02/2018 or 2018-01-23)");
    }, 
    async(session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            // api.searchByDate(results.response.resolution.start, (res) => {
            //     if(res.data.length != 0) {
            //         var msg = card.events(session, res.data, 'search');
            //         builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            //     } else {
            //         session.endConversation('Sorry, there\'s no available event. ☹');
            //     } 
            // });
            const res = await event.searchByDate(results.response.resolution.start);

            if(res.data.length != 0) {
                var msg = card.events(session, res.data, 'search');
                builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            } else {
                session.endConversation('Sorry, there\'s no available event. ☹');
            } 
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
        builder.Prompts.number(session, "For how many guest are you looking for? <br/><br/>eg. (1, 23, 45 etc..)");
    }, 
    async(session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            // api.searchByPax(results.response, (res) => {
            //     if(res.data.length != 0) {
            //         var msg = card.events(session, res.data, 'search');
            //         builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            //     } else {
            //         session.endConversation('Sorry, there\'s no available event. ☹');
            //     } 
            // });
            const res = await event.searchByPax(results.response);

            if(res.data.length != 0) {
                var msg = card.events(session, res.data, 'search');
                builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            } else {
                session.endConversation('Sorry, there\'s no available event. ☹');
            } 
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

module.exports.byName = [
    (session, args) => {
        builder.Prompts.text(session, "Type the name of the event you want to search. <br/><br/>eg. (Tagaytay escapade, bora package tour etc...)");
    }, 
    (session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            // api.searchByName(results.response, (res) => {
            //     if(res.data.length != 0) {
            //         var msg = card.events(session, res.data);
            //         builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
            //     } else {
            //         session.endConversation('Sorry, there\'s no available event. ☹');
            //     } 
            // });
            const res = await event.searchByName(results.response);

            if(res.data.length != 0) {
                var msg = card.events(session, res.data, 'search');
                builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            } else {
                session.endConversation('Sorry, there\'s no available event. ☹');
            } 
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
        builder.Prompts.text(session, "Where is your preferred location? <br/><br/>eg. (Iloilo, tagaytay, batangas etc...)");
    }, 
    async(session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            // api.searchByLocation(results.response, (res) => {
            //     console.log(res)
            //     if(res.data.length != 0) {
            //         var msg = card.events(session, res.data);
            //         builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
            //     } else {
            //         session.endConversation('Sorry, there\'s no available event. ☹');
            //     } 
            // });
            const res = await event.searchByLocation(results.response);

            if(res.data.length != 0) {
                var msg = card.events(session, res.data, 'search');
                builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            } else {
                session.endConversation('Sorry, there\'s no available event. ☹');
            } 
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

module.exports.byBudget = [
    (session, args) => {
        builder.Prompts.number(session, "How much is your preferred budget? <br/><br/>eg. (500, 1000, 3000 etc...)");
    }, 
    (session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            // api.searchByBudget(results.response, (res) => {
            //     console.log(res)
            //     if(res.data.length != 0) {
            //         var msg = card.events(session, res.data);
            //         builder.Prompts.choice(session, msg, card.eventChoices(res.data), consts.styles.mr_button);
            //     } else {
            //         session.endConversation('Sorry, there\'s no available event. ☹');
            //     } 
            // });
            const res = await event.searchByLocation(results.response);

            if(res.data.length != 0) {
                var msg = card.events(session, res.data, 'search');
                builder.Prompts.choice(session, msg, card.eventChoices(res.data, 'search'), consts.styles.mr_button);
            } else {
                session.endConversation('Sorry, there\'s no available event. ☹');
            } 
            
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