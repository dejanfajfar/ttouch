"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinon_chai = require("sinon-chai");

chai.use(sinon_chai);

const ErrorHandler = require("./errorHandler");
const TemplateNotFoundError = require("./errors/templateNotFoundError");
const TemplateRenderingError = require("./errors/templateRenderingError");
const TemplateInvalidError = require("./errors/templateInvalidError");

describe("ErrorHandler", () => {
	beforeEach(() => {
		let logFake = sinon.fake();
		let errorFake = sinon.fake();
		sinon.replace(console, "log", logFake);
		sinon.replace(console, "error", errorFake);
		sinon.replace(process, "exit", () => {});
	});

	afterEach(() => {
		sinon.restore();
	});

	/**
	 * TemplateRenderingError
	 */
	describe("Given a TemplateNotFoundError and isVerbose === false", () => {
		beforeEach(() => {
			ErrorHandler(false, new TemplateNotFoundError("testTemplate"));
		});
		it("Expect the correct info message to be printed", () => {
			expect(console.log).to.be.calledWithMatch(
				"Try installing it with npm install -g testTemplate"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(console.error).to.be.calledWithMatch(
				"Template could not be found"
			);
		});
		it("Expect that the additional error message is not printed", () => {
			expect(console.error).to.be.calledOnce;
		});
	});

	describe("Given a TemplateNotFoundError and isVerbose === true", () => {
		beforeEach(() => {
			ErrorHandler(
				true,
				new TemplateNotFoundError(
					"testTemplate",
					new Error("Inner Error")
				)
			);
		});
		it("Expect the correct info message to be printerd", () => {
			expect(console.log).to.be.calledWithMatch(
				"Try installing it with npm install -g testTemplate"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(console.error).to.be.calledWithMatch(
				"Template could not be found"
			);
		});
		it("Expect that the additional error message is printed", () => {
			expect(console.error).to.be.calledWithMatch("Inner Error");
		});
		it("Expect two error messages to be printed", () => {
			expect(console.error).to.be.calledTwice;
		});
	});

	/**
	 * TemplateRenderingError
	 */
	describe("Given a TemplateRenderingError and isVerbose === false", () => {
		beforeEach(() => {
			ErrorHandler(false, new TemplateRenderingError("testTemplate"));
		});
		it("Expect the correct info message to be printerd", () => {
			expect(console.log).to.be.calledWithMatch(
				"The file has been created but left empty"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(console.error).to.be.calledWithMatch(
				"Template could not be rendered"
			);
		});
		it("Expect that the additional error message is not printed", () => {
			expect(console.error).to.be.calledOnce;
		});
	});

	describe("Given a TemplateRenderingError and isVerbose === true", () => {
		beforeEach(() => {
			ErrorHandler(
				true,
				new TemplateRenderingError(
					"testTemplate",
					new Error("Inner Error")
				)
			);
		});
		it("Expect the correct info message to be printerd", () => {
			expect(console.log).to.be.calledWithMatch(
				"The file has been created but left empty"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(console.error).to.be.calledWithMatch(
				"Template could not be rendered"
			);
		});
		it("Expect that the additional error message is printed", () => {
			expect(console.error).to.be.calledWithMatch("Inner Error");
		});
		it("Expect two error messages to be printed", () => {
			expect(console.error).to.be.calledTwice;
		});
	});
});
