"use strict";

const writeTemplate = require('./writeTemplate');
const TemplateStore = require('../templates/templateStore');

describe('writeTemplate', () => {
    xit('foo', async () => {
        let store = new TemplateStore();

        let context = {
            template: 'g:c2d40dbb22398efa2af5d667a34464f9',
            absolutePath: 'C:\\Projects\\GitHub\\ttouch\\test.js'
        }

        return await writeTemplate(context, store);
    });
});