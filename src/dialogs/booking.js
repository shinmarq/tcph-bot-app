const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports = [
    (session, args, next) => {
        // session.conversationData.body.client = args.event_id; // Get number of pax
        api.availability(args.event_id, (res) => {
            // var msg = card.eventAvailability(session, res.data);
            // console.log(card.idChoices(res.data));

            // builder.Prompts.choice(session, msg, card.idChoices(res.data), consts.styles.mr_button);
            session.conversationData.dates = card.idChoices(res.data) // get event day name and id
            builder.Prompts.choice(session, 'What\'s your preferred date? 📅', card.idChoices(res.data), consts.styles.mr_button);
        });
        
    },
    (session, results) => {
        var date = session.conversationData.dates[results.response.entity];
        session.conversationData.body = {}
        session.conversationData.body.event_date = date.event_id // Get event id

        builder.Prompts.number(session, 'How many of you will join this event?');
    },
    (session, results) => {
        session.conversationData.body.number_of_pax = results.response; // Get number of pax

        session.send('Alright got it!');
        builder.Prompts.number(session, 'Please enter your contact number');
    },
    (session, results) => {
        session.conversationData.body.contact_number = results.response; // Get contact number
        session.conversationData.body.fb_id = session.message.user.id; // Get fb id

        api.userProfile(session.message.user.id, 'first_name last_name', (err, res) => {
            session.conversationData.body.lead_guest = {
                firstname: res.first_name,
                lastname: res.last_name
            } // Get lead guest dtl

            console.log(session.conversationData.body);
            session.send('Cool thanks!');
            session.endConversation('Your booking is ready but you are not yet reserved for the slots \nplease settle downpayment Amounting: P5000 \n before 24hrs to these accounts');
        });
       
        
    }
]