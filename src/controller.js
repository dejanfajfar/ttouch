'use strict';

const fsf = require('./helper/fileSystem');
const template = require('./helper/template');
const errorHandler = require('./handleError');

function doTTouch(options) {

    const baseFolder = fsf.determineDestinationFolder(options);

    for(let file of options.files) {
        let absolutePath = fsf.combinePath(baseFolder, file);
        let { folderName, fileName } = fsf.analyseFilePath(absolutePath);

        if(!fsf.doesFolderExist(folderName)){
            fsf.createFolder(folderName);
        }
        fsf.createFile(absolutePath);

        let renderedTemplate = template({
            absolutePath: absolutePath,
            fileName: fileName,
            template: options.template,
			isVerbose: options.isVerbose
        });

		fs.writeFileSync(options.absolutePath, renderedTemplate);

		printHelper.onFileWritten(options.template, options.fileName)
    }
}

module.exports = options => {
	errorHandler(options.isVerbose, () => {
		doTTouch(options);
	});
};
