"use strict";

const parameters = require('./parameters.js');
const chai = require('chai');
const expect = chai.expect;

describe('parameters', () => {

    describe('isGistId', () => {
        it('If starting with g or G then identified as Gist Id', () => {
            expect(parameters.isGistId('g:ed5da3034bb8101e901b36cbde43cd30')).to.be.true;
            expect(parameters.isGistId('G:ed5da3034bb8101e901b36cbde43cd30')).to.be.true;
        });
        it('Not starting with g or G it is not positive', () => {
            expect(parameters.isGistId('ed5da3034bb8101e901b36cbde43cd30')).to.be.false;
        });
    });

    describe('isRepository', () => {
        it('If starting with r or R then identified as a repository Id', () => {
            expect(parameters.isRepository('r:username/repoName')).to.be.true;
            expect(parameters.isRepository('R:username/repoName')).to.be.true;
        });
        it('If r or R is followed by invalid repository id then it is not recognized', () => {
            expect(parameters.isRepository('r:username/reponame/something')).to.be.false;
            expect(parameters.isRepository('R:username/reponame/something')).to.be.false;
            expect(parameters.isRepository('r:')).to.be.false;
            expect(parameters.isRepository('R:')).to.be.false;
        });
    });

    describe('parseGistId', () => {
        it('Given a valid gist id then only the id returned', () => {
            expect(parameters.parseGistId('g:ed5da3034bb8101e901b36cbde43cd30')).to.be.equal('ed5da3034bb8101e901b36cbde43cd30');
            expect(parameters.parseGistId('G:ed5da3034bb8101e901b36cbde43cd30')).to.be.equal('ed5da3034bb8101e901b36cbde43cd30');
        });
    });

    describe('parseRepository', () => {
        it('Given a valid repository name string then both parts returned', () => {
            let repositoryId = parameters.parseRepository('r:dejanfajfar/ttouch');

            expect(repositoryId).to.be.equal('dejanfajfar/ttouch');
        });
    });

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
                isVerbose: true
            };

            let item = {
                name: 'testName'
            };

            let inlinedObject = parameters.inlineContextData(contextData)(item, 0, [item]);

            expect(inlinedObject).to.have.property('isVerbose');
            expect(inlinedObject).to.not.have.property('contextProperty');
            expect(inlinedObject).to.have.property('name');
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
});