"use strict";

/**
 * Gist template identifyer type
 */
const TYPE_GIST = "gist";
/**
 * Git repository template identifier type
 */
const TYPE_REPOSITORY = "repo";

/**
 * A template type defined by a local file on the system
 */
const TYPE_FILE = "file";
/**
 * A template type defined by the alias defined in the .ttouchrc file
 */
const TYPE_ALIAS = "alias";
/**
 * Repository identifier of unklnown type
 */
const TYPE_UNKNOWN = "unkn";

/**
 *
 * @param {string} templateName - The name of the template selected
 * @returns {string} The npm package name containing the template string
 */
function expandTemplateName(templateName) {
	return `ttt-${templateName}`;
}

/**
 * Determines if the given templateIdentifier contains a alias template identifier
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier describes a alias, FALSE if not
 */
function isAlias(templateIdentifier) {
	return /^[a|A]:.+$/.test(templateIdentifier);
}

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier describes a gistId, FALSE if not
 */
function isGistId(templateIdentifier) {
	return /^[g|G]:.+$/.test(templateIdentifier);
}

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier describes a git repository, FALSE if not
 */
function isRepository(templateIdentifier) {
	return /^[r|R]:\w+\/\w+$/.test(templateIdentifier);
}

/**
 * Determines if the given templateIdentifier denotes a file template or not
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {boolean} TRUE if the templateIdentifier denotes a file template, FALSE if not
 */
function isFileTemplate(templateIdentifier) {
	return /^[f|F]:.+$/.test(templateIdentifier);
}

/**
 * Extracts the template file path from the file template identifier
 * @param {string} templateIdentifier 
 * @returns The file location if a file template identifier given. The input templateIdentifier if not identified as a file template identifier
 */
function parseFileTemplate(templateIdentifier) {
	if (!this.isFileTemplate(templateIdentifier)) {
		return templateIdentifier;
	}

	return templateIdentifier.slice(2);
}

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The gistId contained in the templateIdentifier
 */
function parseAlias(templateIdentifier) {
	if (!this.isAlias(templateIdentifier)) {
		return templateIdentifier;
	}

	return templateIdentifier.split(":").pop();
}

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The gistId contained in the templateIdentifier
 */
function parseGistId(templateIdentifier) {
	if (!this.isGistId(templateIdentifier)) {
		return templateIdentifier;
	}

	return templateIdentifier.split(":").pop();
}

/**
 *
 * @param {string} templateIdentifier - The unique template identifier
 * @returns {string} The repository name contained in the templateIdentifier
 */
function parseRepository(templateIdentifier) {
	if (!this.isRepository(templateIdentifier)) {
		return templateIdentifier;
	}

	return templateIdentifier.split(":").pop();
}

module.exports = {
	isGistId,
	isRepository,
	isFileTemplate,
	isAlias,
	parseGistId,
	parseRepository,
	parseFileTemplate,
	parseAlias,
	TYPE_GIST,
	TYPE_REPOSITORY,
	TYPE_FILE,
	TYPE_ALIAS,
	TYPE_UNKNOWN
};
