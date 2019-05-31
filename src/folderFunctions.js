'use strict';

const determineCallingFolder = (options) => {
    if (options.base) {
        return options.base;
    } else {
        return process.cwd();
    }

};

const createPath = path => {
    
}

module.exports = {
    determineCallingFolder: determineCallingFolder,
    createPath: createPath
};