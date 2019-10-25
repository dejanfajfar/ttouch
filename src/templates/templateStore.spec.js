"use strict";

const chai = require('chai');
const expect = chai.expect;

const TemplateStore = require('./templateStore');

describe('TemplateStore', () => {
    let instance = undefined;

    describe('Given a prefiled TemplateStore', () => {
        beforeEach(() => {
            instance = new TemplateStore({
                noReplacement: 'template Text'
            });
        });

        describe('hasTemplate', () => {
            it('Checking for an uncached template then false returned', () => {
                expect(
                    instance.hasTemplate('testTemplate')
                ).to.be.false;
            });
            it('Checking for a cached template then true returned', () => {
                expect(
                    instance.hasTemplate('noReplacement')
                ).to.be.true;
            });
        });

        describe('cacheTemplate', () => {
            it('Valid identifier and empty template then cached', () => {
                instance.cacheTemplate('testTemplate', '');

                expect(
                    instance.hasTemplate('testTemplate')
                ).to.be.true;
            });
            it('Valid identifier and template then cached', () => {
                instance.cacheTemplate('testTemplate', '');

                expect(
                    instance.hasTemplate('testTemplate')
                ).to.be.true;
            });
        });

        describe('getTemplate', () => {
            it('Requesting unknown template then empty string returned', () => {
                let template = instance.getTemplate('notHere');

                expect(template).to.be.equal('');
            });

            it('Requesting known template then empty string returned', () => {
                let template = instance.getTemplate('noReplacement');

                expect(template).to.be.equal('template Text');
            });
        });
    });
});