
[![Build Status](https://travis-ci.org/dejanfajfar/ttouch.svg?branch=release)](https://travis-ci.org/dejanfajfar/ttouch)
[![npm](https://img.shields.io/npm/v/ttouch.svg)](https://www.npmjs.com/package/ttouch)
[![Gitter](https://img.shields.io/gitter/room/dejanfajfar/ttouch.svg)](https://gitter.im/dejanfajfar/ttouch)

[![NPM](https://nodei.co/npm/ttouch.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ttouch/)

![](https://raw.githubusercontent.com/dejanfajfar/ttouch/master/misc/header_image.jpg)

# ttouch

> *touch* with templates

Creating new files is easy, but entering the same boilerplate content into everyone is tedious. When creating a new ```my_script.sh``` file would it not be great if the shebang would already be there?

That is what __ttouch__ does for you and much more.

## Installation

```bash
$ npm install -g ttouch
```

### What if I do not want to install it

If you do not want to _pollute_ your global namespace then __ttouch__ can be use __npx__. But more on that in the usage section. 

## Usage

```bash
$ ttouch <filePath> [options]
```

or if you do not want to install it globally

```bash
$ npx ttouch <filePath> [options]
```

### Options

| Short | Long | Description |
| --- | --- | --- |
| -d | --destination | The destination folder for the desired file(s) |
| -g | --gist | The public gist ID to use as the template |
| -f | --file | The local file used as the template |
| -v | --verbose | Provides additional error information. Does not add additional output statements under normal operation! |

### Environment variables

__ttouch__ uses the ```TTOUCH_HOME``` environment variable to determine the default location for file templates. If this environment variable is present then the absolute path to the provided template file will be assumed to the ````$TTTOUCH_HOME/{templateName}```.

__Example:__

```bash
$ ttouch user.js -f js_class
```

Given that TTOUCH_HOME = /var/ttouch

Then the template used will be assumed to be at ```/var/ttouch/js_template```

### Examples

```bash
$ ttouch test.sh
```

Will create an _empty_ file names __test.sh__ in the current directory.

```bash
$ ttouch test.sh -g 37bcbb7217d26c2dd3e5f4cee9fd6e37
```

Will create a __test.sh__ file in the current directory using the public gist 37bcbb7217d26c2dd3e5f4cee9fd6e37

```bash
$ ttouch test.sh -f bash
```

Will create a __test.sh__ file using a file named __bash__ located in the current folder or specified by _TTOUCH_HOME_.

```bash
/home/me $ ttouch /dir1/dir2/test.sh -f bash
```

Will create a file named **test.sh** in the directory **/home/me/dir1/dir2/test.sh** and apply the **ttt-bash** template to the created file.

_NOTE: If and part of the destination path does not exist then the directories will be created_

The same could be achieved with:

```bash
/home/me $ ttouch test.sh -f bash -d dir1/dir2
```

### Multiple files

Want to create more than just one file? No problem. Just list them and provide an optional template.

```bash
$ ttouch student.js teacher.js -t jsclass
```

Will create two files **student.js** and **teacher.js** in the current folder applying the **ttt-jsclass** template to both!

## Templates

__ttouch__ does not come with any templates out of the box. All templates are _external_ to the program, files and gists. So one of the first tasks will be to start a template or two.


## Next steps

### Try it

Give the thing a try to see if you like it or if there is something missing

### Get in touch

If you have any feedback do not hesitate to utter it. Use any of the following channels to do so:

* [GitHub bugs](https://github.com/dejanfajfar/ttouch/issues)
* [Gist chat](https://gitter.im/dejanfajfar/ttouch)

### Create a template

There is a list of my template -> [HERE](/docs/templates_list.md)

If you would like to create your own -> [HERE](/docs/templates.md)