"use strict";

const templateResolver = require("../templates/templateResolver");
const printer = require("../helper/print");

const lifeCycleMap = {
	[templateResolver.LC_RESOLVE_START]: "Resolving template...",
	[templateResolver.LC_RESOLVE_COMPLETE]: "Template resolved",
	[templateResolver.LC_GIST_RETRIEVE]: "Retrieving GIST...",
	[templateResolver.LC_GIST_RETRIEVED]: "Done",
	[templateResolver.LC_FILE_START_READ]: "Reading template from the given file",
	[templateResolver.LC_FILE_DONE_READ]: "Done"
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
				printer.info(lifeCycleMap[progress] || progress);
			}
		);
	} catch (e){
		printer.warn(`Template ${templateIdentifier} could not be resolved`);
		printer.warn(e.message);
		printer.warn('The files will be created empty!')
		if(global.isVerbose) {
			printer.error(e);
		}
	}
	templateStore.cacheTemplate(templateIdentifier, templateText);
}

module.exports = resolveTemplates;
