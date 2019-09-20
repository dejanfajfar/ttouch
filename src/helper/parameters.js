"use strict";

const camelCase = require('camelcase');
const path = require('path');
const fsf = require('./fileSystem');

module.exports.isGistId = (parameter) => {
    return /^(g|G):.*$/.test(parameter);
}

module.exports.isRepository = (parameter) => {
    return /^\w*\/\w*$/.test(parameter);
}

module.exports.parseGistId = (parameter) => {
    if (!this.isGistId(parameter)){
        return parameter;
    }

    return parameter.split(':').pop();
}

module.exports.parseRepository = (parameter) => {
    if (!this.isRepository(parameter)) {
        return {
            userName: '',
            repoName: ''
        }
    }

    let parameterSplit = parameter.split('/');

    return {
        userName: parameterSplit[0],
        repoName: parameterSplit[1]
    };
}

module.exports.expandFileName = (fileName) => {
    let foo = fsf.getFileName(fileName);

    return {
        name: fileName,
        upperCaseCamelCase: camelCase(foo, {pascalCase: true}),
        lowerCaseCamelCase: camelCase(foo, {pascalCase: false}),
        extension: fsf.getFileExtension(fileName)
    }
};