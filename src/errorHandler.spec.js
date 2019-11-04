"use strict";

const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinon_chai = require("sinon-chai");

const printer = require("./shared/printer");

chai.use(sinon_chai);

const ErrorHandler = require("./errorHandler");
const TemplateRenderingError = require("./errors/templateRenderingError");

describe("ErrorHandler", () => {
	beforeEach(() => {
		let logFake = sinon.fake();
		let errorFake = sinon.fake();
		sinon.replace(printer, "info", logFake);
		sinon.replace(printer, "debug", logFake);
		sinon.replace(printer, "error", errorFake);
		sinon.replace(printer, "errorDetails", errorFake);
		sinon.replace(process, "exit", () => {});
	});

	afterEach(() => {
		sinon.restore();
	});

	/**
	 * TemplateRenderingError
	 */
	describe("Given a TemplateRenderingError and isVerbose === false", () => {
		beforeEach(() => {
			global.isVerbose = false;
			ErrorHandler(new TemplateRenderingError("testTemplate"));
		});
		it("Expect the correct info message to be printed", () => {
			expect(printer.info).to.be.calledWithMatch(
				"The file has been created but left empty"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(printer.error).to.be.calledWithMatch(
				"Template could not be rendered"
			);
		});
		it("Expect that the additional error message is not printed", () => {
			expect(printer.error).to.be.calledOnce;
		});
	});

	describe("Given a TemplateRenderingError and isVerbose === true", () => {
		beforeEach(() => {
			global.isVerbose = true;
			ErrorHandler(
				new TemplateRenderingError(
					"testTemplate",
					new Error("Inner Error")
				)
			);
		});
		it("Expect the correct info message to be printerd", () => {
			expect(printer.info).to.be.calledWithMatch(
				"The file has been created but left empty"
			);
		});
		it("Expect the correct error message to be printed", () => {
			expect(printer.error).to.be.calledWithMatch(
				"Template could not be rendered"
			);
		});
		it("Expect that the additional error message is printed", () => {
			expect(printer.errorDetails).to.be.calledWithMatch("Inner Error");
		});
	});
});
