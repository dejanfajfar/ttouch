'use strict';

const fsf = require('./fileSystemFunctions');
const template = require('./templateHelper');

module.exports = (options) => {

    const baseFolder = fsf.determineCallingFolder(options);

    for(let file of options.files) {
        let absolutePath = fsf.combinePath(baseFolder, file);
        let { folderName, fileName } = fsf.analyseFilePath(absolutePath);

        if(!fsf.doesFolderExist(folderName)){
            fsf.createFolder(folderName);
        }
        fsf.createFile(absolutePath, fileName);

        template({
            absolutePath: absolutePath,
            fileName: fileName,
            template: options.template
        });
    }


};