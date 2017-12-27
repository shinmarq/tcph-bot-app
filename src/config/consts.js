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
    introduction: 'Hi {0}! I am Champ, your travel companion! \nTogether, let\'s plan your next vacation ✈.',
    Menu: 'Select from these awesome options.'
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
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/c_scale,h_1150,w_1871/v1513750244/Untitled-6-03_elkzdv.jpg',
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
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1514359255/MostPopularTour-01_gxfogz.jpg',
            button: [
                {msg:'Popular_Events', btn_title: 'SHOW EVENTS'}
            ]
        },
        {
            name: 'Upcoming Events',
            title: 'UPCOMING EVENTS',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1514359282/UpcomingTours-01_fogl18.jpg',
            button: [
                {msg:'Upcoming_Events', btn_title: 'SHOW EVENTS'}
            ]
        },
        {
            name: 'Search Events',
            title: 'SEARCH EVENTS',
            text: '',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1514359304/SearchTours_2_-01_fy5ab9.jpg',
            button: [
                {msg:'Search_Events', btn_title: 'SEARCH EVENTS'}
            ]
        }
    ],
    sample_event: [
        {
            name: 'Tagaytay',
            title: 'Tagaytay package tour',
            text: '3 days and 2 nights package tour',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1514359255/MostPopularTour-01_gxfogz.jpg',
            button: [
                {msg:'Tagaytay_Tour', btn_title: 'BOOK NOW ✔'}
            ]
        },
        {
            name: 'Palawan',
            title: 'Palawan package tour',
            text: '3 days and 2 nights package tour',
            image: 'http://res.cloudinary.com/dbgg7bdhv/image/upload/v1514359282/UpcomingTours-01_fogl18.jpg',
            button: [
                {msg:'Palawan_Tour', btn_title: 'BOOK NOW ✔'}
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

module.exports.persistentMenu = {
    persistent_menu: [
        {
            locale: "default",
            // composer_input_disabled: false,
            call_to_actions: [
                {
                    title: "Start Over 🔁",
                    type: "postback",
                    payload: "Get_Started"
                },
                {
                    title: "Menu ℹ",
                    type: "postback",
                    payload: "Menu"
                },
                {
                    title: "Powered By Werpa Rangers 🤖",
                    type: "web_url",
                    url: "http://www.chatbot.ph/",
                    webview_height_ratio: "compact"
                },
            ]
        },
        {
            locale: "zh_CN",
            composer_input_disabled: false
        }
    ]
}