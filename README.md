# ngx-unused-css

# Angular unused css detection

How does it works:

- it finds all `.html` files inside the project and then pairs it with their styling files;
     e.g. app.component.html > app.component.scss
- if pair is matched then it will compare unused css using PurgeCSS library
- SCSS will be automatically compiled before the matching phase
- some system selectors like `:host` or `::ng-deep` will be ignored
- with configuration it is possible to extend global selectors to ignore
- configure ignore per file in case CSS class is applied dynamically; ENUMS or based on backend model

## Installation

`npm install ngx-unused-css --save-dev`

### Add configuration file in the root of the project

`.ngx-unused-css.json`

## Usage

Run in CLI: `ngx-unused-css`

## Options

### path

* Type: `String`
* Default: `null`

Path to a project, for Angular it is usually `src/app`

### ignore

* Type: `String | Object`[]
* Default: `null`

**Special**: global as a string, or object as a file specific

* File: 
```
{
  file: "app.component.css",
  selectors: [".dynamic-class"]
}
```

### Configuration example from lib:
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

## Special cases

Template files that are not matching their styling counter part will be ignored






