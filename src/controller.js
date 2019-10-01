'use strict';

const fsf = require('./helper/fileSystem');
const errorHandler = require('./errorHandler');
const parameterHelper = require('./helper/parameters');

const TemplateStore = require('./templates/templateStore');

const createDestinationFolder = require('./parts/createDestinationFolder');
const printStart = require('./parts/printFileJobStartInfo');
const printStop = require('./parts/printFileJobStopInfo');
const createFile = require('./parts/createFile');

/**
 * Main method that actually executes all the work
 * @param {*} parameters The parameters entered by the user
 */
function doTTouch(contexts) {
	const templateStore = new TemplateStore();

    Promise.all(contexts.map(context => {
        Promise.resolve()
        .then(printStart(context))
        .then(createDestinationFolder(context))
        .then(createFile(context))
        .then(printStop(context));
    }))

    /*
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
    */
}

function expandParameters(userParameters){
    const destinationPath = fsf.determineDestinationFolder(userParameters);

    let inlineTemplate = userParameters.files
    .map(parameterHelper.analyseFileNames)
	.filter(file => !file.isFilePath);

    let expandedFilesData = userParameters.files
    .map(parameterHelper.applyDestinationPath(destinationPath))
    .map(parameterHelper.analyseFileNames)
    .filter(file => file.isFilePath)
    .map(parameterHelper.expandFileName)
	.map(parameterHelper.inlineContextData(userParameters))
	.map(parameterHelper.applyInlineTemplate(inlineTemplate));

    return expandedFilesData;
}

module.exports = parameters => {
	errorHandler(parameters.isVerbose, () => {
		doTTouch(expandParameters(parameters));
	});
};
