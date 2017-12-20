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
    ],
    introduction: 'Hi! Welcome to TravelCon 🇵🇭'
};

exports.choices = {
    confirm: ['Yes', 'No'],
    start: ['Let\'s start!']
};

module.exports.cards = {
    welcome: [
        {
            name: 'welcome',
            title: 'TravelCon Bot',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1513750244/Untitled-6-03_elkzdv.jpg',
            button: [
                // {msg:'Menu', btn_title: 'Show Menu ℹ'},
                // {msg:'Cancel', btn_title: 'Cancel'},
                // {url:'https://www.facebook.com/chatbotPH/', btn_title: 'ChatbotPH'}
            ]
        }
    ],
    main_menu: [
        {
            name: 'Popular Events',
            title: 'POPULAR EVENTS',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1513750244/Untitled-6-03_elkzdv.jpg',
            button: [
                {msg:'Popular_Events', btn_title: 'SHOW EVENTS'}
            ]
        },
        {
            name: 'Upcoming Events',
            title: 'UPCOMING EVENTS',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1513750244/Untitled-6-03_elkzdv.jpg',
            button: [
                {msg:'Upcoming_Events', btn_title: 'SHOW EVENTS'}
            ]
        },
        {
            name: 'Search Events',
            title: 'SEARCH EVENTS',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1513750244/Untitled-6-03_elkzdv.jpg',
            button: [
                {msg:'Search_Events', btn_title: 'SEARCH EVENTS'}
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