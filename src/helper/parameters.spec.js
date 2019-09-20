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
        it('Given valid git repo identifier then positive', () => {
            expect(parameters.isRepository('username/reponame')).to.be.true;
        });
        it('Given invalid git repo identifier then negative', () => {
            expect(parameters.isRepository('username/reponame/something')).to.be.false;
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
            let repositoryParts = parameters.parseRepository('dejanfajfar/ttouch');

            expect(repositoryParts).to.not.be.undefined;

            expect(repositoryParts.userName).to.be.equal('dejanfajfar');
            expect(repositoryParts.repoName).to.be.equal('ttouch');
        });
    });
});