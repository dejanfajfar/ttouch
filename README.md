Still not fully deployed!

___
[![Build Status](https://travis-ci.org/dejanfajfar/ttouch.svg?branch=release)](https://travis-ci.org/dejanfajfar/ttouch)
[![npm](https://img.shields.io/npm/v/ttouch.svg)](https://www.npmjs.com/package/ttouch)
[![Gitter](https://img.shields.io/gitter/room/dejanfajfar/ttouch.svg)](https://gitter.im/dejanfajfar/ttouch)

![](https://raw.githubusercontent.com/dejanfajfar/ttouch/master/misc/header_image.jpg)
# ttouch

> *touch* with templates

## Introduction

One of my most used tools in a shell is the humble ```touch```. It is great but I always missed some things:

* The ability to create files using templates
* No native touch on windows...the console is not so great ether.

I must confess that the later is getting better, but still

To try and _fix_ this I give you ```ttouch```

## Installation

In order to use ttouch simply install it globally with the following:

```bash
$ npm install -g ttouch
```

## Usage

### Synopsis

```bash
$ ttouch <filePath> [options]
```

### Description

Creates a new file at the location described, optionally with the template content selected.

**-d, --destination**

The destination folder for the desired file(s)

**-t, --template**
	
The template name to use at the newly created files

### Examples

```bash
$ ttouch test.sh
```

Will create a file names **test.sh** in the current directory.

```bash
$ ttouch test.sh -t bash
```

Will create a file named **test.sh** in the current directory and apply the **@ttouch/bash** template to the created file.

```bash
/home/me $ ttouch /dir1/dir2/test.sh -t bash
```

Will create a file named **test.sh** in the directory **/home/me/dir1/dir2/test.sh** and apply the **@ttouch/bash** template to the created file.

The same could be achieved with:

```bash
/home/me $ ttouch test.sh -t bash -d dir1/dir2
```

### Experimental

Theoretically ttouch supports creating more than one file at once. I am still working on the feature so use at your own **risk**.

But if you want to...

```bash
$ ttouch file1.js file2.js -t jsclass
```

Will create two files **file1.js** and **file2.js** in the current folder applying the **@ttouch/jsclass** template to both!

## Templates

The core distinguishing thing of ttouch is the template stuff. Each template is an independent npm package. 
A complete list of all published packages can be found by searching npmjs.org for all packages starting with _@ttouch_.

The link below will give you the complete list 

https://www.npmjs.com/search?q=%40ttouch

> I am working and accepting ideas and help with creating a better list.
