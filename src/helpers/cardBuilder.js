const builder = require('botbuilder');
const format = require('string-format');

module.exports =
(session, card, name, concat) => {
    let item = [];
    /**loop thru card name*/
    name.forEach((names, index) => {
        /**loop thru cards and get card/s*/
        card.forEach((cards, index) => {
            /**filter card name/s*/
            if(cards.name == names){
                if(('button' in cards)){
                    let button = [];

                    /**loop thru buttons and get button/s*/
                    cards.button.forEach((btn) => {
                        if('msg' in btn){button.push(builder.CardAction.imBack(session, btn.msg, btn.btn_title));}
                        if('url' in btn){button.push(builder.CardAction.openUrl(session, btn.url, btn.btn_title));}
                    });

                    item.push(new builder.HeroCard(session)
                    .title(cards.title)
                    .text(concat != undefined ? format(cards.text, concat) : cards.text)
                    .images([ 
                        builder.CardImage.create(session, cards.image)
                    ])
                    .buttons(button));

                    button = [];
                } else {

                    item.push(new builder.HeroCard(session)
                    .title(cards.title)
                    .text(concat != undefined ? format(cards.text, concat) : cards.text)
                    .images([ 
                        builder.CardImage.create(session, cards.image)
                    ]));

                }
            }

        });
    });
    
    /**build card message*/
    let msg = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(item);
    
    return msg;
}

/**Get card name */
module.exports.getName =  
(card) => {
    var names = []
    card.forEach((key) => {
        names.push(key.name);
    });

    return names;
}

/**get card choices */
module.exports.choices = 
(card) => {
    var choices = []
    card.forEach((key) => {
        key.button.forEach((key) => {
            if(key.msg != undefined){
                choices.push(key.msg);
            }
        })
    })

    return choices;
}

