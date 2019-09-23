"use strict";

module.exports = (context) => {
    return new Promise((resolve, reject) => {
        if(!fsf.doesFolderExist(directoryPath)){
            fsf.createDirectory(directoryPath);
            printHelper.onDirectoryCreated(directoryPath);
        }
    });
};
