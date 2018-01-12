const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');
const event = require('../helpers/event-helper');

module.exports = [
    async(session, args, next) => {
        
        // api.availability(args.event_id, (res) => {
        //     api.eventById(args.event_id, (res) => {
        //         session.conversationData.body.client = res.data[0].client; // Get client id
        //     });
        //     session.conversationData.dates = card.idChoices(res.data) // get event day name and id
        //     builder.Prompts.choice(session, 'What\'s your preferred date? 📅', card.idChoices(res.data), consts.styles.mr_button);
        // });
        
        const res1 = await event.availability(args.event_id);
        const res2 = await event.eventById(args.event_id);
                
                
        session.conversationData.body = {}
        session.conversationData.body.event = args.event_id; // Get event id
        session.conversationData.body.client = res2.data[0].client; // Get client id
        session.conversationData.dates = card.idChoices(res1.data) // get event day name and id
        builder.Prompts.choice(session, 'What\'s your preferred date? 📅', card.idChoices(res1.data), consts.styles.mr_button);
  
    },
    (session, results) => {
        var date = session.conversationData.dates[results.response.entity];

        session.conversationData.body.event_schedule = date.event_id // Get event schedule id
        builder.Prompts.number(session, 'How many of you will join this event?');
    },
    (session, results) => {
        session.conversationData.body.number_of_pax = results.response; // Get number of pax
        session.send('Alright got it!');
        builder.Prompts.number(session, 'Please enter your contact number');
    },
    async(session, results) => {
        session.conversationData.body.contact_number = results.response; // Get contact number
        session.conversationData.body.fb_id = session.message.user.id; // Get fb id

        // api.userProfile(session.message.user.id, 'first_name,last_name', (err, res) => {
        //     session.conversationData.body.lead_guest = {
        //         firstname: res.first_name,
        //         lastname: res.last_name
        //     } // Get lead guest dtl
            
        //     api.createBooking(session.conversationData.body);
        //     session.send('Cool thanks!');
        //     session.endConversation('Your booking is ready but you are not yet reserved for the slots \nplease settle downpayment Amounting: P5000 \n before 24hrs to these accounts');
        // });

       const res = await api.userProfile(session.message.user.id, 'first_name,last_name');

       session.conversationData.body.lead_guest = {
            firstname: res.first_name,
            lastname: res.last_name
        } // Get lead guest dtl
        
        await event.createBooking(session.conversationData.body);
        session.send('Cool thanks!');
        session.endConversation('Your booking is ready but you are not yet reserved for the slots \nplease settle downpayment Amounting: P5000 \n before 24hrs to these accounts');

    }
]