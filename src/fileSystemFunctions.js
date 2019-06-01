"use strict";

const emoji = require('node-emoji');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const createFile = (absolutePath, fileName) => {

    fs.openSync(absolutePath, 'a');

    console.log(emoji.emojify(`:page_facing_up: ${fileName} ${chalk.bold.green('created')}`));
};

const createFolder = folderName => {
    fs.mkdirSync(folderName, {recursive: true});

    console.log(emoji.emojify(`:file_folder: ${chalk.grey(folderName)} ${chalk.bold.green('created')}`));
};

const determineCallingFolder = (options) => {
    if (options.base) {
        return path.resolve(process.cwd(), path.normalize(options.base));
    } else {
        return process.cwd();
    }
};

const combinePath = (basePath, file) => {
    return path.join(basePath, file);
};

const analyseFilePath = (filePath) => {
    let folderName = path.dirname(filePath);
    let fileName = path.basename(filePath);

    return {folderName, fileName};
};

const doesFolderExist = (folderPath) => {
    return fs.existsSync(folderPath);
};

module.exports = {
    createFile: createFile,
    determineCallingFolder: determineCallingFolder,
    combinePath: combinePath,
    analyseFilePath: analyseFilePath,
    doesFolderExist: doesFolderExist,
    createFolder: createFolder
};