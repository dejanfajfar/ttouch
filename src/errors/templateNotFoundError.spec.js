const chai = require('chai');
const should = chai.should();

const TemplateNotFoundError = require('./templateNotFoundError');

describe('TemplateNotFoundError', () => {
    describe('GIVEN valid input data', () => {
        let testError;

        beforeEach(() => {
            testError = new TemplateNotFoundError('testTemplate');
        });
        it('THEN error message set correctly', () => {
            testError.message.should.be.equal('Desired template testTemplate not found');
        });
        it('THEN error type correct', () => {
            testError.name.should.be.equal('TemplateNotFoundError');
        })
        it('THEN template name correct', () => {
            testError.templateName.should.be.equal('testTemplate');
        });
    });

});