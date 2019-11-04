"use strict";

const printer = require("./shared/printer");

const TemplateRenderingError = require("./errors/templateRenderingError");

function handleError(err) {
	if (err instanceof TemplateRenderingError) {
		printer.error("Template could not be rendered");
		if (err.innerError) {
			printer.errorDetails(err.innerError.message);
		}
		printer.info("The file has been created but left empty");
	} else {
		printer.error("There was a catastrophic error!");
		printer.errorDetails(err);
		printer.errorDetails(err.stack);
	}

	process.exit();
}

module.exports = handleError;
