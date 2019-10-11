"use strict";

const printer = require("../helper/print");

module.exports = context => {
	printer.info(`File name ${context.fullFileName}`);
	printer.info(`Target directory ${context.containingFolder}`);
	printer.info(`Template to use ${context.template}`);
};
