"use strict";

const fs = require('fs');
const path = require('path');

module.exports.createFile = (absolutePath, content) => {

    fs.writeFileSync(absolutePath, content);
};

module.exports.createFolder = folderName => {
    fs.mkdirSync(folderName, {recursive: true});
};

module.exports.determineDestinationFolder = (options) => {
    if (options.dest) {
        return path.resolve(process.cwd(), path.normalize(options.dest));
    } else {
        return process.cwd();
    }
};

module.exports.combinePath = (basePath, file) => {
    return path.join(basePath, file);
};

module.exports.analyseFilePath = (filePath) => {
    let folderName = path.dirname(filePath);
    let fileName = path.basename(filePath);

    return {folderName, fileName};
};

module.exports.doesFolderExist = (folderPath) => {
    return fs.existsSync(folderPath);
};
