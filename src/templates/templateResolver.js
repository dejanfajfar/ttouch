"user strict";

const templateHelper = require("../helper/template");
const gitHelpers = require('../helper/gitHub');

const templateResolvers = {
    [templateHelper.TYPE_GIST]: resolveGistTemplate,
    [templateHelper.TYPE_REPOSITORY]: () => {},
    [templateHelper.TYPE_UNKNOWN]: () => { return ''; }
}

const LC_RESOLVE_TEMPLATE = 'lcrestemp';
const LC_RESOLVE_COMPLETE = 'lcrescomp';

/**
 * 
 * The onProgress callback function
 * @callback onProgress
 * @param {string} lifeCycleName - The name of the lifecycle just began
 */

/**
 * Resolves a template identifier to a template text
 * @param {string} templateIdentifier - The unique template identifier
 * @param {onProgress} onProgress - The progress callback
 * @param {onCompleted} onCompleted - The callback triggered when the resolve finishes
 * @returns {string} The template text
 */
async function resolveTemplate(templateIdentifier, onProgress) {
    let resolver = templateResolvers[classifyTemplateIdentifier(templateIdentifier)];

    onProgress(LC_RESOLVE_TEMPLATE);
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
    return templateHelper.TYPE_UNKNOWN;
}

/**
 * Retrieves the gist 
 * @param {string} templateIdentifier - The unique template identifier
 * @param {onProgress} onProgress - The callback called when the lifecycle of the resolver changes
 * @returns {string} Template string
 */
async function resolveGistTemplate(templateIdentifier, onProgress) {
    let gistId = templateHelper.parseGistId(templateIdentifier);

    return await gitHelpers.getGist(gistId);
}

module.exports = resolveTemplate;
