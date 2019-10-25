"use strict";

const fsf = require("../helper/fileSystem");
const printer = require("../shared/printer");

module.exports = context => {
	fsf.createFile(context.absolutePath);

	printer.info(`Created empty file ${context.fullFileName}`);
};
