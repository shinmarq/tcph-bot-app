const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports = [
    (session) => {
        // api.userProfile(session.message.user.id, 'first_name', (err, res) => {
            var cardName = card.getName(consts.cards.welcome);
            var msg = card(session, consts.cards.welcome, cardName);
    
            session.send(msg);
            builder.Prompts.choice(session, consts.prompts.introduction, consts.choices.menu, consts.styles.mr_button);
        // });
        
    },
    (session, results) => {
        if(!results.response) {
            session.replaceDialog('/');
        } else {
            // session.replaceDialog('/Menu');
            session.endConversation(results.response.entity)
        }
    }
]
