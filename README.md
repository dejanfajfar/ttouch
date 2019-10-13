
[![Build Status](https://travis-ci.org/dejanfajfar/ttouch.svg?branch=release)](https://travis-ci.org/dejanfajfar/ttouch)
[![npm](https://img.shields.io/npm/v/ttouch.svg)](https://www.npmjs.com/package/ttouch)
[![Gitter](https://img.shields.io/gitter/room/dejanfajfar/ttouch.svg)](https://gitter.im/dejanfajfar/ttouch)

[![NPM](https://nodei.co/npm/ttouch.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ttouch/)

![](https://raw.githubusercontent.com/dejanfajfar/ttouch/master/misc/header_image.jpg)
# ttouch

> *touch* with templates

## Introduction

Creating new files is easy. Creating a new file and staring at an empty file you have to fill is not so great. 

Writting programs creating new files is something that happens quite often. And everytime you have to go into the file and fill it out with boilerplate code that is the same in every file of the same _type_. 

So I wanted something that:

* Creates file prefilled with the desired boilerplate code
* Automatically creates missing directories, much like ```mkdir -p```
* Cross platform. So that I can use the same tool on every system

Because such a tool was not to be found I build one.

Allow me to present to you ```ttouch```

## Installation

Beeing a simple

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

### Usage examples

```bash
$ ttouch test.sh
```

Will create an _empty_ file names **test.sh** in the current directory.

```bash
$ ttouch test.sh -g 37bcbb7217d26c2dd3e5f4cee9fd6e37
```

Will create a __test.sh__ file in the current directory using the public gist 37bcbb7217d26c2dd3e5f4cee9fd6e37

```bash
$ ttouch test.sh -f bash
```

Will create a __test.sh__ file using a file named __bash__ located in the current folder or specified by _TTOUCH_HOME_.

```bash
/home/me $ ttouch /dir1/dir2/test.sh -t bash
```

Will create a file named **test.sh** in the directory **/home/me/dir1/dir2/test.sh** and apply the **ttt-bash** template to the created file.

The same could be achieved with:

```bash
/home/me $ ttouch test.sh -t bash -d dir1/dir2
```

### Multiple files

Another feature of ```ttouch``` is to create multiple files at the same time. This is usefull if you have to create multiple files of the same type, like a bunch of javascrip class definitions.

```bash
$ ttouch student.js teacher.js -t jsclass
```

Will create two files **student.js** and **teacher.js** in the current folder applying the **ttt-jsclass** template to both!

## Templates

The core distinguishing thing of ttouch is the template stuff. Each template is an independent npm package. 
A complete list of all published packages can be found by searching npmjs.org for all packages tagged with _ttouch_.

The link below will give you the complete list 

https://www.npmjs.com/search?q=ttouch

> I am working and accepting ideas and help with creating a better list.

## Next steps

Go to the wiki for more information...