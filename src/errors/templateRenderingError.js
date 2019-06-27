"use strict";

const Base = require('./tTouchError');

class TemplateRenderingError extends Base {
	constructor(templateName, innerError){
		super(`Error while rendering ${templateName} template`);

		this.templateName = templateName;
		this.innerError = innerError;
	}
}

module.exports = TemplateRenderingError;
