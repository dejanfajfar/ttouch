"use strict";

const chalk = require('chalk');

module.exports.warning = message => {
	console.log(`${chalk.yellow('WARN:')} ${message}`);
};

module.exports.error = message => {
	console.error(`${chalk.red('ERR:')} ${message}`);
};

module.exports.info = message => {
	console.log(`${chalk.blue('INF:')} ${message}`);
}

module.exports.printResolveProgress = (message, ...args) => {
	console.log(chalk.grey(message));
};

module.exports.onFileWritten = (fileName) => {
	console.log(`File ${chalk.grey(fileName)} ${chalk.bold.green('created')}`);
};

module.exports.onDirectoryCreated = directoryPath => {
	console.log(`Folder ${chalk.grey(directoryPath)} ${chalk.bold.green('created')}`);
};

module.exports.onFileJobStarted = (fileName, destination, template) => {
	if (template) {
		console.log(`${chalk.yellow('Creating')} ${chalk.grey(fileName)} into ${chalk.grey(destination)} using template ${chalk.bold.cyan(template)}`);
	}
	else {
		console.log(`${chalk.yellow('Creating')} ${chalk.grey(fileName)} into ${chalk.grey(destination)}`);
	}
}

module.exports.onFileJobFinished = (fileName, destination, template) => {
	if (template) {
		console.log(`${chalk.green('Created')} ${chalk.grey(fileName)} into ${chalk.grey(destination)} using template ${chalk.bold.cyan(template)}`);
	}
	else {
		console.log(`${chalk.green('Created')} ${chalk.grey(fileName)} into ${chalk.grey(destination)}`);
	}
	
}