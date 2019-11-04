"user strict";

const templateHelper = require("../helper/template");
const fileSystemHelper = require("../helper/fileSystem");
const gitHelpers = require("../helper/gitHub");
const configuration = require("../shared/configuration");
const printer = require("../shared/printer");

const templateResolvers = {
	[templateHelper.TYPE_GIST]: resolveGistTemplate,
	[templateHelper.TYPE_FILE]: resolveFileTemplate,
	[templateHelper.TYPE_ALIAS]: resolveAliasTemplate,
	[templateHelper.TYPE_REPOSITORY]: async () => {},
	[templateHelper.TYPE_UNKNOWN]: async () => {
		return "UNKNOWN";
	}
};

/**
 * Resolves a template identifier to a template text
 * @async
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The template text
 */
async function resolveTemplate(templateIdentifier) {
	let resolver =
		templateResolvers[classifyTemplateIdentifier(templateIdentifier)];

	let templateText = await resolver(templateIdentifier);

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
	if (templateHelper.isAlias(templateIdentifier)) {
		return templateHelper.TYPE_ALIAS;
	}
	return templateHelper.TYPE_UNKNOWN;
}

/**
 * Retrieves the gist
 * @async
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} Template string
 */
async function resolveGistTemplate(templateIdentifier) {
	let gistId = templateHelper.parseGistId(templateIdentifier);
	
	let gistText = await gitHelpers.getGist(gistId);

	return gistText;
}

async function resolveAliasTemplate(templateIdentifier) {
	let parsedAlias = templateHelper.parseAlias(templateIdentifier);
	
	let resolvedAlias = configuration.getAlias(parsedAlias);

	return await resolveTemplate(resolvedAlias);
}

function resolveFileTemplate(templateIdentifier, onProgress) {
	let filePath = templateHelper.parseFileTemplate(templateIdentifier);

	let templateFileAbsolutePath = fileSystemHelper.determineFileAbsolutePathRelativeToCommand(filePath);
	let templateContent = fileSystemHelper.readFile(templateFileAbsolutePath);

	return templateContent;
}

module.exports = {
    resolveTemplate
};
