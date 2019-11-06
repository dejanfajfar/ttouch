"use strict";

const chalk = require('chalk');
const application = require('../../package.json');

const printHeader = () => {
    console.log(
        chalk.ansi256(214)      ('┌┬┐┌┬┐┌─┐┬ ┬┌─┐┬ ┬\n') +
        chalk.ansi256(221)      (' │  │ │ ││ ││  ├─┤\n') +
        chalk.ansi256(227)      (` ┴  ┴ └─┘└─┘└─┘┴ ┴  ver.: ${application.version}`)
		)
};

module.exports = printHeader;
