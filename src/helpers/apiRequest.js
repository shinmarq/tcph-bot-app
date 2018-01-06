const request = require('request');
const format = require('string-format');

/**FB USER-PROFILE API */
module.exports.userProfile = 
(uid, fields, callback) => {
    var options = {
        url: format('https://graph.facebook.com/v2.6/{0}?fields={1}&access_token={2}', uid, fields, process.env.ACCESS_TOKEN) ,
        method: 'GET'
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(null, JSON.parse(body)) : callback(err, body); 
    })
}
/**END */

/**FB GET STARTED BUTTON API */
module.exports.getStarted = 
(payload) => {
    var options = {
        url: format('https://graph.facebook.com/v2.6/me/messenger_profile?access_token={0}', process.env.ACCESS_TOKEN),
        method: 'POST',
        body: {
            get_started: {
                payload: payload
            }
        },
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? console.log(body) : console.log(err); 
    })
}
/**END */

/**FB PERSISTENT MENU API */
module.exports.persistentMenu = 
(body) => {
    var options = {
        url: format('https://graph.facebook.com/v2.6/me/messenger_profile?access_token={0}', process.env.ACCESS_TOKEN),
        method: 'POST',
        body: body,
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? console.log(body) : console.log(err); 
    })
}
/**END */

/**EVENT API*/
module.exports.searchByDate = 
(date, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byavailabledate?visit_date=' + date),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.searchByName = 
(name, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byname?event_title=' + name),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.searchByPax = 
(pax, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/bynumberofguest?number_of_guest=' + pax),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.searchByLocation = 
(loc, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/location?location=' + loc),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.popularEvents = 
(callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/popular'),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.upcomingEvents = 
(callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/upcoming'),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}


module.exports.availability = 
(id, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/availability/' + id),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}

module.exports.eventById = 
(id, callback) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byid/' + id),
        method: 'GET',
        json: true
    }

    request(options, (err, httpRes, body) => {
        !err ? callback(body) : console.log(err); 
    });
}
/**END */