"use strict";

const parameters = require('./parameters.js');
const chai = require('chai');
const expect = chai.expect;

describe('parameters', () => {

    describe('expandFileName', () => {
        it('Given myFile.txt it correctly expands the file name', () => {
            let expandedFileName = parameters.expandFileName({
                origin: 'myFile.txt',
                destinationPath: './myFiles'
            });

            expect(expandedFileName.fullFileName).to.be.equal('myFile.txt');
            expect(expandedFileName.name.name).to.be.equal('myFile');
            expect(expandedFileName.name.lowerCaseCamelCase).to.be.equal('myFile');
            expect(expandedFileName.name.upperCaseCamelCase).to.be.equal('MyFile')
            expect(expandedFileName.fileExtension).to.be.equal('.txt');
        });

        it('Given c:/myFiles/myFile.txt it correctly expands the file name', () => {
            let expandedFileName = parameters.expandFileName({
                origin: 'c:/myFiles/myFile.txt',
                destinationPath: './myFiles'
            });

            expect(expandedFileName.fullFileName).to.be.equal('myFile.txt');
            expect(expandedFileName.name.name).to.be.equal('myFile');
            expect(expandedFileName.name.lowerCaseCamelCase).to.be.equal('myFile');
            expect(expandedFileName.name.upperCaseCamelCase).to.be.equal('MyFile')
            expect(expandedFileName.fileExtension).to.be.equal('.txt');
        });
    });

    describe('inlineContextData', () => {
        it('The inlineContextData function returns a function', () => {
            expect(parameters.inlineContextData({})).to.be.a('function');
        });
        it('Inlined only predefined properties of the context', () => {
            let contextData = {
                contextProperty: 'test',
				isVerbose: true,
				template: 'testTemplate'
            };

            let item = {
                name: 'testName'
            };

            let inlinedObject = parameters.inlineContextData(contextData)(item, 0, [item]);

            expect(inlinedObject).to.have.property('isVerbose');
            expect(inlinedObject).to.not.have.property('contextProperty');
			expect(inlinedObject).to.have.property('name');
			expect(inlinedObject).to.have.property('template');
        });
    });

    describe('analyseFileNames', () => {
        it('Given a gistId then not recognized as a file', () => {
            let fileData = {
                origin: 'g:ed5da3034bb8101e901b36cbde43cd30'
            };

            let analysedFile = parameters.analyseFileNames(fileData);

            expect(analysedFile).to.have.property('isGist');
            expect(analysedFile).to.have.property('isRepository');
            expect(analysedFile).to.have.property('isFilePath');
            expect(analysedFile.isGist).to.be.true;
            expect(analysedFile.isRepository).to.be.false;
            expect(analysedFile.isFilePath).to.be.false;
        });
        it('Given a repository then not recognized as a file', () => {
            let fileData = {
                origin: 'r:userName/repoName'
            };

            let analysedFile = parameters.analyseFileNames(fileData);

            expect(analysedFile).to.have.property('isGist');
            expect(analysedFile).to.have.property('isRepository');
            expect(analysedFile).to.have.property('isFilePath');
            expect(analysedFile.isGist).to.be.false;
            expect(analysedFile.isRepository).to.be.true;
            expect(analysedFile.isFilePath).to.be.false;
        });
        it('Given a filepath with no directory then recognized as a file', () => {
            let fileData = {
                origin: 'myText.txt'
            };

            let analysedFile = parameters.analyseFileNames(fileData);

            expect(analysedFile).to.have.property('isGist');
            expect(analysedFile).to.have.property('isRepository');
            expect(analysedFile).to.have.property('isFilePath');
            expect(analysedFile.isGist).to.be.false;
            expect(analysedFile.isRepository).to.be.false;
            expect(analysedFile.isFilePath).to.be.true;
        });
        it('Given a filepath with directory then recognized as a file', () => {
            let fileData = {
                origin: 'c:/myFiles/myText.txt'
            };

            let analysedFile = parameters.analyseFileNames(fileData);

            expect(analysedFile).to.have.property('isGist');
            expect(analysedFile).to.have.property('isRepository');
            expect(analysedFile).to.have.property('isFilePath');
            expect(analysedFile.isGist).to.be.false;
            expect(analysedFile.isRepository).to.be.false;
            expect(analysedFile.isFilePath).to.be.true;
        });
        it('Given a single filename then recognized as a file', () => {

            let analysedFile = parameters.analyseFileNames('c:/myFiles/myText.txt');

            expect(analysedFile).to.have.property('isGist');
            expect(analysedFile).to.have.property('isRepository');
            expect(analysedFile).to.have.property('isFilePath');
            expect(analysedFile.isGist).to.be.false;
            expect(analysedFile.isRepository).to.be.false;
            expect(analysedFile.isFilePath).to.be.true;
        });
	});

	describe('applyInlineTemplate', () => {
		it('If template set explicitly then not overridden by inline template', () => {
			let fileData = {
				fileProperty: 'someText',
				template: 'testTemplate'
			};

			let appliedTemplateData = parameters.applyInlineTemplate([{
				origin: 'inlineTemplate'
			}])(fileData);

			expect(appliedTemplateData.template).to.be.equal('testTemplate');
		});
		it('If template not set explicitly then overridden by inline template', () => {
			let fileData = {
				fileProperty: 'someText'
			};

			let appliedTemplateData = parameters.applyInlineTemplate([{
				origin: 'inlineTemplate'
			}])(fileData);

			expect(appliedTemplateData.template).to.be.equal('inlineTemplate');
		});
		it('If template not set explicitly and no inline template set then template not set', () => {
			let fileData = {
				fileProperty: 'someText'
			};

			let appliedTemplateData = parameters.applyInlineTemplate([{}])(fileData);

			expect(appliedTemplateData).to.not.have.property('template');
		});
	});
});
