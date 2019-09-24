"use strict";

const templateHelper = require('../helper/template');

const pug = require('pug');

class TemplateManager {
    constructor(){
        this.cache = {};
    }

    resolveTemplate(templateIdentifier) {
		return new Promise((resolve, reject) => {

		});
	}

	renderTemplate(templateIdentifier, contextData) {
		return this.resolveTemplate(templateIdentifier)
		.then(template => {

		});
	}
}

