"use strict";

const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const templateResolver = rewire('./templateResolver');
const templateHelper = require('../helper/template');

const validGist = 'c2d40dbb22398efa2af5d667a34464f9';

describe('TemplateResolver', () => {
    describe('classifyTemplateIdentifier', () => {
        const classifyTemplateIdentifier = templateResolver.__get__('classifyTemplateIdentifier');

        it('Given a gistId then identified as gist', () => {
            expect(classifyTemplateIdentifier('g:216846984321687')).to.be.equal(templateHelper.TYPE_GIST);
        });
        it('Given a repository then identified as a repository', () => {
            expect(classifyTemplateIdentifier('r:username/repoName')).to.be.equal(templateHelper.TYPE_REPOSITORY);
        });
        it('Given a unknown identifier then identified as Unknown', () => {
            expect(classifyTemplateIdentifier('ugaBoga')).to.be.equal(templateHelper.TYPE_UNKNOWN);
        });
    });

    describe('resolveTemplate', () => {
        it('foo', async () => {
            let template = await templateResolver.resolveTemplate(`g:${validGist}`, () => {});
            console.log(template);
        });
    });
});