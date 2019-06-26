'use strict';

const npmHelper = require('./npm');

const TemplateInvalidError = require('../errors/templateInvalidError');

module.exports = options => {
    if (!options.template) {
        return;
    }

    const template = npmHelper.getTemplate(expandTemplateName(options.template));

    if (typeof template !== 'function') {
		throw new TemplateInvalidError(expandTemplateName(options.template));
	}

    return template(options);
};


function expandTemplateName(templateName) {
    return `ttt-${templateName}`;
}
