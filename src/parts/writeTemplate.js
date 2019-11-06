"use strict";

const templateRenderer = require("../templates/templateRenderer");
const fsHelper = require("../helper/fileSystem");
const printer = require("../shared/printer");

/**
 * The passed context information
 * @typedef {object} Context
 * @param {string} template - The template identifier to be used to render this file
 * @param {string} absolutePath - The absolute system specific path to the target file
 */

/**
 *
 * @param {Context} context - The template data and context information for this file
 * @param {TemplateStore} templateStore - The template store instance to
 */
function renderTemplate(context, templateStore) {
	if (!context.template) {
		printer.info("File will be created empty");
		return '';
	}

	const templateIdentifier = context.template;

	let templateText = templateStore.getTemplate(templateIdentifier);

	let renderedTemplate = templateRenderer(templateText, context);

	fsHelper.writeToFile(context.absolutePath, renderedTemplate);
	printer.debug(`Written template to ${context.absolutePath}`);

	return renderedTemplate;
}

module.exports = renderTemplate;
