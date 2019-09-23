"use strict";

const camelCase = require('camelcase');
const path = require('path');
const fsf = require('./fileSystem');

module.exports.isGistId = (parameter) => {
    return /^(g|G):.*$/.test(parameter);
}

module.exports.isRepository = (parameter) => {
    return /^(r|R):\w*\/\w*$/.test(parameter);
}

module.exports.parseGistId = (parameter) => {
    if (!this.isGistId(parameter)){
        return parameter;
    }

    return parameter.split(':').pop();
}

module.exports.parseRepository = (parameter) => {
    if (!this.isRepository(parameter)){
        return parameter;
    }

    return parameter.split(':').pop();
}

module.exports.expandFileName = (item, index, origin) => {
    let fileNameWithoutExtension = fsf.getFileName(item.origin);
    let fileExtension = fsf.getFileExtension(item.origin);
    let absolutePath = fsf.combinePath(item.destinationPath, item.origin);
    let { directoryPath, fileName } = fsf.analyseFilePath(absolutePath);

    return {
        ...item,
        name: {
            name: fileNameWithoutExtension,
            upperCaseCamelCase: camelCase(fileNameWithoutExtension, {pascalCase: true}),
            lowerCaseCamelCase: camelCase(fileNameWithoutExtension, {pascalCase: false})
        },
        fullFileName: fileName,
        containingFolder: directoryPath,
        fileExtension: fileExtension,
        absolutePath: absolutePath
    }
};

module.exports.applyDestinationPath = destinationPath => { 
    return (path, index, origin) => {
        return {
            origin: path,
            destinationPath: destinationPath
        };
    }
}

module.exports.analyseFileNames = (fileName, index, origin) => {

    if(!fileName.origin) {
        fileName = {
            origin: fileName
        };
    }

    let originalName = fileName.origin;

    return {
        ...fileName,
        isGist: this.isGistId(originalName),
        isRepository: this.isRepository(originalName),
        isFilePath: !this.isGistId(originalName) && !this.isRepository(originalName)
    }
}

module.exports.inlineContextData = (contextData) => {
    return (item, index, origin) => {
        
        return {
            ...item,
            isVerbose: contextData.isVerbose
        };
    };
}