"use strict";

const sinon = require("sinon");
const sinon_chai = require("sinon-chai");

const chai = require('chai');
const expect = chai.expect;
chai.use(sinon_chai);
const fsf = require('./fileSystem');

describe('fileSystem', () => {
    describe('getFileName', () => {
        it('Given myText.txt it returns myText', () => {
            expect(fsf.getFileName('myText.txt')).to.be.equal('myText');
        })
    });
});