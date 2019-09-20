"use strict";

const chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const gitHub = require('./gitHub.js');
const gistError = require('../errors/gistError');


//
// Test Data
const validGist = 'c2d40dbb22398efa2af5d667a34464f9';
const missingTemplateGist = 'c9631d7d44cf4cd99349faabc83dada5';
const gist404 = 'c2d40dbb22398efa2af5d667a34werwerwe'

describe('gitHub', () => {
    describe('getGist',() => {
        it('If an valid gist id then template text returned', () => {
            let gistPromise = gitHub.getGist(validGist);

            return expect(gistPromise).to.eventually.equal('class {{Name}} {\n  constructor(){\n    // add logic here\n  }\n}');
        });
        it('If no template file found in the gist then gistError returned', () => {
            let gistPromise = gitHub.getGist(missingTemplateGist);

            return expect(gistPromise).to.eventually.rejectedWith(gistError);
        });
        it('If gist does not exist then gistError returned', () => {
            let gistPromise = gitHub.getGist(gist404);

            return expect(gistPromise).to.eventually.rejectedWith(gistError);
        });
    });
});