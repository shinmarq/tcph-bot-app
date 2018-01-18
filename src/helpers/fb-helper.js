const request = require('axios');
const fb = require('fb-messenger'); 
const format = require('string-format');

/**FB USER-PROFILE API */
module.exports.userProfile = 
async(uid, fields) => {
    var options = {
        url: format('https://graph.facebook.com/v2.6/{0}?fields={1}&access_token={2}', uid, fields, process.env.ACCESS_TOKEN),
        method: 'GET'
    }

    return new Promise((resolve, reject) => {
        request(options)
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}
/**END */

/**FB GET STARTED BUTTON API */
module.exports.getStarted = 
(payload) => {
    var options = {
        url: format('https://graph.facebook.com/v2.6/me/messenger_profile?access_token={0}', process.env.ACCESS_TOKEN),
        method: 'POST',
        data: {
            get_started: {
                payload: payload
            }
        }
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
        data: body
    }

    request(options, (err, httpRes, body) => {
        !err ? console.log(body) : console.log(err); 
    })
}
/**END */

module.exports.sendMessage = 
(id, message) => {
    var messenger = new fb(process.env.ACCESS_TOKEN);
    
    messenger.sendTextMessage(id, message)
}

module.exports.getProfile =
async(id) => {
    var messenger = new fb(process.env.ACCESS_TOKEN);

    return new Promise((resolve, reject) => {
        messenger.getProfile(id, (res) => {
            console.log(res);
            resolve(res);
        });
    });
    
}
