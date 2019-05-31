#!/usr/bin/env node
"use strict";

const header = require('./src/printHeader');
const createFile = require('./src/createFile');
const path = require('path');
const handleError = require('./src/handleError');

const argv = require('yargs')
    .option('base', {
        alias: 'f',
        describe: 'The target folder for the created files'
    })
    .demandCommand(1)
    .help()
    .argv;

header();

for(let file of argv._) {
    handleError(
        () => {

            createFile({
                target: path.resolve(process.cwd(), file)
            });
        }
    );
}
