"user strict";

const rewire = require('rewire');
const chai = require('chai');
const expect = chai.expect;

const controller = rewire('./controller.js');

describe('controller', () => {
    describe('expandParameters', () => {
        const expandParameters = controller.__get__('expandParameters');

        let userParameters = {
            commandBase: '/user/testFolder',
            files: ['myText.txt', '../yourText.txt', 'r:userName/repoName'],
            dest: '.',
            isVerbose: true,
            timeStamp: new Date('2019-10-02T08:52:48.183Z')
        };
        describe(`Given initial files ${userParameters.files}`, () => {
            let expandedParameters = null;

            beforeEach(() => {
                [expandedParameters, ] = expandParameters(userParameters);
            });

            it('Then only two files identified', () => {
                expect(expandedParameters.length).to.be.equal(2);
            });
            it('Each file has the correct template applied', () => {
                expandedParameters.forEach(item => {
                    expect(item.template).to.be.equal('r:userName/repoName')
                });
            });
            it('All expected properties are present', () => {
                expandedParameters.forEach(item => {
                    expect(item).to.have.ownProperty('origin');
                    expect(item).to.have.ownProperty('destinationPath');
                    expect(item).to.have.ownProperty('isGist');
                    expect(item).to.have.ownProperty('isRepository');
                    expect(item).to.have.ownProperty('isFilePath');
                    expect(item).to.have.ownProperty('name');
                    expect(item).to.have.ownProperty('fullFileName');
                    expect(item).to.have.ownProperty('containingFolder');
                    expect(item).to.have.ownProperty('fileExtension');
                    expect(item).to.have.ownProperty('absolutePath');
                    expect(item).to.have.ownProperty('isVerbose');
                    expect(item).to.have.ownProperty('template');
                    expect(item).to.have.ownProperty('timeStamp');
                });
            });
            xit('foo', () => {
                console.log(expandedParameters);
                expect(expandedParameters).to.not.be.empty;
            });
        });

        

        
    });
});


/*
[ 
    {
        origin: 'myText.txt',
        destinationPath: 'C:\\Projects\\GitHub\\ttouch',
        isGist: false,
        isRepository: false,
        isFilePath: true,
        name:
            { 
                name: 'myText',
                upperCaseCamelCase: 'MyText',
                lowerCaseCamelCase: 'myText' 
            },
        fullFileName: 'myText.txt',
        containingFolder: 'C:\\Projects\\GitHub\\ttouch',
        fileExtension: '.txt',
        absolutePath: 'C:\\Projects\\GitHub\\ttouch\\myText.txt',
        isVerbose: true,
        template: 'r:userName/repoName',
        timeStamp: '2019-10-02T08:52:48.183Z'
    }
]
*/