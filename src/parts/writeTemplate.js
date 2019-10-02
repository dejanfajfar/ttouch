"use strict";

const TemplateRenderer = require('../templates/templateRenderer');

/**
 * 
 * @param {object} context - The template data and context information for this file
 * @param {TemplateStore} templateStore - The template store instance to
 */
function renderTemplate(context, templateStore){
    return new Promise((resolve, reject) => {
        const renderer = new TemplateRenderer();

        if (!context.template){
            resolve();
        }

        const templateIdentifier = context.template;
        let templateText = null;

        if (templateStore.hasTemplate(templateIdentifier)) {
            templateText = templateStore.getTemplate(templateIdentifier);
        }
        else {
            templateText = 
        }
    });
};

module.exports = renderTemplate;