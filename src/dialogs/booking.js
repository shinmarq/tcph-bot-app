const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const fb = require('../helpers/fb-helper');
const event = require('../helpers/event-helper');

module.exports = [
    async(session, args, next) => {
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
        const res1 = await fb.userProfile(session.message.user.id, 'first_name,last_name');
        const res2 = await event.eventById(session.conversationData.body.event);

        session.conversationData.body.contact_number = results.response; // Get contact number
        session.conversationData.body.fb_id = session.message.user.id; // Get fb id
        session.conversationData.body.lead_guest = {
            firstname: res1.first_name,
            lastname: res1.last_name
        } // Get lead guest dtl

        session.send(`Here's the summary of your booking details. <br/><br/> 
                        location: ${res2.location}
                        \nNumber of Pax${session.conversationData.body.number_of_pax}
                        \nContact #: ${session.conversationData.body.contact_number}
                        \nPer Head: ${parseInt(res2.reservation_amount) * session.conversationData.body.number_of_pax}
                        \nLead Guest: ${session.conversationData.body.lead_guest.firstname + ' ' + session.conversationData.body.lead_guest.lastname}`);
        builder.Prompts.choice(session, 'Terms & Condition', consts.choices.terms, consts.styles.mr_button);
    },
    async(session, results) => {
        var choices = consts.choices.terms;

        if(!results){
            session.conversationData = {}
            session.replaceDialog('/')
        } else if(results.response.entity == choices[0]) {
            await event.createBooking(session.conversationData.body);
            session.conversationData = {}
            session.send('Cool thanks!');
            session.endConversation('Your booking is ready but you are not yet reserved for the slots \nplease settle downpayment Amounting: P{0} \n before 24hrs to these accounts');
        } else {
            session.conversationData = {}
            session.replaceDialog('/Menu', {reprompt: true})
        }

        
    }
]