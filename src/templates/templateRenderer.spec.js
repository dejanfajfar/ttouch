"user strict";

const chai = require('chai');
const expect = chai.expect;

const templateRenderer = require('./templateRenderer');

describe('TemplateRenderer', () => {
    describe('Given a valid renderer instance', () => {

        describe('renderTemplate', () => {
            it('Given a template with replacement strings and data then placeholders replaced', () => {
                const template = 'My name is {{name}}';
                const templateData = {
                    name: 'testName'
                };

                expect(templateRenderer(template, templateData)).to.be.equal('My name is testName');
            });
            it('Given a template without placeholders and a data object then the same string returned', () => {
                const template = 'Test';
                const templateData = {
                    name: 'testName'
                };

                expect(templateRenderer(template, templateData)).to.be.equal('Test');
            });
            it('Given a template with placeholders and no data object then the placeholder is left empty', () => {
                const template = 'My name is {{name}}';

                expect(templateRenderer(template)).to.be.equal('My name is ');
            });
            it('Given a null template string then empty string returned', () => {
                expect(templateRenderer(null)).to.be.equal('');
            });
            it('Given a undefined template string then empty string returned', () => {
                expect(templateRenderer(undefined)).to.be.equal('');
            });
            it('Given an empty template string then empty string returned', () => {
                expect(templateRenderer('')).to.be.equal('');
            });
        });
    });
});