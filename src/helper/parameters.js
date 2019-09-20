"use strict";

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