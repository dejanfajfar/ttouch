"user strict";

const templateHelper = require("../helper/template");

const gistResolver = require('./resolvers/gistResolver');


const templateResolvers = {
    [templateHelper.TYPE_GIST]: templateIdentifier => gistResolver(templateHelper.parseGistId(templateIdentifier)),
    [templateHelper.TYPE_REPOSITORY]: () => {}
}

/**
 * 
 * The onProgress callback function
 * @callback onProgress
 * @param {string} lifeCycleName - The name of the lifecycle just began
 */

 /**
  * The onCompleted callback function
  * @callback onCompleted
  */

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @param {onProgress} onProgress - The progress callback
 * @param {onCompleted} onCompleted - The callback triggered when the resolve finishes
 * @returns {string} The template text
 */
function resolveTemplate(templateIdentifier, onProgress, onCompleted) {
    let resolver = templateResolvers[classifyTemplateIdentifier(templateIdentifier)];

}

function classifyTemplateIdentifier(templateIdentifier) {
	if (templateHelper.isGistId(templateIdentifier)) {
		return templateHelper.TYPE_GIST;
	}
	if (templateHelper.isRepository(templateIdentifier)) {
        return templateHelper.TYPE_REPOSITORY;
	}
}

module.exports = resolveTemplate;
