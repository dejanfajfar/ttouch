"use strict";

const Base = require('./tTouchError');

class TemplateInvalidError extends Base {
	constructor(template){
		super(`Loading template ${template} did not result in function!`);

		this.template = template;
	}
}

module.exports = TemplateInvalidError;
