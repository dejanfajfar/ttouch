"use strict";

const printer = require('../helper/print');

module.exports = (context, message) => {
    return new Promise((resolve, reject) => {
        printer.info(message);
        resolve();
    });
};