"use strict";

const chai = require('chai');
const expect = chai.expect;
const fsf = require('./fileSystem');

describe('fileSystem', () => {
    describe('getFileName', () => {
        it('Given myText.txt it returns myText', () => {
            expect(fsf.getFileName('myText.txt')).to.be.equal('myText');
        })
    });

});