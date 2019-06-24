"use strict";

const path = require('path');

const TemplateNotFoundError = require('../errors/templateNotFoundError');

const { spawnSync } = require( 'child_process' );

module.exports.getTemplate = templateName => {
	try {
		module.paths.push(getNpmPath()); // push the global node folder to the search path
		return module.require(templateName); // load module
	} catch (e) {
		throw new TemplateNotFoundError(templateName, e.message);
	}
};

const getNpmPath = () => {
	// Get the global module root folder (nvm safe)
	let rootPath = spawnSync('npm', ['root', '-g'], {
		shell: true
	});

	let rootDir = path.dirname(rootPath.stdout.toString()) // Get a OS specific path to the npm global library

	return path.join(rootDir, 'node_modules');
};
