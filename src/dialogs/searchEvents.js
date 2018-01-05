const builder = require('botbuilder');
const format = require('string-format');

const consts = require('../config/consts');
const card = require('../helpers/cardBuilder');
const api = require('../helpers/apiRequest');

module.exports.byDate = [
    (session, args) => {
        builder.Prompts.time(session, "What is your desired visit date?");
    }, 
    (session, results) => {
        if(!results.response){
            session.replaceDialog('/');
        } else {
            console.log(results.response.resolution.start)

            api.searchByDate(results.response.resolution.start, (res) => {
                console.log(res.data);
            });
        }
    }
]

module.exports.byPax = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]

module.exports.byName = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]

module.exports.byLocation = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]

module.exports.byBudget = [
    (session, args) => {

    }, 
    (session, results) => {

    }
]