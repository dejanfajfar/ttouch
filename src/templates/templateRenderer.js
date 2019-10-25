"user strict";

const handlebars = require("handlebars");

/**
 * Given a template text it is rendered using the handlebars templateting engine
 * @param {string} template - The template text to be rendered
 * @param {object} templateData - The data provided for the template text
 * @returns {string} - The rendered template
 */
function renderTemplate(template, templateData) {
	if (template === null || template === undefined) {
		return '';
	}
	const templateFunction = handlebars.compile(template);

	return templateFunction(templateData);
}

module.exports = renderTemplate;
