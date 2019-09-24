"use strict";

const printer = require('../helper/print');

module.exports = (context) => {
    return new Promise((resolve, reject) => {
        printer.onFileJobFinished(
            context.fullFileName,
            context.containingFolder,
            context.template
        )
        resolve();
    });
};