"user strict";

const Base = require('./tTouchError');

class AliasError extends Base {
	constructor(alias, reason){
		super(`Alias ${alias} could not be applied because : ${reason}`);

        this.alias = alias;
        this.reason = reason;
	}
}

module.exports = AliasError;