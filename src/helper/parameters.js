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
        isFilePath: !templates.isGistId(originalName) && !templates.isRepository(originalName)
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

module.exports.applyInlineTemplate = (inlineTemplateData) => {
	return (item, index, origin) => {
		let retVal = {
			...item
		};

		if (inlineTemplateData instanceof Array){
			let inlineTemplate = inlineTemplateData[0];

			if(inlineTemplate && inlineTemplate){
				retVal.template = item.template || inlineTemplate;
			}
		}

		return retVal;
	};
}
