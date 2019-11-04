"use strict";

const printer = require("../shared/printer");

module.exports = context => {
	printer.debug(`File: ${context.fullFileName}`);
	printer.debug(`Target: ${context.containingFolder}`);
	printer.debug(`Template: ${context.template}`);
};
