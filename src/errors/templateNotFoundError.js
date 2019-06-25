"use strict";

const Base = require('./tTouchError');

class TemplateNotFoundError extends Base {
    constructor(templateName, message) {
        super(`Desired template ${templateName} not found because of ${message}`);

        this.templateName = templateName;
        this.originalMessage = message;
    }
}

module.exports = TemplateNotFoundError;
