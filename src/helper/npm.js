"use strict";

const TemplateNotFoundError = require('../errors/templateNotFoundError');

const { spawnSync } = require( 'child_process' );

module.exports.getTemplate = templateName => {
    try {
        module.paths.push(getNpmPath()); // push the global node folder to the search path
        return module.require(templateName); // load module
    } catch (e) {
        throw new TemplateNotFoundError(templateName);
    }
};

const getNpmPath = () => {
    // Get the global module root folder (nvm safe)
    return spawnSync('npm', ['root', '-g', '--json'])
        .stdout.
        toString().
        replace(/(\r\n|\n|\r)/gm, ""); // remove trailing newline!
};