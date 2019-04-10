#!/usr/bin/env node

/*
Find unused css inside Angular components
*/
const SELECTORS_TO_IGNORE = [':host', '::ng-deep'];

const Purgecss = require('purgecss');
const path = require('path');
const fs = require('fs');
const sass = require('node-sass');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const config = require('./.ngx-unused-css');

const ignoreSelectors = SELECTORS_TO_IGNORE.concat(config.ignore.filter(c => typeof(c) === 'string'))

let projectPath = config.path;

/**
 * Returns array of all possible combinations of array values
 * e.g. if param is ["a", "b"] it will return [["a"], ["b"], ["a", "b"]]
 * @param { Array<string> } a - Array of strings
 */
var combine = function(a) {
  var fn = function(n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = 0; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};

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

function extractClassesFromNgClass(value) {
  var found = [],
    rxp = /{([^}]+)}/g,
    curMatch;

  while ((curMatch = rxp.exec(value))) {
    found.push(curMatch[1].replace(/\n/g, '').replace(/ /g, ''));
  }

  let classes = [];
  if (found.length > 0) {
    classes = found[0].split(',').map(e => e.split(':')[0]);
  }

  return classes;
}

function parseNgClass(html, cssPath) {
  const dom = new JSDOM(html);

  var all = dom.window.document.getElementsByTagName('*');

  var inputList = Array.prototype.slice.call(all);
  inputList.forEach(e => {
    var attrs = Array.prototype.slice.call(e.attributes);
    attrs.forEach(a => {
      if (a.name === '[ngclass]') {
        const classes = extractClassesFromNgClass(a.value);
        e.removeAttribute('[ngclass]');
        /*
        console.log(
          'ngClass removed from the element, classes found: ',
          classes
        );
        */
        const classCombinations = combine(classes);
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
  if (url[0] === '~') {
    url = path.resolve('node_modules', url.substr(1));
  }

  return { file: url };
}

function findUnusedCss(content, cssPath) {
  let css = '';
  try {
    if (!cssPath) return;
    var result = sass.renderSync({
      file: cssPath,
      importer: importer
    });
    css = result.css.toString();
  } catch (error) {
    console.error(error);
  }

  try {
    const html = parseNgClass(content, cssPath);
    var purgecss = new Purgecss({
      content: [
        {
          raw: html,
          extension: 'html'
        }
      ],
      css: [{ raw: css }],
      rejected: true
    });
    var purgecssResult = purgecss.purge();
    let result = purgecssResult[0].rejected;

    const fileIgnore = config.ignore.filter(c => typeof(c) === "object").filter(c =>  "./" + projectPath + "/" + c.file === cssPath);

    let ignore = ignoreSelectors;

    if (fileIgnore.length > 0) {
      const selectorsToIgnore = fileIgnore[0].selectors;
      ignore = ignore.concat(selectorsToIgnore);
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

try {
  process.argv.forEach(function(val, index) {
    if (index > 1) {
      let a = val.split('=');
      if (a[0] === '--projectPath') {
        projectPath = a[1];
      }
    }
  });
  if (!projectPath) {
    throw new Error('projectPath is missing');
  }
} catch (error) {
  throw new Error(error);
}

const list = findHtml(projectPath, 'html');
let unusedClasses = [];

list.forEach(element => {
  const htmlFile = './' + element;
  const html = fs.readFileSync(htmlFile, 'utf8');
  const cssPath = htmlFile.replace('.html', '.scss'); // same path as html but css means it is component

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
      'Styling file for component ' + htmlFile + ' not found, skipping...'
    );
  }
});

if (unusedClasses.length > 0) {
  let result = '';
  unusedClasses.forEach(e => {
    result += e[1] + '\n' + e[1].replace(".html", ".scss") + '\n   ' + e[0].join() + '\n\n';
  });
  throw new Error(
    'Unused CSS classes found in following angular components: \n\n' + result
  );
}

//source: https://gist.github.com/victorsollozzo/4134793
function findHtml(base, ext, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(function(file) {
    let newbase = path.join(base, file);
    if (fs.statSync(newbase).isDirectory()) {
      result = findHtml(newbase, ext, fs.readdirSync(newbase), result);
    } else {
      if (file.substr(-1 * (ext.length + 1)) == '.' + ext) {
        result.push(newbase);
      }
    }
  });
  return result;
}
