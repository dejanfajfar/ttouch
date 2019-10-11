"use strict";

const chalk = require('chalk');

/**
 * Logs the given message in the info format
 * @param {string} message - The message to be logged
 */
function warn(message) {
	console.log(`${chalk.yellow('WARN:')} ${message}`);
};

/**
 * Logs the given message in the Error format
 * @param {string} message - The message to log
 */
function error(message) {
	console.error(`${chalk.red('ERR:')} ${message}`);
};

/**
 * Logs the given message in the warn format
 * @param {string} message - The message to log
 */
function info(message) {
	// if the command is not running in verbose mode then do not print
	if (!global.isVerbose) {
		return;
	}
	console.log(`${chalk.blue('INF:')} ${chalk.grey(message)}`);
}

function onDirectoryCreated(directoryPath) {
	console.log(`Directory ${chalk.grey(directoryPath)} ${chalk.bold.green('created')}`);
};

function onFileJobFinished(fileName, destination, template) {
	if (template) {
		console.log(`${chalk.green('Created')} ${chalk.magenta(fileName)} into ${chalk.grey(destination)} using template ${chalk.bold.cyan(template)}`);
	}
	else {
		console.log(`${chalk.green('Created')} ${chalk.magenta(fileName)} into ${chalk.grey(destination)}`);
	}
}

module.exports = {
	info,
	error,
	warn,
	onDirectoryCreated,
	onFileJobFinished
}