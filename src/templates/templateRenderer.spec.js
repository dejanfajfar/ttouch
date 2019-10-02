"user strict";

const chai = require('chai');
const expect = chai.expect;

const TemplateRenderer = require('./templateRenderer');

describe('TemplateRenderer', () => {
    describe('Given a valid renderer instance', () => {
        let instance = null;

        beforeEach(() => {
            instance = new TemplateRenderer();
        });

        describe('renderTemplate', () => {
            it('Given a template with replacement strings and data then placeholders replaced', () => {
                const template = 'My name is {{name}}';
                const templateData = {
                    name: 'testName'
                };

                expect(instance.renderTemplate(template, templateData)).to.be.equal('My name is testName');
            });
            it('Given a template without placeholders and a data object then the same string returned', () => {
                const template = 'Test';
                const templateData = {
                    name: 'testName'
                };

                expect(instance.renderTemplate(template, templateData)).to.be.equal('Test');
            });
            it('Given a template with placeholders and no data object then the placeholder is left empty', () => {
                const template = 'My name is {{name}}';

                expect(instance.renderTemplate(template)).to.be.equal('My name is ');
            });
            it('Given a null template string then empty string returned', () => {
                expect(instance.renderTemplate(null)).to.be.equal('');
            });
            it('Given a undefined template string then empty string returned', () => {
                expect(instance.renderTemplate(undefined)).to.be.equal('');
            });
            it('Given an empty template string then empty string returned', () => {
                expect(instance.renderTemplate('')).to.be.equal('');
            });
        });
    });
});