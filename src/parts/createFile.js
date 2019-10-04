"use strict";

const fsf = require("../helper/fileSystem");
const printHelper = require("../helper/print");

module.exports = context => {
	fsf.createFile(context.absolutePath);

	printHelper.onFileWritten(context.fullFileName);
};
