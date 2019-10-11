"use strict";

const fsf = require("./helper/fileSystem");
const errorHandler = require("./errorHandler");
const parameterHelper = require("./helper/parameters");

const TemplateStore = require("./templates/templateStore");

const createDestinationFolder = require("./parts/createDestinationFolder");
const printStart = require("./parts/printFileJobStartInfo");
const printStop = require("./parts/printFileJobStopInfo");
const createFile = require("./parts/createFile");
const writeTemplate = require("./parts/writeTemplate");
const resolveTemplates = require("./parts/resolveTemplate");

/**
 * Main method that actually executes all the work
 * @param {*} parameters The parameters entered by the user
 * @param {string} template - The template used to fill the files
 */
async function doTTouch(contexts, template) {
	const templateStore = new TemplateStore();

	await resolveTemplates(template, templateStore);

	let filePromises = contexts.map(context => {
		return Promise.resolve().then(async () => {
			printStart(context);
			createDestinationFolder(context);
			createFile(context);
			writeTemplate(context, templateStore);
			printStop(context);
		});
	});

	await Promise.all(filePromises);
	return 1;
}

function expandParameters(userParameters, usedTemplate) {
	const destinationPath = fsf.determineDestinationFolder(userParameters);

	let expandedFilesData = userParameters.files
		.map(parameterHelper.applyDestinationPath(destinationPath))
		.map(parameterHelper.analyseFileNames)
		.filter(file => file.isFilePath)
		.map(parameterHelper.expandFileName)
		.map(parameterHelper.inlineContextData(userParameters))
		.map(parameterHelper.applyInlineTemplate(usedTemplate));

	return expandedFilesData;
}

function determineUsedTemplate(userParameters) {
	if (userParameters.template) {
		return userParameters.template;
	}

	let inlineTemplates = userParameters.files
		.map(parameterHelper.analyseFileNames)
		.filter(file => !file.isFilePath)
		.map(inlineTemplate => inlineTemplate.origin);

	if (inlineTemplates.length > 0) {
		return inlineTemplates[0];
	}
}

module.exports = async parameters => {
	try {
		const template = determineUsedTemplate(parameters);
		const context = expandParameters(parameters, template);

		return await doTTouch(context, template);
	} catch (err) {
		errorHandler(parameters.isVerbose, err);
	}
};
