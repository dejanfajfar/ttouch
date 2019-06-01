'use strict';

const chalk = require('chalk');
const emoji = require('node-emoji');
const fs = require('fs');

const systemTemplates = {
    sh: require('./templates/sh')
};

module.exports = options => {
    if (!options.template) {
        return;
    }

    if (systemTemplates[options.template]) {
        let fileContent = systemTemplates[options.template](options);
        fs.writeFileSync(options.absolutePath, fileContent);
        console.log(`${
            emoji.emojify(':pencil2:')
        } template ${
            chalk.bold.cyan(options.template)
        } to file ${
            chalk.grey(options.fileName)
        } ${
            chalk.bold.green('done')
        }`);
        return;
    }

    console.log(`${emoji.emojify(':warning:')} ${chalk.yellow('Template')} ${chalk.bold(options.template)} ${chalk.yellow('could not be found')}`);
    console.log(`${emoji.emojify(':warning:')} ${chalk.yellow('Try installing it with')} ${chalk.bgYellowBright.black(' npm install -g ttt-' + options.template + ' ')}`);
};


