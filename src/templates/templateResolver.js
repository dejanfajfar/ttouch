"user strict";

const templateHelper = require("../helper/template");
const fileSystemHelper = require("../helper/fileSystem");
const gitHelpers = require("../helper/gitHub");

const templateResolvers = {
	[templateHelper.TYPE_GIST]: resolveGistTemplate,
	[templateHelper.TYPE_FILE]: resolveFileTemplate,
	[templateHelper.TYPE_REPOSITORY]: async () => {},
	[templateHelper.TYPE_UNKNOWN]: async () => {
		return "UNKNOWN";
	}
};

const LC_RESOLVE_START = "lcrestart";
const LC_RESOLVE_COMPLETE = "lcrescomp";
const LC_GIST_RETRIEVE = 'lcgistre';
const LC_GIST_RETRIEVED = 'lcgistok';
const LC_FILE_START_READ = 'lcflstrd';
const LC_FILE_DONE_READ = 'lcfldnrd';

/**
 *
 * The onProgress callback function
 * @callback onProgress
 * @param {string} lifeCycleName - The name of the lifecycle just began
 */

/**
 * Resolves a template identifier to a template text
 * @async
 * @param {string} templateIdentifier - The unique template identifier
 * @param {onProgress} onProgress - The progress callback
 * @returns {string} The template text
 */
async function resolveTemplate(templateIdentifier, onProgress) {
	let resolver =
		templateResolvers[classifyTemplateIdentifier(templateIdentifier)];

	onProgress(LC_RESOLVE_START);
	let templateText = await resolver(templateIdentifier, onProgress);
	onProgress(LC_RESOLVE_COMPLETE);

	return templateText;
}

/**
 * Takes a template identifier and determines which TYPE it belongs to
 * @param {string} templateIdentifier - The template identifier
 * @returns {string} A string determining the type of the template identifier
 */
function classifyTemplateIdentifier(templateIdentifier) {
	if (templateHelper.isGistId(templateIdentifier)) {
		return templateHelper.TYPE_GIST;
	}
	if (templateHelper.isRepository(templateIdentifier)) {
		return templateHelper.TYPE_REPOSITORY;
	}
	if (templateHelper.isFileTemplate(templateIdentifier)) {
		return templateHelper.TYPE_FILE;
	}
	return templateHelper.TYPE_UNKNOWN;
}

/**
 * Retrieves the gist
 * @async
 * @param {string} templateIdentifier - The unique template identifier
 * @param {onProgress} onProgress - The callback called when the lifecycle of the resolver changes
 * @returns {string} Template string
 */
async function resolveGistTemplate(templateIdentifier, onProgress) {
	let gistId = templateHelper.parseGistId(templateIdentifier);
	
	onProgress(LC_GIST_RETRIEVE);
	let gistText = await gitHelpers.getGist(gistId);
	onProgress(LC_GIST_RETRIEVED);

	return gistText;
}

function resolveFileTemplate(templateIdentifier, onProgress) {
	let filePath = templateHelper.parseFileTemplate(templateIdentifier);

	let templateFileAbsolutePath = fileSystemHelper.determineFileAbsolutePathRelativeToCommand(filePath);
	onProgress(LC_FILE_START_READ);
	let templateContent = fileSystemHelper.readFile(templateFileAbsolutePath);
	onProgress(LC_FILE_DONE_READ);

	return templateContent;
}

module.exports = {
    resolveTemplate,
    LC_GIST_RETRIEVE,
    LC_GIST_RETRIEVED,
    LC_RESOLVE_COMPLETE,
	LC_RESOLVE_START,
	LC_FILE_DONE_READ,
	LC_FILE_START_READ
};
