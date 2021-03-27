import UnusedClasses from "./getUnusedClasses";
import { ImportMock } from "ts-mock-imports";
import * as findHtmlModule from "./../helpers/findHtml";
import * as findUnusedCssMOdule from "./findUnusedCss";

jest.mock("fs");

describe("GetUnusedClasses", () => {
  const MOCK_FILE_INFO = {
    "file.html": "file.html",
    "file.scss": "file.scss",
  };

  beforeEach(() => {
    // Set up some mocked out file info before each test
    require("fs").__setMockFiles(MOCK_FILE_INFO);
  });

  it("should return empty array if no unused css files", async () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc([]);
    });

    const mockManager = ImportMock.mockClass(findHtmlModule);
    // @ts-ignore
    mockManager.mock("findHtml", ["file.html"]);

    const mockManager2 = ImportMock.mockClass(findUnusedCssMOdule);
    // @ts-ignore
    mockManager2.mock("findUnusedCss", promiseA);

    const result = await new UnusedClasses().getUnusedClasses("");
    expect(result).toEqual([]);

    ImportMock.restore();
  });

  it("should return only unused classes from the results", async () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc(["class1"]);
    });

    const mockManager = ImportMock.mockClass(findHtmlModule);
    // @ts-ignore
    mockManager.mock("findHtml", ["file.html"]);

    const mockManager2 = ImportMock.mockClass(findUnusedCssMOdule);
    // @ts-ignore
    mockManager2.mock("findUnusedCss", promiseA);

    const result = await new UnusedClasses().getUnusedClasses("");
    expect(result).toEqual([[["class1"], "file.html"]]);

    ImportMock.restore();
  });
});
