const builder = require('botbuilder');

exports.PORT = 3978;

exports.prompts = {
    default: [
        'Can you say that again? :) or try tapping buttons below 👇', 
        'Pardon please? or tap choices below 👇', 
        'Sorry can you say that in other way?', 
        'Again please I didn\'t get it', 
        'Sorry I\'m a bit slow can you say that again?', 
        'I really didn\'t get it can you tap the button below it might help :) 👇',
        '❓❓❓ 👇👇👇',
        'What was that again??? 😅',
        'Ugh.... I\'m confusing sorry. 🙄😅'
    ]
};

exports.choices = {
    confirm: ['Yes', 'No']
};

module.exports.cards = {
    welcome: [
        {
            name: 'welcome',
            title: 'ChatbotPH',
            text: 'Base Card/Carousel Template.',
            image: 'http://res.cloudinary.com/hobwovvya/image/upload/v1494397786/chatbot_logo_head_c5ya3g.png',
            button: [
                {msg:'Start', btn_title: 'Start'},
                {msg:'Cancel', btn_title: 'Cancel'},
                {url:'https://www.facebook.com/chatbotPH/', btn_title: 'ChatbotPH'}
            ]
        }
    ]
}

module.exports.styles = {
    button: { listStyle: builder.ListStyle.button },
    inline: { listStyle: builder.ListStyle.inline },
    list: { listStyle: builder.ListStyle.list },
    auto: { listStyle: builder.ListStyle.auto },
    none: { listStyle: builder.ListStyle.none },
    mr_button: {listStyle: builder.ListStyle.button, maxRetries: 0},
    mr_inline: {listStyle: builder.ListStyle.inline, maxRetries: 0},
    mr_list: {listStyle: builder.ListStyle.list, maxRetries: 0},
    mr_auto: {listStyle: builder.ListStyle.auto, maxRetries: 0},
    mr_none: {listStyle: builder.ListStyle.none, maxRetries: 0}
}