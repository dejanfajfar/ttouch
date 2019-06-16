"use strict";

const { spawnSync } = require( 'child_process' );
const path = require('path');

module.exports.getTemplate = templateName => {
    module.paths.push(getNpmPath()); // push the global node folder to the search path
    return module.require(templateName); // load module
};

const getNpmPath = () => {
    // Get the global module root folder (nvm safe)
    return spawnSync('npm', ['root', '-g', '--json'])
        .stdout.
        toString().
        replace(/(\r\n|\n|\r)/gm, ""); // remove trailing newline!
};