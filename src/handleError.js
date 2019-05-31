'use strict';

const emoji = require('node-emoji');

const handleError = func => {
    try {
        func();
    } catch(e) {
        console.error(emoji.emojify(`:bangbang: Something went wrong \n ${e}`));
    }
}

module.exports = handleError;