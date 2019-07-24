#!/usr/bin/env node

/*
Find unused css inside Angular components
*/
const SELECTORS_TO_IGNORE = [":host", "::ng-deep"];

const {table} = require('table');
const chalk = require('chalk');
const Purgecss = require("purgecss");
const path = require("path");
const fs = require("fs");
const sass = require("node-sass");
const jsdom = require("jsdom");
const utils = require("./utils/utils.js");
const { JSDOM } = jsdom;
let config = require(path.resolve('.ngx-unused-css.json'));

if (!config) {
  throw new Error("Configuration file .ngx-unused-css.json is missing.");
}

try {
  process.argv.forEach(function(val, index) {
    if (index > 1) {
      let a = val.split("=");
      if (a[0] === "--config") {
        config = require(__dirname + "/." + a[1]);
      }
    }
  });
} catch (error) {
  throw new Error(error);
}

if (!config.path) {
  throw new Error("Project path not defined");
}

let projectPath = config.path;

const ignoreSelectors = SELECTORS_TO_IGNORE.concat(
  config.ignore.filter(c => typeof c === "string")
);

/**
 * Create copy of reference element and add classes passed as a params
 * @param { JSDOM } dom
 * @param { element } e
 * @param { Array<string> } classes
 */
function createCopyOfElementWithClasses(dom, e, classes) {
  const el = dom.window.document.createElement(e.tagName);
  el.classList = e.classList;
  classes.forEach(c => el.classList.add(c));
  return el;
}

/**
 * Extract ngClass configuration and return array of all classes found
 * @param {string} value
 */
function extractClassesFromNgClass(value) {
  var found = [],
    rxp = /{([^}]+)}/g,
    curMatch;

  while ((curMatch = rxp.exec(value))) {
    found.push(curMatch[1].replace(/\n/g, "").replace(/ /g, ""));
  }

  let classes = [];
  if (found.length > 0) {
    classes = found[0].split(",").map(e => e.split(":")[0]);
  }

  return classes;
}

/**
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 * @param {string} cssPath
 */
function parseNgClass(html, cssPath) {
  const dom = new JSDOM(html);

  var all = dom.window.document.getElementsByTagName("*");

  var inputList = Array.prototype.slice.call(all);
  inputList.forEach(e => {
    var attrs = Array.prototype.slice.call(e.attributes);
    attrs.forEach(a => {
      if (a.name === "[ngclass]") {
        const classes = extractClassesFromNgClass(a.value);
        e.removeAttribute("[ngclass]");
        /*
        console.log(
          'ngClass removed from the element, classes found: ',
          classes
        );
        */
        const classCombinations = utils.combine(classes);
        classCombinations.forEach(c => {
          const el = createCopyOfElementWithClasses(dom, e, c);
          e.parentNode.insertBefore(el, e.nextSibling);
        });
      }
    });
  });

  return dom.serialize();
}

/**
 * Resolve tilda relative importes from node_modules
 * @param {*} url
 * @param {*} prev
 * @param {*} done
 */
function importer(url, prev, done) {
  if (url[0] === "~") {
    url = path.resolve("node_modules", url.substr(1));
  }

  return { file: url };
}

/**
 * Compile SCSS
 * @param {string} cssPath
 */
function compileSCSS(cssPath) {
  var result = sass.renderSync({
    file: cssPath,
    importer: [importer, config.importer],
    includePaths: config.includePaths
  });
  return result.css.toString();
}

/**
 * Find unused css classes per file and returns array of them
 * @param {string} content
 * @param {string} cssPath
 */
function findUnusedCss(content, cssPath) {
  let css = "";
  try {
    if (!cssPath) return;
    css = compileSCSS(cssPath);
  } catch (error) {
    console.error(error);
  }

  try {
    const html = parseNgClass(content, cssPath);
    var purgecss = new Purgecss({
      content: [
        {
          raw: html,
          extension: "html"
        }
      ],
      css: [{ raw: css }],
      rejected: true
    });
    var purgecssResult = purgecss.purge();
    let result = purgecssResult[0].rejected;

    const fileIgnore = config.ignore
      .filter(c => typeof c === "object")
      .filter(c => {
        return projectPath + "/" + c.file === cssPath;
      });

    let ignore = ignoreSelectors;

    if (fileIgnore.length > 0) {
      const selectorsToIgnore = fileIgnore[0].selectors;
      ignore = ignore.concat(selectorsToIgnore);

      // ignore all unused classes from file
      if (fileIgnore[0].all) {
        return [];
      }
    }

    // filter ignored selectors
    result = result.filter(c => {
      const ignoredSelectorFound = ignore.some(s => {
        return c.indexOf(s) > -1;
      });
      return !ignoredSelectorFound;
    });

    return result;
  } catch (error) {
    console.error(error);
  }
}

const list = utils.findHtml(projectPath, "html");
let unusedClasses = [];

list.forEach(element => {
  const htmlFile = element;
  const html = fs.readFileSync(htmlFile, "utf8");
  const cssPath = htmlFile.replace(".html", ".scss"); // same path as html but css means it is component

  try {
    fs.readFileSync(cssPath);
    try {
      const classes = findUnusedCss(html, cssPath);
      if (classes.length > 0) {
        unusedClasses.push([classes, htmlFile]);
      }
    } catch (error) {}
  } catch (error) {
    console.log(
      "Styling file for component " + htmlFile + " not found, skipping..."
    );
  }
});

if (unusedClasses.length > 0) {

  console.error(chalk.blue.bold("Unused CSS classes were found for the following files"));
  
  var result = '';

  unusedClasses.forEach(e => {

    const htmlPath = e[1];
    const cssPath = e[1].replace(".html", ".scss");

    console.log(chalk.red(htmlPath));
    result += htmlPath + "\n";
    console.log(chalk.red.bold(cssPath));
    result += cssPath + "\n";

    const cssClasses = e[0].join("\n");
    result += cssClasses + "\n";
    output = table([[chalk.green(cssClasses)]]);
 
    console.log(output);
  });

  throw new Error(
    "Unused CSS classes found:\n"
    + result
  );

}
