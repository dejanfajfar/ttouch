'use strict';

const printHelper = require('./helper/print');

const TemplateNotFoundError = require('./errors/templateNotFoundError');
const TemplateRenderingError = require('./errors/templateRenderingError');
const TemplateInvalidError = require('./errors/templateInvalidError');

module.exports = (isVerbose, func) => {
    try {
        func();
    } catch(e) {
		if (e instanceof TemplateNotFoundError) {
			printHelper.error('Template could not be found');

			if (isVerbose) {
				printHelper.error(e.innerError.message);
			}

			printHelper.info(`Try installing it with npm install -g ${e.templateName}`);

		} else if(e instanceof TemplateRenderingError) {
			printHelper.error('Template could not be rendered');

			if (isVerbose) {
				printHelper.error(e.innerError.message);
			}

			printHelper.info('The file has been created but left empty');

		} else if (e instanceof TemplateInvalidError) {
			printHelper.error('Template found but is invalid!');

			if (isVerbose) {
				printHelper.info(`The template ${e.template} does not expose a valid template function`);
				printHelper.info(`If you are the author of the template then please check the documentation at https://github.com/dejanfajfar/tttemplate`)
			}
		} else {
			printHelper.error('There was a catastrophic error!');

			if (isVerbose) {
				printHelper.error(e.message);
			}
		}
    }
};
