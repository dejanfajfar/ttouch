# Templates

> A short introduction into how to create your own templates

This document will hopefully help you create your own templates for use with __ttouch__. 

## How templates work

Before we go into the types of templates and how to create them a little introduction into how the templates work.

### Template engine

As the underlying template engine used is [Handelbars](https://handlebarsjs.com/). Because of that all features of the templating engine can be used. 

But the most important is the ability to insert the context information into the templates, aka replacement strings.

### Template available fields

When creating a template the following fields are available to you.

| Name | path | Description |
|---|---|---|
| Origin | origin | The original file name value entered by the user |
| Destination | destinationPath | The folder where the current file wil be created in |
| Is gist | isGist | Denotes if the current file is a gist id |
| Is repository | isRepository | Denotes if the current file is a repository id |
| Is file path | isFilePath | Denotes if the current file is a file path |
| File name | name.name | The file name without the file extension |
| File name in upper case camel case | name.upperCaseCamelCase | The file name, without the file extension, formated in into upper case camel case |
| File name in lower case camel case | name.lowerCaseCamelCase | The file name, without the file extension, formated in into lower case camel case |
| Full file name | fullFileName | The file name including the file extension |
| Containing folder | containingFolder | The folder from which ttouch was called from |
| File extension | fileExtension | The file extension of the file |
| Absolute path | absolutePath | The absolute path to the file being created |
| Is verbose | isVerbose | Determines if the user wants to see the internal workings of ttouch. Can also be used to put additional details into the template |
| Template | template | The template to be used for the content of the created file |
| Timestamp | timeStamp | The timestamp at which the command was executed |

Sample:

```json
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
```

### Conclusion

Now that the underlying template engine and the possible replacement strings are known writing a template is only putting those two together.

## File templates

A file template is a simple file containing a handlebars template used to populate the file after combining it with the context information.

## Gist templates

To create a gist template the first thing you will need is a public gist.

The _gist id_ can be found as the last url part. 

Inside the gist create a file with the name __template__, this is very important! This file will be taken as the template content after retrieving the gist.

