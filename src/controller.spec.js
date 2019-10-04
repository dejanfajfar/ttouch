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

    describe('determineUsedTemplate', ()=> {
        const determineUsedTemplate = controller.__get__('determineUsedTemplate');
        let userParameters = null;

        describe('GIVEN inline template AND no selected template', () => {
            beforeEach(() => {
                userParameters = {
                    commandBase: '/user/testFolder',
                    files: ['myText.txt', '../yourText.txt', 'r:userName/repoName'],
                    dest: '.',
                    isVerbose: true,
                    timeStamp: new Date('2019-10-02T08:52:48.183Z')
                };
            });

            it('THEN inline template returned as string', () => {
                let selectedTemplate = determineUsedTemplate(userParameters);

                expect(selectedTemplate).to.be.equal('r:userName/repoName');
            });
        });

        describe('GIVEN inline templete AND selected template', () => {
            beforeEach(() => {
                userParameters = {
                    commandBase: '/user/testFolder',
                    files: ['myText.txt', '../yourText.txt', 'r:userName/repoName'],
                    dest: '.',
                    isVerbose: true,
                    template: 'g:12345',
                    timeStamp: new Date('2019-10-02T08:52:48.183Z')
                };
            });

            it('THEN selected template returned as string', () => {
                let selectedTemplate = determineUsedTemplate(userParameters);

                expect(selectedTemplate).to.be.equal('g:12345');
            });
        });

        describe('GIVEN no inline templete AND no selected template', () => {
            beforeEach(() => {
                userParameters = {
                    commandBase: '/user/testFolder',
                    files: ['myText.txt', '../yourText.txt'],
                    dest: '.',
                    isVerbose: true,
                    timeStamp: new Date('2019-10-02T08:52:48.183Z')
                };
            });

            it('THEN selected template returned as string', () => {
                let selectedTemplate = determineUsedTemplate(userParameters);

                expect(selectedTemplate).to.be.undefined;
            });
        });

        describe('GIVEN multiple inline templetes', () => {
            beforeEach(() => {
                userParameters = {
                    commandBase: '/user/testFolder',
                    files: ['myText.txt', '../yourText.txt', 'r:userName/repoName1', 'r:userName/repoName2', 'r:userName/repoName3'],
                    dest: '.',
                    isVerbose: true,
                    timeStamp: new Date('2019-10-02T08:52:48.183Z')
                };
            });

            it('THEN first inline template returned', () => {
                let selectedTemplate = determineUsedTemplate(userParameters);

                expect(selectedTemplate).to.be.equal('r:userName/repoName1');
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