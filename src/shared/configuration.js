"use strict";

const configuration = require("rc")("ttouch", {
    aliases : {}
});

/**
 * Determines if the given alias is present in the aliases array
 * @param {string} alias - The alias to search for
 * @returns True if the alias is defined, FALSE if not
 */
function hasAlias(alias) {
    return configuration.aliases.hasOwnProperty(alias);
}

module.exports = {
    hasAlias
}