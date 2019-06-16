"use strict";

const emoji = require('node-emoji');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports.createFile = absolutePath => {

    fs.openSync(absolutePath, 'a');

    console.log(emoji.emojify(`:page_facing_up: ${absolutePath} ${chalk.bold.green('created')}`));
};

module.exports.createFolder = folderName => {
    fs.mkdirSync(folderName, {recursive: true});

    console.log(emoji.emojify(`:file_folder: ${chalk.grey(folderName)} ${chalk.bold.green('created')}`));
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