"use strict";

const printer = require("../helper/print");

module.exports = context => {
	printer.onFileJobFinished(
		context.fullFileName,
		context.containingFolder,
		context.template
	);
};
