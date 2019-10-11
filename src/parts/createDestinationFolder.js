"use strict";

const fsf = require("../helper/fileSystem");
const printer = require("../shared/printer");

module.exports = context => {
	if (!fsf.doesFolderExist(context.containingFolder)) {
		fsf.createDirectory(context.containingFolder);
		printer.onDirectoryCreated(context.containingFolder);
	}
};
