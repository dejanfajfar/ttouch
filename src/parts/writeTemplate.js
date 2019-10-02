"use strict";

const templateRenderer = require('../templates/templateRenderer');
const templateResolver = require('../templates/templateResolver');

/**
 * 
 * @param {object} context - The template data and context information for this file
 * @param {TemplateStore} templateStore - The template store instance to
 */
function renderTemplate(context, templateStore){
    return new Promise((resolve, reject) => {

        if (!context.template){
            resolve();
        }

        const templateIdentifier = context.template;
        let templateText = null;

        if (templateStore.hasTemplate(templateIdentifier)) {
            templateText = templateStore.getTemplate(templateIdentifier);
        }
        else {
            templateText = templateResolver(templateIdentifier);
        }

        let renderedTemplate = await templateRenderer(templateText, context);
    });
};

module.exports = renderTemplate;