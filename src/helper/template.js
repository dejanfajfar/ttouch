'use strict';

const chalk = require('chalk');
const emoji = require('node-emoji');
const fs = require('fs');
const npmHelper = require('./npm');

const TemplateNotFoundError = require('../errors/templateNotFoundError');


module.exports = options => {
    if (!options.template) {
        return;
    }

    let template = options => "";

    try {
        // We could make the getTemplate not break and fallback to the default function. But the information is too
        // important for the user at this point and we have to gracefully fail at this point!
       template = npmHelper.getTemplate(expandTemplateName(options.template));
    } catch (e) {
        if (e instanceof TemplateNotFoundError){

            console.log(`${
                emoji.emojify(':warning:')
            } ${
                chalk.yellow('Template')
            } ${
                chalk.bold(options.template)
            } ${
                chalk.yellow('could not be found')}`);

            console.log(`${
                emoji.emojify(':warning:')
            } ${
                chalk.yellow('Try installing it with')
            } ${
                chalk.bgYellowBright.black(' npm install -g ' + e.templateName + ' ')}`);
            
            return;
        }
        else {
            throw e;
        }
    }

    fs.writeFileSync(options.absolutePath, template(options));

    console.log(`${
        emoji.emojify(':pencil2:')
    } template ${
        chalk.bold.cyan(options.template)
    } to file ${
        chalk.grey(options.fileName)
    } ${
        chalk.bold.green('done')
    }`);
};


function expandTemplateName(templateName) {
    return `ttt-${templateName}`;
}