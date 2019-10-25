#!/usr/bin/env node
"use strict";

const header = require("./src/helper/header");
const controller = require("./src/controller");

const argv = require("yargs")
	.option("destination", {
		alias: "d",
		describe: "The target folder for the created file(s)"
	})
	.option("verbose", {
		alias: "v",
		describe: "Output additional internal information"
	})
	.option("gist", {
		alias: "g",
		describe: "The gist ID containing the template to be used"
    })
    .option("file", {
		alias: "f",
		describe: "The relative path to the file used as the template"
	})
	.demandCommand(1)
	.help().argv;

// Not the best idea but the verbosity is saved in the global variable
global.isVerbose = argv.verbose;

header();
controller({
	commandBase: process.cwd(),
	files: argv._,
	dest: argv.destination,
	gistId: argv.gist,
	templateFile: argv.file,
	isVerbose: argv.verbose,
	timeStamp: new Date()
});
