const request = require('axios');
const format = require('string-format');

/**EVENT API*/
module.exports.searchByDate = 
async(date) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byavailabledate?visit_date=' + date),
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

module.exports.searchByName = 
async(name) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byname?event_title=' + name),
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

module.exports.searchByPax = 
async(pax) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/bynumberofguest?number_of_guest=' + pax),
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

module.exports.searchByLocation = 
async(loc) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/bylocation?location=' + loc),
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

module.exports.searchByBudget = 
async(budget) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/bybudget?budget=' + budget),
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

module.exports.popularEvents = 
async() => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/popular'),
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

module.exports.upcomingEvents = 
async() => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/upcoming'),
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


module.exports.availability = 
async(id) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/availability/' + id),
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

module.exports.eventById = 
async(id) => {
    var options = {
        url: format(process.env.EVENT_URI, '/event/byid/' + id),
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

module.exports.createBooking = 
async(body) => {
    var options = {
        url: format(process.env.EVENT_URI, '/booking'),
        method: 'POST',
        data: body
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