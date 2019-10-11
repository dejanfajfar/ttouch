"use strict";

const fsf = require("../helper/fileSystem");
const printHelper = require("../helper/print");

module.exports = context => {
	fsf.createFile(context.absolutePath);

	printHelper.info(`Created empty file ${context.fullFileName}`);
};
