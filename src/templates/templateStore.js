"use strict";

const templateHelper = require('../helper/template');

/**
 * Simple template in memory cache
 */
class TemplateStore {
	/**
	 * The store can be preloaded with template content
	 * @param {object} preloadedTemplates - Preloaded templates already available at initialization
	 */
    constructor(preloadedTemplates){
        this.cache = preloadedTemplates || {};
	}

	/**
	 * Determines if the given templateIdentifier is already in the template store
	 * @param {string} templateIdentifier - the unique identifier for the template 
	 * @returns {boolean} True if the template is already in the store, False if not
	 */
	hasTemplate(templateIdentifier) {
		return this.cache.hasOwnProperty(templateIdentifier);
	}

	/**
	 * Adds a new template and template text to the store
	 * @param {string} templateIdentifier - the unique template identifier
	 * @param {string} templateText - the template text to assiciate with the template identifier
	 */
	cacheTemplate(templateIdentifier, templateText) {
		this.cache[templateIdentifier] = templateText;
	}

	/**
	 * Retrieves the template stored under the template identifier or an empty string if not found
	 * @param {string} templateIdentifier - the unique template identifier
	 * @returns {string} The template stored under the template identifier or an empty string if nothing is stored
	 */
	getTemplate(templateIdentifier) {
		return this.cache[templateIdentifier] || '';
	}
}

module.exports = TemplateStore