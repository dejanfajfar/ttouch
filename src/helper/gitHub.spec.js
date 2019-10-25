"use strict";

const chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const gitHub = require("./gitHub.js");
const gistError = require("../errors/gistError");

//
// Test Data
const validGist = "8533110db00d04d0126530fdff63d9b9";
const missingTemplateGist = "c9631d7d44cf4cd99349faabc83dada5";
const gist404 = "c2d40dbb22398efa2af5d667a34werwerwe";

describe("gitHub", () => {
	describe("getGist", () => {
		it("GIVEN an valid gist id THEN template text returned", async () => {
			let gistText = await gitHub.getGist(validGist);

			expect(gistText).to.be.equal("TEST TEMPLATE");
		});
		it("GIVEN a valid gistId AND no template file in the gist THEN gistError returned", async () => {
			let gistPromise = gitHub.getGist(missingTemplateGist);

			return expect(gistPromise).to.eventually.rejectedWith(gistError);
		});
		it("GIVEN invalid gist Id THEN gistError returned", () => {
			let gistPromise = gitHub.getGist(gist404);

			return expect(gistPromise).to.eventually.rejectedWith(gistError);
		});
	});
});
