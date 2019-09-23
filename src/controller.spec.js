"user strict";

const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const controller = rewire('./controller.js');

describe('controller', () => {
    describe('expandParameters', () => {
        const expandParameters = controller.__get__('expandParameters');
        const userParameters = {
            commandBase: '/user/testFolder',
            files: ['myText.txt', 'yourText.txt', 'r:userName/repoName'],
            dest: '.',
            template: 'myTemplate',
            isVerbose: true
        };

        it('foo', () => {
            let expandedParameters = expandParameters(userParameters);

            console.log(expandedParameters);
            expect(expandedParameters).to.not.be.empty;
        });
    });
});