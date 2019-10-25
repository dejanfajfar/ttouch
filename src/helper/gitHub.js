"use strict";

const rp = require("request-promise-native");

const gistError = require("../errors/gistError");

const apiAddress = "http://api.github.com";
const gistFileName = "template";

module.exports.getGist = async gistId => {
	try {
		if (gistId === "" || gistId === undefined) {
			return '';
		}
		let requestOptions = {
			method: "GET",
			uri: apiAddress + "/gists/" + gistId,
			headers: {
				"User-Agent": "Request-Promise"
			},
			json: true
		};
		let response = await rp(requestOptions);

		if (response.files[gistFileName] !== undefined) {
			return response.files[gistFileName].content;
        }
        else {
            throw new gistError(
                gistId,
                `The gist template does not contain a ${gistFileName} file.`
            );
        }
	} catch (err) {
		throw new gistError(gistId, err);
	}
};
