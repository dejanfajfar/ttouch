'use strict';

const fsf = require('./helper/fileSystem');
const template = require('./helper/template');
const errorHandler = require('./errorHandler');
const printHelper = require('./helper/print');

function doTTouch(options) {
    const baseFolder = fsf.determineDestinationFolder(options);

    for(let file of options.files) {
        const absolutePath = fsf.combinePath(baseFolder, file);
        const { folderName, fileName } = fsf.analyseFilePath(absolutePath);

        if(!fsf.doesFolderExist(folderName)){
            fsf.createFolder(folderName);
            printHelper.onDirectoryCreated(folderName);
        }

        const renderedTemplate = template({
            absolutePath: absolutePath,
            fileName: fileName,
            template: options.template,
			isVerbose: options.isVerbose
        });

		fsf.createFile(absolutePath, renderedTemplate);

		printHelper.onFileWritten(options.template, fileName);
    }
}

module.exports = options => {
	errorHandler(options.isVerbose, () => {
		doTTouch(options);
	});
};
