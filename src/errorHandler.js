'use strict';

const printer = require('./shared/printer');

const TemplateNotFoundError = require('./errors/templateNotFoundError');
const TemplateRenderingError = require('./errors/templateRenderingError');
const TemplateInvalidError = require('./errors/templateInvalidError');

module.exports = (isVerbose, err) => {
    if (err instanceof TemplateNotFoundError) {
		printer.error('Template could not be found');

		if (isVerbose) {
			printer.error(err.innerError.message);
		}

		printer.info(`Try installing it with npm install -g ${err.templateName}`);

	} else if(err instanceof TemplateRenderingError) {
		printer.error('Template could not be rendered');

		if (isVerbose) {
			printer.error(err.innerError.message);
		}

		printer.info('The file has been created but left empty');

	} else if (err instanceof TemplateInvalidError) {
		printer.error('Template found but is invalid!');

		if (isVerbose) {
			printer.info(`The template ${err.template} does not expose a valid template function`);
			printer.info(`If you are the author of the template then please check the documentation at https://github.com/dejanfajfar/tttemplate`)
		}
	} else {
		printer.error('There was a catastrophic error!');

		if (isVerbose) {
			printer.error(err);
			printer.error(err.stack);
		}
	}

	process.exit();
};
