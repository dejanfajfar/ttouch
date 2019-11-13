"use strict";

const printer = require("../shared/printer");

module.exports = context => {
	printer.debug(`Started File: ${context.fullFileName}`);
};
