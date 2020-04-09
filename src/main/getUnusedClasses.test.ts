import UnusedClasses from "./getUnusedClasses";
import { ImportMock } from "ts-mock-imports";
import * as findHtmlModule from "./../helpers/findHtml";
import * as findUnusedCssMOdule from "./findUnusedCss";
import mock = require("mock-fs");

describe("GetUnusedClasses", () => {
  it("should return empty array if no unused css files", () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc([]);
    });

    mock({
      "file.html": "file.html",
      "file.scss": "file.scss"
    });

    const mockManager = ImportMock.mockClass(findHtmlModule);
    // @ts-ignore
    mockManager.mock("findHtml", ["file.html"]);

    const mockManager2 = ImportMock.mockClass(findUnusedCssMOdule);
    // @ts-ignore
    mockManager2.mock("findUnusedCss", promiseA);

    new UnusedClasses().getUnusedClasses("").then(res => {
      // @ts-ignore
      expect(res).toEqual([]);
    });

    ImportMock.restore();
  });

  it("should return only unused classes from the results", () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc(["class1"]);
    });

    mock({
      "file.html": "file.html",
      "file.scss": "file.scss"
    });

    const mockManager = ImportMock.mockClass(findHtmlModule);
    // @ts-ignore
    mockManager.mock("findHtml", ["file.html"]);

    const mockManager2 = ImportMock.mockClass(findUnusedCssMOdule);
    // @ts-ignore
    mockManager2.mock("findUnusedCss", promiseA);

    new UnusedClasses().getUnusedClasses("").then(res => {
      // @ts-ignore
      expect(res).toEqual([[["class1"], "file.html"]]);
    });

    ImportMock.restore();
  });
});
