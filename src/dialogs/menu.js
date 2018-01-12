const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports = [
    async(session) => {
        // api.userProfile(session.message.user.id, 'first_name', (err, res) => {
        //     var cardName = card.getName(consts.cards.main_menu);
        //     var msg = card(session, consts.cards.main_menu, cardName);

        //     session.send(format(consts.prompts.introduction, res.first_name));
        //     session.send(consts.prompts.Menu);
        //     builder.Prompts.choice(session, msg, card.choices(consts.cards.main_menu), consts.styles.mr_button);
        // });
        const res = await api.userProfile(session.message.user.id, 'first_name');
        
        session.send(format(consts.prompts.introduction, res.first_name));
        session.send(consts.prompts.Menu);
        builder.Prompts.choice(session, msg, card.choices(consts.cards.main_menu), consts.styles.mr_button);
    },
    (session, results) => {
        var choices = card.choices(consts.cards.main_menu);

        if(!results.response) {
            session.replaceDialog('/')
        } else if (results.response.entity == choices[0]) {
            session.replaceDialog('/Events/Popular');
        } else if (results.response.entity == choices[1]) {
            session.replaceDialog('/Events/Upcoming');
        } else {
            session.replaceDialog('/Events/Search');
        }
    }
]