#!/usr/bin/env node
"use strict";

const header = require('./src/printHeader');
const controller = require('./src/controller');

const argv = require('yargs')
    .option('base', {
        alias: 'f',
        describe: 'The target folder for the created file(s)'
    })
    .option('template', {
        alias: 't',
        describe: 'The used template for the given file(s)'
    })
    .demandCommand(1)
    .help()
    .argv;

let options = {
    commandBase: process.cwd(),
    files: argv._,
    base: argv.base,
    template: argv.template
};

console.log(options);
header();
controller(options);
