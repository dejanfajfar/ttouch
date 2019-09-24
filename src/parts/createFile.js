"use strict";

const fsf = require('../helper/fileSystem');
const printHelper = require('../helper/print');

module.exports = context => {
    return new Promise((resolve, reject) => {
        try {
            fsf.createFile(context.absolutePath);

            printHelper.onFileWritten(context.fullFileName);
            
            resolve();
        }catch(err) {
            reject(err);
        }
    });
}