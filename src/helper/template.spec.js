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