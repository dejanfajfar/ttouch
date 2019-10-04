"use strict";

const templateResolver = require("../templates/templateResolver");
const printer = require("../helper/print");

const lifeCycleMap = {
	[templateResolver.LC_RESOLVE_START]: "Resolving template...",
	[templateResolver.LC_RESOLVE_COMPLETE]: "Template resolved",
	[templateResolver.LC_GIST_RETRIEVE]: "Retrieving GIST...",
	[templateResolver.LC_GIST_RETRIEVED]: "GIST retrieved"
};

/**
 * Resolves the given templates into the shared templateStore
 * @param {string[]} templateIdentifiers - A list of template identifiers for which to retrieve the template text
 * @param {TemplateStore} templateStore - The shared template store
 */
async function resolveTemplates(templateIdentifier, templateStore) {
	let templateText
	
	try {
		templateText = await templateResolver.resolveTemplate(
			templateIdentifier,
			progress => {
				printer.printResolveProgress(lifeCycleMap[progress] || progress);
			}
		);
	} catch (e){
		printer.warning(`Template ${templateIdentifier} could not be retrieved falling back to creating an empty file`);
	}
	templateStore.cacheTemplate(templateIdentifier, templateText);
}

module.exports = resolveTemplates;
