"use strict";

const chalk = require('chalk');

module.exports.warning = message => {
	console.log(`${chalk.yellow('WARN:')} ${message}`);
};

module.exports.error = message => {
	console.error(`${chalk.red('ERR:')} ${message}`);
};

module.exports.info = message => {
	console.error(`${chalk.blue('INF:')} ${message}`);
}

module.exports.onFileWritten = (template, fileName) => {
	if(template){
		console.log(`Template ${chalk.bold.cyan(template)} to file ${chalk.grey(fileName)} ${chalk.bold.green('done')}`);
	}
	console.log(`File ${chalk.grey(fileName)} ${chalk.bold.green('created')}`);
};

module.exports.onDirectoryCreated = folderPath => {
	console.log(`Folder ${chalk.grey(folderPath)} ${chalk.bold.green('created')}`);
};
