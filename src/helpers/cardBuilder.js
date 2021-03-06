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

module.exports.events = 
(session, events, filter) => {
    let item = [];
    if(filter === undefined || filter == ''){
        events.forEach(event => {
            item.push(new builder.HeroCard(session)
            .title(event.event_title + ' ' + event.client.agency_name)
            .text(event.description)
            .images([ 
                builder.CardImage.create(session, event.photo)
            ])
            .buttons([
                builder.CardAction.imBack(session, format('IN:{0}', event._id), 'INCLUSION'),
                builder.CardAction.imBack(session, format('AV:{0}', event._id), 'AVAILABILITY'),
                builder.CardAction.imBack(session, format('BN:{0}', event._id), 'BOOK NOW ✔')
            ]));
        });
    } else {
        events.forEach(event => {
            item.push(new builder.HeroCard(session)
            .title(event.event.event_title + ' ' + event.event.client.agency_name)
            .text(event.event.description)
            .images([ 
                builder.CardImage.create(session, event.event.photo)
            ])
            .buttons([
                builder.CardAction.imBack(session, format('IN:{0}', event.event._id), 'INCLUSION'),
                builder.CardAction.imBack(session, format('AV:{0}', event.event._id), 'AVAILABILITY'),
                builder.CardAction.imBack(session, format('BN:{0}', event.event._id), 'BOOK NOW ✔')
            ]));
        });
    }
    

    let msg = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(item);
    
    return msg;
}

module.exports.eventChoices =
(events, filter) => {
    var choices = [];
    if(filter === undefined || filter == ''){
        events.forEach(event => {
            for(i = 0; i <= 2; i++){
                if(i == 0){
                    choices.push(format('IN:{0}', event._id));
                } else if(i == 1){
                    choices.push(format('AV:{0}', event._id));
                } else {
                    choices.push(format('BN:{0}', event._id));
                }
            }
        });
    } else {
        events.forEach(event => {
            for(i = 0; i <= 2; i++){
                if(i == 0){
                    choices.push(format('IN:{0}', event.event._id));
                } else if(i == 1){
                    choices.push(format('AV:{0}', event.event._id));
                } else {
                    choices.push(format('BN:{0}', event.event._id));
                }
            }
        });
    }
    

    return choices;
}

module.exports.eventAvailability = 
(session, events) => {
    let item = [];
    events.forEach(event => {
        item.push(new builder.HeroCard(session)
        .title(event.name)
        .text('Are you available on this date? 📅')
        .images([ 
            ''
        ])
        .buttons([
            builder.CardAction.imBack(session, format('IN:{0}', event._id), 'CHOOSE THIS DATE ✔')
        ]));
    });

    let msg = new builder.Message(session)
    .attachmentLayout(builder.AttachmentLayout.carousel)
    .attachments(item);
    
    return msg;
}

module.exports.idChoices =
(events) => {
    var choices = [];
    var data = {};
    events.forEach(event => {
        data[event.name] = {
            event_id: event._id
        }
        // choices.push(data);
    });

    return data;
}

module.exports.availabilityDetails =
(events) => {
    var str = '';

    events.forEach(event => {

        if(event.available_slots != 0) {
            str += format(event.name + ' ({0} more slots) \n\n', event.available_slots);
        } else {
            str += event.name + ' (no slots available) \n\n';
        }
         
    });

    return str;
}




