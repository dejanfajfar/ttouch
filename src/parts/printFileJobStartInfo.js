"use strict";

const printer = require("../helper/print");

module.exports = context => {
	printer.onFileJobStarted(
		context.fullFileName,
		context.containingFolder,
		context.template
	);
};
