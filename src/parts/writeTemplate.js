"use strict";

const templateRenderer = require("../templates/templateRenderer");
const templateResolver = require("../templates/templateResolver");
const fsHelper = require("../helper/fileSystem");
const printer = require("../helper/print");

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
		printer.info("No template found skipping");
		return '';
	}

	const templateIdentifier = context.template;

	let templateText = templateStore.getTemplate(templateIdentifier);

	printer.info("Rendering Template");
	let renderedTemplate = templateRenderer(templateText, context);
	printer.info("Writing template");
	fsHelper.writeToFile(context.absolutePath, renderedTemplate);
	printer.info("Done");
	return renderedTemplate;
}

module.exports = renderTemplate;
