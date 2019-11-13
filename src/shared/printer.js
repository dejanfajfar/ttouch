"use strict";

const chalk = require('chalk');

/**
 * Logs the given message in the info format
 * @param {string} message - The message to be logged
 */
function warn(message) {
	console.error(chalk`{bgAnsi256(214).black.bold WARN:)} ${message}`);
};

/**
 * Logs the given message in the Error format
 * @param {string} message - The message to log
 */
function error(message) {
	console.error(chalk`{bgRed.bold.black ERR:} ${message}`);
};

function errorDetails(message) {
	if (!global.isVerbose) {
		return;
	}
	console.error(chalk`{bgRed.bold.black ERR:} ${message}`);
}

function debug(message) {
	if (!global.isVerbose) {
		return;
	}
	console.log(chalk`{ansi256(170) DBG:} {dim ${message}}`);
}

/**
 * Logs the given message in the warn format
 * @param {string} message - The message to log
 */
function info(message) {
	console.log(`${chalk.blue('INFO:')} ${message}`);
}

function onDirectoryCreated(directoryPath) {
	console.log(chalk`{bold.green Created} directory {ansi256(182) ${directoryPath}}`);
};

function onFileJobFinished(fileName, destination, template) {
	let message = `${chalk.green.bold('Created')} ${chalk.ansi256(182)(destination)}/${chalk.bold.ansi256(207)(fileName)}`;

	if (template) {
		message += ` using template ${chalk.bold.cyan(template)}`
	}
	console.log(message);

}

module.exports = {
	info,
	error,
	warn,
	debug,
	errorDetails,
	onDirectoryCreated,
	onFileJobFinished
}