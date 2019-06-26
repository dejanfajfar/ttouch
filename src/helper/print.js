"use strict";

const chalk = require('chalk');
const emoji = require('node-emoji');

module.exports.warning = message => {
	let formattedMessage = `:warning: ${chalk.yellow(message)}`;

	console.log(emoji.emojify(formattedMessage));
};

module.exports.error = message => {
	let formattedMessage = `:exclamation: ${message}`;
	console.error(emoji.emojify(formattedMessage));
};

module.exports.onFileWritten = (template, fileName) => {

	let formattedMessage = `:pencil2: template ${
		chalk.bold.cyan(template)
	} to file ${
		chalk.grey(fileName)
	} ${chalk.bold.green('done')}`;

	console.log(emoji.emojify(formattedMessage));
};
