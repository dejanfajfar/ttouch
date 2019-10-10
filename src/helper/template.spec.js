"use strict";

const templates = require('./template');
const chai = require('chai');
const expect = chai.expect;

describe('Template', () => {
    describe('isGistId', () => {
        it('If starting with g or G then identified as Gist Id', () => {
            expect(templates.isGistId('g:ed5da3034bb8101e901b36cbde43cd30')).to.be.true;
            expect(templates.isGistId('G:ed5da3034bb8101e901b36cbde43cd30')).to.be.true;
        });
        it('Not starting with g or G it is not positive', () => {
            expect(templates.isGistId('ed5da3034bb8101e901b36cbde43cd30')).to.be.false;
        });
    });

    describe('isRepository', () => {
        it('If starting with r or R then identified as a repository Id', () => {
            expect(templates.isRepository('r:username/repoName')).to.be.true;
            expect(templates.isRepository('R:username/repoName')).to.be.true;
        });
        it('If r or R is followed by invalid repository id then it is not recognized', () => {
            expect(templates.isRepository('r:username/reponame/something')).to.be.false;
            expect(templates.isRepository('R:username/reponame/something')).to.be.false;
            expect(templates.isRepository('r:')).to.be.false;
            expect(templates.isRepository('R:')).to.be.false;
        });
    });

    describe('isFileTemplate', () => {
        it('If starting with f or F then identifier as a file template', () => {
                // Test for windows path format
            expect(templates.isFileTemplate('f:c:\\temo\\template.txt')).to.be.true;
            expect(templates.isFileTemplate('F:c:\\temo\\template.txt')).to.be.true;

            // Test for unix path format
            expect(templates.isFileTemplate('f:/var/templates/template.txt')).to.be.true;
            expect(templates.isFileTemplate('F:/var/templates/template.txt')).to.be.true;
        });
        it('If not starting with f or F then not recognized as file template', () => {
            expect(templates.isFileTemplate('c:\\temo\\template.txt')).to.be.false;
            expect(templates.isFileTemplate('c:\\temo\\template.txt')).to.be.false;
        });
        it('If empty string after template switch then not identified as a file template', () => {
            expect(templates.isFileTemplate('f:')).to.be.false;
            expect(templates.isFileTemplate('F:')).to.be.false;
        });
    });

    describe('parseFileTemplate', () => {
        it('Given a non file template identifier then template identifier returned', () => {
            expect(templates.parseFileTemplate('g:test')).to.be.equal('g:test');
        });
        it('Given a valid file template identifier then the file path returned', () => {
            expect(templates.parseFileTemplate('f:c:\\temp\\template.txt')).to.be.equal('c:\\temp\\template.txt');
        });
    });

    describe('parseGistId', () => {
        it('Given a valid gist id then only the id returned', () => {
            expect(templates.parseGistId('g:ed5da3034bb8101e901b36cbde43cd30')).to.be.equal('ed5da3034bb8101e901b36cbde43cd30');
            expect(templates.parseGistId('G:ed5da3034bb8101e901b36cbde43cd30')).to.be.equal('ed5da3034bb8101e901b36cbde43cd30');
        });
    });

    describe('parseRepository', () => {
        it('Given a valid repository name string then both parts returned', () => {
            let repositoryId = templates.parseRepository('r:dejanfajfar/ttouch');

            expect(repositoryId).to.be.equal('dejanfajfar/ttouch');
        });
    });
});