'use strict';

/*module.exports = options => {
    if (!options.template) {
        return '';
    }

    const template = npmHelper.getTemplate(expandTemplateName(options.template));

    if (typeof template !== 'function') {
		throw new TemplateInvalidError(expandTemplateName(options.template));
	}

	try {
		return template(options);
	} catch (e) {
    	throw new TemplateRenderingError(options.template, e);
	}
};*/

const TYPE_GIST = 'gist';
const TYPE_REPOSITORY = 'repo';

/**
 * 
 * @param {string} templateName - The name of the template selected
 * @returns {string} The npm package name containing the template string
 */
function expandTemplateName(templateName) {
    return `ttt-${templateName}`;
}

/**
 * 
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier describes a gistId, FALSE if not
 */
function isGistId(templateIdentifier) {
    return /^(g|G):.*$/.test(templateIdentifier);
}

/**
 * 
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier describes a git repository, FALSE if not
 */
function isRepository(templateIdentifier) {
    return /^(r|R):\w*\/\w*$/.test(templateIdentifier);
}

/**
 * 
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The gistId contained in the templateIdentifier
 */
function parseGistId(templateIdentifier) {
    if (!this.isGistId(templateIdentifier)){
        return templateIdentifier;
    }

    return templateIdentifier.split(':').pop();
}

/**
 * 
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The repository name contained in the templateIdentifier
 */
function parseRepository(templateIdentifier) {
    if (!this.isRepository(templateIdentifier)){
        return templateIdentifier;
    }

    return templateIdentifier.split(':').pop();
}

module.exports = {
    isGistId,
    isRepository,
    parseGistId,
    parseRepository,
    TYPE_GIST,
    TYPE_REPOSITORY
}