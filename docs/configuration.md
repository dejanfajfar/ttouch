# Configuration

## Environment variables

One of the features of ttouch is that local files can be used as templates. To not have to provide the containing folder for the
template file a environment variable can be provided to make all files relative to that folder.

To use this just provide the __TTOUCH_HOME__ environment variable containing the path to the template files home.

A sample:

Given the following:

```shell
$ export TTOUCH_HOME = "/var/log/ttouch"
```

Then we can simply call

```shell
$ ttouch MyClass.js f:jsclass.js
```

This will use __/var/log/ttouch/jsclass.js__ as the template. 


## Configuration file 

In order to provide an option to provide additional configuration for ttouch a global __.ttouchrc__ file can be provided.

A simple configuration file could look like this:


```ini
home = /var/ttouch/

[aliases]
jsclass = g:092348u23904827423094840293
jsclass_corporate = f:jsclass_template.js

```

The format used above is a _ini file_ format. Because that is not the preferred format for all out there there is also a _json_ format available. The above sample written in json would look like

```json
{
    "home" : "/var/ttouch",
    "aliases" : {
        "jsclass" : "g:092348u23904827423094840293",
        "jsclass_corporate" : "f:jsclass_template.js"
    }
}
```

### Structure 

Regardless of the format of the configuration file consists of two "sections":

* configurations
* aliases

#### Configurations

This section contains a collection of key value pairs with predefined keys used by ttouch.

Currently the only configuration is __home__ which supersedes the environment variable __TTOUCH_HOME__.

#### Aliases

A list of aliases provided in a key value pair. Where the key is the alias of the template. 

Given the following alias

```
jsclass = f:/var/log/ttouch/jsclass_template.js
```

When calling ttouch with ```ttouch MyClass.js t:jsclass``` then _/var/log/ttouch/jsclass_template.js_ would be used