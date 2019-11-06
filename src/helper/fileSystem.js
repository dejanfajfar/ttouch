"use strict";

const fs = require("fs");
const path = require("path");
const configuration = require("../shared/configuration");

module.exports.createFile = absolutePath => {
	fs.writeFileSync(absolutePath, "");
};

module.exports.writeToFile = (absolutePath, content) => {
	fs.writeFileSync(absolutePath, content);
};

module.exports.createDirectory = directoryPath => {
	fs.mkdirSync(directoryPath, { recursive: true });
};

module.exports.determineDestinationFolder = options => {
	if (options.dest) {
		return path.resolve(process.cwd(), path.normalize(options.dest));
	} else {
		return process.cwd();
	}
};

module.exports.determineFileAbsolutePathRelativeToCommand = filePath => {
    let baseDir = process.cwd();
    if (configuration.getHomeDirectory()) {
        baseDir = configuration.getHomeDirectory()
    }
	return this.combinePath(baseDir, filePath);
};

module.exports.combinePath = (basePath, file) => {
	return path.join(basePath, file);
};

module.exports.analyseFilePath = filePath => {
	let directoryPath = path.dirname(filePath);
	let fileName = path.basename(filePath);

	return { directoryPath, fileName };
};

module.exports.doesFolderExist = folderPath => {
	return fs.existsSync(folderPath);
};

module.exports.getFileName = filePath => {
	return path.basename(filePath, this.getFileExtension(filePath));
};

module.exports.getFileExtension = filePath => {
	return path.extname(filePath);
};

module.exports.readFile = filePath => {
	return fs.readFileSync(filePath, {
		encoding: "UTF8",
		flag: "r"
	});
};
