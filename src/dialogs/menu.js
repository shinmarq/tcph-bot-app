const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');

module.exports = [
    (session) => {
        var cardName = card.getName(consts.cards.main_menu);
        var msg = card(session, consts.cards.main_menu, cardName);

        builder.Prompts.choice(session, msg, card.choices(consts.cards.main_menu), consts.styles.mr_button);
    },
    (session, results) => {
        var choices = card.choices(consts.cards.main_menu);

        if(!results.response) {
            session.replaceDialog('/')
        } else if (results.response.entity == choices[0]) {
            session.endConversation(results.response.entity);
        } else if (results.response.entity == choices[1]) {
            session.endConversation(results.response.entity);
        } else {
            session.endConversation(results.response.entity);
        }
    }
]