"use strict";

const camelCase = require('camelcase');
const fsf = require('./fileSystem');
const templates = require('./template');

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
        isGist: templates.isGistId(originalName),
        isRepository: templates.isRepository(originalName),
        isAlias: templates.isAlias(originalName),
        isFilePath: !templates.isGistId(originalName) && !templates.isRepository(originalName) && !templates.isFileTemplate(originalName) && !templates.isAlias(originalName)
    }
}

module.exports.inlineContextData = (contextData) => {
    return (item, index, origin) => {
        return {
            ...item,
			isVerbose: contextData.isVerbose,
			template: contextData.template,
			timeStamp: contextData.timeStamp
        };
    };
}

module.exports.applyInlineTemplate = (selectedTemplate) => {
	return (item, index, origin) => {
        if (selectedTemplate === undefined || selectedTemplate === '' || selectedTemplate === null) {
            return item;
        }
		let retVal = {
            ...item,
            template: selectedTemplate
        };

		return retVal;
	};
}
