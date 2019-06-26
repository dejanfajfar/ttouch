'use strict';

const printHelper = require('./helper/print');

const TemplateNotFoundError = require('./errors/templateNotFoundError');

module.exports.handleError = (isVerbose, func) => {
    try {
        func();
    } catch(e) {
		if (e instanceof TemplateNotFoundError) {

			printHelper.warning('Template could not be found');
			printHelper.warning(`Try installing it with npm install -g ${e.templateName}`);

			if (isVerbose) {
				printHelper.error(e.message);
			}
		} else {
			printHelper.error('There was a catastrophic error!');

			if (isVerbose) {
				printHelper.error(e.message);
			}
		}
    }
};
