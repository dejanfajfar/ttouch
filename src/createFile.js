"use strict";

const emoji = require('node-emoji');
const fs = require('fs');

const createFile = fileOptions => {
    if(fileOptions.target) {
        throw new Error('Could not create file because of unknown target');
    }

    //fs.openSync(fileOptions.target, 'a');

    console.log(emoji.emojify(`:page_facing_up: Created file ${fileOptions.target}`));
};

module.exports = createFile;