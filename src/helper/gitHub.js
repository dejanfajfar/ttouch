"use strict";

const rp = require('request-promise-native');

const gistError = require('../errors/gistError');

const apiAddress = 'http://api.github.com';
const gistFileName = 'template';

module.exports.getGist = (gistId) => {
    if (gistId === '' || gistId === undefined) {
        Promise.resolve('');
    }

    return new Promise((resolve, reject) => {
        let requestOptions = {
            uri: apiAddress + '/gists/' + gistId,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };
        
        rp(requestOptions)
            .then(response => {
                if (response.files[gistFileName] !== undefined) {
                    resolve(response.files[gistFileName].content);
                }
                reject(new gistError(gistId, `The gist template does not contain a ${gistFileName} file.`));
            })
            .catch(err => {
                reject(new gistError(gistId, err));
            });
    });
};