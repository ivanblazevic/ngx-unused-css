import FindUnusedCss from "./findUnusedCss";

import compileSCSS from "./compileSCSS";
jest.mock("./compileSCSS", () => jest.fn());

import parseNgClass from "./../helpers/parseNgClass";
jest.mock("./../helpers/parseNgClass", () => jest.fn());

import whitelist from "./../helpers/whitelist";
import findUnusedCss from "./findUnusedCss";
jest.mock("./../helpers/whitelist", () => jest.fn());

describe("FindUnusedCss", () => {
  it("should return unused css classes and attributes", async () => {
    // @ts-ignore
    compileSCSS.mockImplementation(() => {
      return ".test-class {} a {} span {}";
    });

    // @ts-ignore
    parseNgClass.mockImplementation(() => {
      return '<div class="test-class1"><a></a></div>';
    });

    // @ts-ignore
    whitelist.mockImplementation((classes: string[]) => {
      return classes; // proxy classes to the result, whitelist has separate unit test
    });

    const result = await findUnusedCss("content", "cssPath");

    expect(result).toEqual([".test-class", "span"]);
  });
});
