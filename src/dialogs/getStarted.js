const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports = [
    (session) => {
        // api.userProfile(session.message.user.id, 'first_name', (err, res) => {
        //     // var cardName = card.getName(consts.cards.welcome);
        //     // var msg = card(session, consts.cards.welcome, cardName);
    
        //     // session.send(msg);
        //     session.send(format(consts.prompts.introduction, res.first_name));
        //     builder.Prompts.choice(session, format(consts.prompts.introduction, res.first_name), consts.choices.start, consts.styles.mr_button);
        // });
        try {
            api.userProfile(session.message.user.id, 'first_name')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err);
            })
            // session.send(format(consts.prompts.introduction, res.first_name));
            // builder.Prompts.choice(session, format(consts.prompts.introduction, res.first_name), consts.choices.start, consts.styles.mr_button);
        } catch(err) {
            console.log(err)
        }
        
    },
    (session, results) => {
        if(!results.response) {
            session.replaceDialog('/');
        } else {
            session.replaceDialog('/Menu');
        }
    }
]
