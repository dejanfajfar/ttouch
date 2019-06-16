"use strict";

const { spawnSync } = require( 'child_process' );

module.exports.getTemplate = templateName => {
    return options => "";
};

module.exports.getNpmPath = () => {
    return spawnSync('npm', ['root', '--json']).stdout;
};