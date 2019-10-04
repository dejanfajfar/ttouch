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
 */
async function doTTouch(contexts, templates) {
	const templateStore = new TemplateStore();

	await resolveTemplates(templates, templateStore);

	let filePromises = contexts.map(context => {
		return Promise.resolve().then(async () => {
			printStart(context);
			createDestinationFolder(context);
			createFile(context);
			writeTemplate(context, templateStore);
			printStop(context);
		});
	});

	let foo = await Promise.all(filePromises);
	return 1;
}

function expandParameters(userParameters) {
	const destinationPath = fsf.determineDestinationFolder(userParameters);

	let inlineTemplates = userParameters.files
		.map(parameterHelper.analyseFileNames)
		.filter(file => !file.isFilePath)
		.map(inlineTemplate => inlineTemplate.origin);

	let expandedFilesData = userParameters.files
		.map(parameterHelper.applyDestinationPath(destinationPath))
		.map(parameterHelper.analyseFileNames)
		.filter(file => file.isFilePath)
		.map(parameterHelper.expandFileName)
		.map(parameterHelper.inlineContextData(userParameters))
		.map(parameterHelper.applyInlineTemplate(inlineTemplates));

	return [ expandedFilesData, inlineTemplates ];
}

module.exports = async parameters => {
	try {
		let [context, templates] = expandParameters(parameters);
		return await doTTouch(context, templates);
	} catch (err) {
		errorHandler(parameters.isVerbose, err);
	}
};
