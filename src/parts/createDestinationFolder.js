"use strict";

const fsf = require('../helper/fileSystem');
const printHelper = require('../helper/print');

module.exports = (context) => {
    return new Promise((resolve, reject) => {
        try{
            if(!fsf.doesFolderExist(context.containingFolder)){
                fsf.createDirectory(context.containingFolder);
                printHelper.onDirectoryCreated(context.containingFolder);
            }
        } catch(err){
            reject(err);
        }
        resolve(context);
    });
};

module.exports.on = (eventType, callback) => {

}