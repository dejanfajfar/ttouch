'use strict';

const fsf = require('./helper/fileSystem');
const template = require('./helper/template');
const errorHandler = require('./errorHandler');
const printHelper = require('./helper/print');
const parameterHelper = require('./helper/parameters');

/**
 * Main method that actually executes all the work
 * @param {*} parameters The parameters entered by the user
 */
function doTTouch(parameters) {
    const baseFolder = fsf.determineDestinationFolder(parameters);

    for(let file of parameters.files) {
        const absolutePath = fsf.combinePath(baseFolder, file);
        const { directoryPath, fileName } = fsf.analyseFilePath(absolutePath);

        if(!fsf.doesFolderExist(directoryPath)){
            fsf.createDirectory(directoryPath);
            printHelper.onDirectoryCreated(directoryPath);
        }

        const renderedTemplate = template({
            absolutePath: absolutePath,
            fileName: fileName,
            template: parameters.template,
			isVerbose: parameters.isVerbose
        });

		fsf.createFile(absolutePath, renderedTemplate);

		printHelper.onFileWritten(parameters.template, fileName);
    }
}

function expandParameters(userParameters){
    let expandedParameters = {};

    expandedParameters.files = userParameters.files.map(file => parameterHelper.expandFileName(fileName));

    return expandParameters;
}

module.exports = parameters => {
	errorHandler(parameters.isVerbose, () => {
		doTTouch(parameters);
	});
};
