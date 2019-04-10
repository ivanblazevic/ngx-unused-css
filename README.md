# ngx-unused-css
Angular unused css detection

`npm install ngx-unused-css --save-dev`

## Add configuration file in the root of the project

`.ngx-unused-css.json`

## Options

### path

* Type: `String`
* Default: `null`

Path to a project, for Angular it is usually `src/app`

### ignore

* Type: `String | Object`[]
* Default: `null`

**Special**: global as a string, or object as a file specific

** File: 
{
  file: "app.component.css",
  selectors: [".dynamic-class"]
}

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





