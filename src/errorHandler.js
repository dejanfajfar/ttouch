'use strict';

const printHelper = require('./helper/print');

const TemplateNotFoundError = require('./errors/templateNotFoundError');
const TemplateRenderingError = require('./errors/templateRenderingError');
const TemplateInvalidError = require('./errors/templateInvalidError');

module.exports = (isVerbose, err) => {
    if (err instanceof TemplateNotFoundError) {
		printHelper.error('Template could not be found');

		if (isVerbose) {
			printHelper.error(err.innerError.message);
		}

		printHelper.info(`Try installing it with npm install -g ${err.templateName}`);

	} else if(err instanceof TemplateRenderingError) {
		printHelper.error('Template could not be rendered');

		if (isVerbose) {
			printHelper.error(err.innerError.message);
		}

		printHelper.info('The file has been created but left empty');

	} else if (err instanceof TemplateInvalidError) {
		printHelper.error('Template found but is invalid!');

		if (isVerbose) {
			printHelper.info(`The template ${err.template} does not expose a valid template function`);
			printHelper.info(`If you are the author of the template then please check the documentation at https://github.com/dejanfajfar/tttemplate`)
		}
	} else {
		printHelper.error('There was a catastrophic error!');

		if (isVerbose) {
			printHelper.error(err);
			printHelper.error(err.stack);
		}
	}

	process.exit();
};
