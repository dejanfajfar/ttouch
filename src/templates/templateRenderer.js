"user strict";

const handlebars = require('handlebars');

/**
 * Implements the ttouch template renderer
 */
class TemplateRenderer {

    /**
     * 
     * @param {string} template - The template text to be rendered
     * @param {object} templateData - The data provided for the template text
     * @returns {string} - The rendered template
     */
    renderTemplate(template, templateData) {

        if(template === null || template === undefined) {
            return '';
        }
        const templateFunction = handlebars.compile(template);

        return templateFunction(templateData);
    }
}

module.exports = TemplateRenderer;