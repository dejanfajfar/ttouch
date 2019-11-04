"use strict";

const fsf = require("../helper/fileSystem");
const printer = require("../shared/printer");

module.exports = context => {
	fsf.createFile(context.absolutePath);

	printer.debug(`Created empty file ${context.fullFileName}`);
};
