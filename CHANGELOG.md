# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0]
### Added

- .ttouchrc file support added
- debug output
- errorDetails output
- Added version option 

### Fixed

- output consistency

### Removed

- Template invalid error
- Template not found error

### Changed

- Verbose output now holds more information about the inner workings of the application
- Updated cli output from 16 colors to 256 colors. Should look a little nicer now
- Additional help text

## [2.0.0]
### Added

- Gist template type
- Inline parameter template selection
- TTOUCH_HOME environment variable
- File template type
- Template file CLI switch
- Gist CLI switch
- Added 

### Changed

- The last file in the file list can now be a template identifier

### Fixed

- If no template provided the the file contains the string "undefined"

### Removed

- the --template cli parameter
- the old template system was removed! 

## [1.0.0]
### Fixed

- Info messages are not printet to stderr anymore but to stdout

### Changed

- On template error error message was cahnged


## [0.2.0]
### Added

- Additional error information
- A new verbose mode with the -v parameter

### Changed

- Creating the file and filling it with the rendered template are not distinct steps anymore

### Removed

- Emojis in console output

## [0.1.1]
## Fixed

- Loading of templates on windows

## [0.1.0]
### Added

- More comprehensive README.md
- Social preview for GitHub link
- Header image
- CLI header now has colors and version printout

### Changed

- Renamed the ```dest``` parameter to ```destination```


## [0.0.1]
### Added

- Initial version of the tool 
