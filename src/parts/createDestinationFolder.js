"use strict";

const fsf = require("../helper/fileSystem");
const printHelper = require("../helper/print");

module.exports = context => {
	if (!fsf.doesFolderExist(context.containingFolder)) {
		fsf.createDirectory(context.containingFolder);
		printHelper.onDirectoryCreated(context.containingFolder);
	}
};
