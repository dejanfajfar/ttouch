"user strict";

const Base = require('./tTouchError');

class gistError extends Base {
	constructor(gistId, reason){
		super(`Resolving gist with id ${gistId} failed with reason ${reason}`);

        this.gistId = gistId;
        this.reason = reason;
	}
}

module.exports = gistError;