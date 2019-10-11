"use strict";

const printer = require("../shared/printer");

module.exports = context => {
	printer.onFileJobFinished(
		context.fullFileName,
		context.containingFolder,
		context.template
	);
};
