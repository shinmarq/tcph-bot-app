const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts')
const fb = require('../helpers/fb-helper')

module.exports = [
    async(session) => {
        const res = await fb.userProfile(session.message.user.id, 'first_name');
        var msg = session.message;
        
        if (msg.attachments && msg.attachments.length > 0) {
         // Echo back attachment
         var attachment = msg.attachments[0];
            session.send({
                text: format('{0}, you\'ve sent an image/attachement! :)', res.first_name),
                attachments: [
                    {
                        contentType: attachment.contentType,
                        contentUrl: attachment.contentUrl,
                        name: attachment.name
                    }
                ]
            });
            builder.Prompts.choice(session, 'Is this a receipt of your down payment? :)', consts.choices.confirm);

        } else {
            // Echo back users text
            // session.send("You said: %s", session.message.text);
            actionDialog(session, session.message.text);
        }
        //Check if NLP present in sourceEvent
        // let entities = ('nlp' in session.message.sourceEvent.message) ? session.message.sourceEvent.message.nlp.entities : undefined;
        
        //If NLP is Entities present
        // if(entities !== undefined){
        //     var intent = Object.keys(entities).length != 0 && !(Object.keys(entities).length > 1) ? entities[Object.keys(entities)][0].value : 'default';
        // } else {
        //     var intent = 'default';
        // }

        // if (intent == 'default'){
        //     var body = {
        //         expression: session.message.text,
        //         client: process.env.CLIENT
        //     }

        //     api.inbox(body, (err, res) => {
        //         if(err) throw err;
        //         // session.endConversation(randomReplies(consts.prompts.default));
        //         builder.Prompts.choice(session, randomReplies(consts.prompts.default), consts.choices.default, consts.styles.mr_auto);
        //     });
        // } else {
        //     api.recognize(intent, (err, results) => {
        //         if(err) throw err;
                
        //         var replies = results.data.replies;
                
        //         api.userProfile(session.message.user.id, 'first_name', (err, res) => {
        //             session.endConversation(format(randomReplies(replies), res.first_name));
        //         });
                
        //     });
        // }
    },
    (session, results) => {
        var choices = consts.choices.confirm;

        if(!results.response){
            session.replaceDialog('/');
        } else if(results.response.entity == choices[0]){
            session.replaceDialog('/ReferenceNo');
        } else {
            session.endConversation('Okay please send only image of your receipt of down payment. Thank you have a nice day! :)');
        }
    }
]

const randomReplies = (replies) => {
    return replies[Math.floor(Math.random() * replies.length)];
}

const actionDialog = (session, message) => {
    let str = message;

    if(str.includes('AV:') || str.includes('IN:') || str.includes('BN:')) {
        var split = message.split(':');

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
    } else {
        session.endConversation(randomReplies(consts.prompts.default));
    }
}