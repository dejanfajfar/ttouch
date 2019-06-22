"use strict";

const chalk = require('chalk');
const application = require('../../package.json');

const printHeader = () => {
    console.log(
        chalk.yellow('┌┬┐┌┬┐┌─┐┬ ┬┌─┐┬ ┬\n') +
        chalk.yellowBright(' │  │ │ ││ ││  ├─┤\n') +
        chalk.white(' ┴  ┴ └─┘└─┘└─┘┴ ┴\n') +
				chalk.grey(`ver.: ${application.version}`)
		)
};

module.exports = printHeader;
