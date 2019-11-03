"use strict";
const rc = require("rc");
const chai = require("chai");
const expect = chai.expect;
const mock = require("mock-require");

describe("configuration", () => {
    describe("GIVEN a empty alias list", () => {
        let configuration = require("./configuration");

        it("WHEN hasAlias called with any alias THEN false returned", () => {
            expect(configuration.hasAlias("testAlias")).to.be.false;
        });
    })

    describe("GIVEN a predefined alias list", () => {
        let configuration = null;

        beforeEach(() => {
            mock("rc", (name, defaults) => {
                return {
                    aliases: {
                        testAlias: "test"
                    }
                }
            });

            configuration = mock.reRequire("./configuration");
        })

        afterEach(() => {
            mock.stop("rc");
        })

        it("WHEN hasAlias called with existing alias THEN true returned", () => {
            expect(configuration.hasAlias("testAlias")).to.be.true;
        });

        it("WHEN hasAlias called with unknown alias THEN false returned", () => {
            expect(configuration.hasAlias("unknownAlias")).to.be.false;
        });
    });
});