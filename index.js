#!/usr/bin/env node
"use strict";

const header = require("./src/helper/header");
const controller = require("./src/controller");

const argv = require("yargs")
	.option("destination", {
		alias: "d",
		describe: "The target folder for the created file(s)",
		type: "string"
	})
	.option("verbose", {
		alias: "v",
		describe: "Output additional internal information"
	})
	.option("gist", {
		alias: "g",
		describe: "The gist ID containing the template to be used",
		type: "string",
		conflicts: ["file", "alias"]
    })
    .option("file", {
		alias: "f",
		describe: "The relative path to the file used as the template",
		type: "string",
		conflicts: ["gist", "alias"]
	})
	.option("alias", {
		alias: "a",
		describe: "The alias of the template to be used to populate the file",
		type: "string",
		conflicts: ["file", "gist"]
	})
	.demandCommand(1)
	.example("ttouch file.txt")
	.example("ttouch file.txt file2.txt")
	.example("ttouch Person.js g:092348u23904827423094840293")
	.help()
	.version()
	.epilogue("For more information go to https://github.com/dejanfajfar/ttouch/").argv;

// Not the best idea but the verbosity is saved in the global variable
global.isVerbose = argv.verbose;

header();
controller({
	commandBase: process.cwd(),
	files: argv._,
	dest: argv.destination,
	gistId: argv.gist,
	alias: argv.alias,
	templateFile: argv.file,
	isVerbose: argv.verbose,
	timeStamp: new Date()
});
