const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const fb = require('../helpers/fb-helper');
const event = require('../helpers/event-helper');

module.exports = [
    async (session, args, next) => {
        const res1 = await event.availability(args.event_id);
        const res2 = await event.eventById(args.event_id);
        
        session.conversationData.slots = res1.data[0].available_slots;
        session.conversationData.body = {}
        session.conversationData.body.event = args.event_id; // Get event id
        session.conversationData.body.client = res2.data[0] ? res.data.client : res2.data[0].client; // Get client id
        session.conversationData.dates = card.idChoices(res1.data) // get event day name and id

        if(res1.data[0].available_slots != 0) {
            builder.Prompts.choice(session, 'What\'s your preferred visit date? 📅', card.idChoices(res1.data), consts.styles.mr_button);
        } else {
            session.endConversation('SORRY NO SLOTS AVAILABLE.');
        }
        
    },
    (session, results) => {
        session.conversationData.preferredDate = results.response.entity;
        var date = session.conversationData.dates[results.response.entity];
        
        session.conversationData.body.event_schedule = date.event_id // Get event schedule id
        session.send(format('{0} more slots available.', session.conversationData.slots));
        builder.Prompts.number(session, 'How many of you will join this event?');
    },
    (session, results) => {
        let slots = session.conversationData.slots;
        if(results.response <= slots) {
            session.conversationData.body.number_of_pax = results.response; // Get number of pax
            session.send('Alright got it!');
            builder.Prompts.number(session, 'Please enter your contact number');
        } else {
            session.endConversation('Your group exceeds the remaining slots, Would you like to request for open slots?');
        }
        
    },
    async (session, results) => {
        const res1 = await fb.userProfile(session.message.user.id, 'first_name,last_name');
        const res2 = await event.eventById(session.conversationData.body.event);

        session.conversationData.body.contact_number = results.response; // Get contact number
        session.conversationData.body.fb_id = session.message.user.id; // Get fb id
        session.conversationData.body.lead_guest = {
            firstname: res1.first_name,
            lastname: res1.last_name
        } // Get lead guest dtl

        session.send(`Here's the summary of your booking.  
                        <br/><br/>Tour: ${res2.data[0].event_title}
                        \n1.) Target Date: ${session.conversationData.preferredDate}                        
                        \n2.) Number of Pax: ${session.conversationData.body.number_of_pax}
                        \n3.) Contact #: ${session.conversationData.body.contact_number}
                        \n4.) Damage per head: ${parseInt(res2.data[0].rate)} 😅
                        \n5.) Down payment per head: ${parseInt(res2.data[0].reservation_amount)}
                        \n6.) Lead Guest: ${session.conversationData.body.lead_guest.firstname + ' ' + session.conversationData.body.lead_guest.lastname}`);
        builder.Prompts.choice(session, 'Confirm your booking details.', consts.choices.confirm_book, consts.styles.mr_button);
    },
    (session, results) => {
        var choices = consts.choices.confirm_book;

        if(!results.response) {
            session.replaceDialog('/')
        } else if(results.response.entity == choices[0]) {
            builder.Prompts.choice(session, 'Terms & Condition', consts.choices.terms, consts.styles.mr_button);
        } else if(results.response.entity == choices[1]) {
            session.conversationData = {}
            session.replaceDialog('/Menu', { reprompt: true, edit: true });
        } else {
            session.conversationData = {}
            session.replaceDialog('/Menu', { reprompt: true });
        }
    },
    async (session, results) => {
        var choices = consts.choices.terms;

        if (!results.response) {
            session.conversationData = {}
            session.replaceDialog('/')
        } else if (results.response.entity == choices[0]) {
            try {
                const res = await event.createBooking(session.conversationData.body);
                session.send(`Awesome! Your booking reference number is: ${res.data.booking_refno}`);
                session.send(`Please NOTE that: 
                                        \n* Your slot(s) will only be reserved upon settling the required down payment amounting PHP ${res.data.total_dp} 
                                        \n* This booking will expire in 24 hours 
                                        \n* Other guests may occupy your slot(s) because reservations are FIRST COME, FIRST SERVE basis.
                                        \n* Downpayment is NON REFUNDABLE but TRANSFERABLE to participants that will join the same event and schedule.    
                                        \nPAYMENT OPTIONS(DEPOSIT OR ONLINE FUND TRANSFER):
                                        <br/><br/>BDO<br/>Juan Delacrus<br/>12345
                                        <br/><br/>BPI<br/>Cardo Dalisay<br/>12345`);
                session.endConversation('Please send a photo of your proof of transfer/deposit within the next 24 hours.  See you soon buddy 😎 😎 ')
                session.conversationData = {}
            } catch (err) {
                console.log(err)
                session.endConversation(err.message + ' :(');
                session.conversationData = {}
            }
        } else {
            session.conversationData = {}
            session.replaceDialog('/Menu', { reprompt: true });
        }


    }
]

module.exports.checkRefNo = [
    (session, args) => {
        if (args && args.reprompt) {
            builder.Prompts.text(session, 'Invalid reference number, Please enter again your booking reference #');
        } else {
            builder.Prompts.text(session, 'Nice! Please enter your booking reference #');
        }
    },
    async (session, results) => {
        if (!results.response) {
            session.replaceDialog('/');
        } else {
            const res = await event.referenceNo(results.response);

            if (res.data.length != 0) {
                let ids = consts.adminIds;

                ids.forEach(id => {
                    fb.sendMessage(id, format(`Hi admin, ${session.message.user.name} has paid the down payment please check and validate Thank you! this is the ref #:${results.response}`));
                });

                session.endConversation('Thank you! you will be booked and reserved to this event once TravelCon admin validated your down payment. :)');
            } else {
                session.replaceDialog('/ReferenceNo', { reprompt: true });
            }


        }
    }
]