"use strict";

class TTouchError extends Error {
    constructor(message) {
        super(message);

        if (new.target === TTouchError) {
            throw new TypeError("Cannot construct TTouchError instances directly");
        }

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
};

module.exports = TTouchError;