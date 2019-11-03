"use strict";

const templateResolver = require("../templates/templateResolver");
const printer = require("../shared/printer");

/**
 * Resolves the given templates into the shared templateStore
 * @param {string[]} templateIdentifiers - A list of template identifiers for which to retrieve the template text
 * @param {TemplateStore} templateStore - The shared template store
 */
async function resolveTemplates(templateIdentifier, templateStore) {
	let templateText
	
	try {
		templateText = await templateResolver.resolveTemplate(
			templateIdentifier
		);
	} catch (e){
		printer.warn(`Template ${templateIdentifier} could not be resolved`);
		printer.warn(e.message);
		printer.warn('The files will be created empty!')
		if(global.isVerbose) {
			printer.error(e.stack);
		}
	}
	templateStore.cacheTemplate(templateIdentifier, templateText);
}

module.exports = resolveTemplates;
