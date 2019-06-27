"use strict";

const Base = require('./tTouchError');

class TemplateNotFoundError extends Base {
    constructor(templateName, innerError) {
        super(`Desired template ${templateName} not found`);

        this.templateName = templateName;
        this.innerError = innerError;
    }
}

module.exports = TemplateNotFoundError;
