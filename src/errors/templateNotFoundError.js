"use strict";

const Base = require('./tTouchError');

class TemplateNotFoundError extends Base {
    constructor(templateName) {
        super(`Desired template ${templateName} not found`);

        this.templateName = templateName;
    }
}