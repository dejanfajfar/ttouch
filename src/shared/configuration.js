"use strict";

const AliasError = require("../errors/aliasError");

const configuration = require("rc")("ttouch", {
    home: process.env.TTOUCH_HOME,
    aliases : {}
});

/**
 * Determines if the given alias is present in the aliases array
 * @param {string} alias - The alias to search for
 * @returns {boolean} True if the alias is defined, FALSE if not
 */
function hasAlias(alias) {
    return configuration.aliases.hasOwnProperty(alias);
}

/**
 * Retrieves the alias value from the configuration
 * @param {string} alias - The alias to return
 * @returns {string} The alias value configured in the .ttouchrc file
 */
function getAlias(alias) {
    if (!hasAlias(alias)) {
        throw new AliasError(alias, "Alias not defined in configuration file");
    }
    return configuration.aliases[alias];
}

/**
 * Returns the TTOUCH hone directory
 * @returns {string} The absolute path to the TTOUCH home directory
 */
function getHomeDirectory() {
    return configuration.home;
}

module.exports = {
    hasAlias,
    getAlias,
    getHomeDirectory
}