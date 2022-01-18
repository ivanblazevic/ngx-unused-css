[![Build Status](https://travis-ci.org/ivanblazevic/ngx-unused-css.svg?branch=master)](https://travis-ci.org/ivanblazevic/ngx-unused-css)
[![Inline docs](http://inch-ci.org/github/ivanblazevic/ngx-unused-css.svg?branch=master)](http://inch-ci.org/github/ivanblazevic/ngx-unused-css)

[![npm](https://nodei.co/npm/ngx-unused-css.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/ngx-unused-css)

# Angular unused css detection

## Breaking changes in version >= 4.0.0

- sass lib has been upgraded to latest version therefore custom importer configuration needs to be changed,
  refer to: https://sass-lang.com/documentation/js-api/interfaces/FileImporter
- 

## Quick setup

Run via API

```
import { NgxUnusedCSS } from 'ngx-unused-css';

const result = new Main(config).instance.run();
```

Run via CLI

`npx ngx-unused-css --init`

`npm i -D ngx-unused-css`

Add script into `package.json` and run it:

`
  "scripts": {
    ...
    "unused-css": "ngx-unused-css"
    ...
  }
`

## How does it works

- it finds all `.html` files inside the project and then pairs it with their styling files;
  e.g. app.component.html > app.component.scss
- if pair is matched then it will compare unused css using PurgeCSS library
- SCSS will be automatically compiled before the matching phase
- some system selectors like `:host` or `::ng-deep` will be ignored
- with configuration it is possible to extend global selectors to ignore
- configure ignore per file in case CSS class is applied dynamically; ENUMS or based on backend model

## Installation

Global: `npm install -g ngx-unused-css`

or

Local: `npm install ngx-unused-css --save-dev`

### Add configuration file in the root of the project

`.ngx-unused-css.json`

## Usage

Run in CLI if installed globally like: `ngx-unused-css`

or add it to package.json > scripts: `"unused-css": "ngx-unused-css"` and run in CLI: `npm run unused-css`

_Optionally, override config path with CLI param: `ngx-unused-css --config=otherConfig`_

## Options

### path

- Type: `String`
- Default: `null`

Path to a project, for Angular it is usually `src/app`

### styleExt

- Type: `String`
- Default: `.scss`

Styling extension used in the project, options are: `scss | sass | css`

### globalStyles

- Type: `String`
- Default: `null`

Path to global styles, usally it is `src/styles.scss`

### importer

Custom importer handler, more details here: https://sass-lang.com/documentation/js-api/interfaces/FileImporter

### includePaths

Refer to original documentation: https://github.com/sass/node-sass#includepaths

### ignore

- Type: `Array<String | Object>`
- Default: `null`

Selectors to ignore, they can be defined globally (as an string) or specific per file (as an object).
This comes useful when class is applied based on the value from the backend, e.g.

`[ngClass]="model.status.toLowerCase()"` class is dervied from the backend so there is no possibility to do the analysis.

**Special**: global as a string, or Object as a file specific

### Object

#### file

- Type: `String`
- Default: `null`

Path to css file, relative to projectPath

#### selectors

- Type: `Array<String>`
- Default: `null`

Array of selectors inside the file

#### all

- Type: `Boolean`
- Default: `false`

If set as true it will ignore selectors property (if defined) and will ignore whole file

Example: _Ignore .dynamic-class in app.component.scss_:

```
{
  file: "app.component.scss",
  selectors: [".dynamic-class"]
}
```

Example: _Ignore whole app.component.scss_:

```
{
  file: "app.component.scss",
  all: true
}
```

Example: _Ignore ng-star globally and .test-2 inside test.component.scss file_:

```
{
    "path": "src/app",
    "ignore": [
        "ng-star",
        {
            "file": "test.component.scss",
            "selectors": [".test-2"]
        }
    ]
}
```

## ngClass handling

If ngClass is found on the element, same element will be duplicated with all possible combination of the classes on the same level and template will be then compared with css definition to match if all possible combinations are used

Example:

```
<div class="test">
     <div class="test" [ngClass]="{ class1: var1, class2: var2 }"></div>
</div>
```

To compare against CSS it will recompile html with all possible cases:

```
<div class="test">
     <div class="test" [ngClass]="{ class1: var1, class2: var2 }"></div>
     <div class="test class1"></div>
     <div class="test class2"></div>
     <div class="test class1 class2"></div>
</div>
```

**NOTE:** This library will not detect nested ngClasses

## Special cases

Template files that are not matching their styling counter part will be ignored
