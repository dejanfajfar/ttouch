'use strict';

const npmHelper = require('./npm');

const TemplateInvalidError = require('../errors/templateInvalidError');
const TemplateRenderingError = require('../errors/templateRenderingError');

module.exports = options => {
    if (!options.template) {
        return '';
    }

    const template = npmHelper.getTemplate(expandTemplateName(options.template));

    if (typeof template !== 'function') {
		throw new TemplateInvalidError(expandTemplateName(options.template));
	}

	try {
		return template(options);
	} catch (e) {
    	throw new TemplateRenderingError(options.template, e);
	}
};

/**
 * Expands the template name into a package name that is then loaded
 * @param templateName
 * The template name provided by the user through input parameter
 * @returns {string}
 * The package name that is then loaded
 */
function expandTemplateName(templateName) {
    return `ttt-${templateName}`;
}
