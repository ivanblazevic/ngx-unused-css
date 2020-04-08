import { JSDOM } from "jsdom";
import combine from "./combine";
import extractClassesFromNgClass from "./extractClassesFromNgClass";

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
 * Parse html template and find all elements which contains ngClass attribute, if found
 * make copy of elements on the same level with all possible combinations of classes found
 * in ngClass configuration
 * @param {string} html
 * @param {string} cssPath
 */
function parseNgClass(html: string, cssPath: string) {
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

export default parseNgClass;
