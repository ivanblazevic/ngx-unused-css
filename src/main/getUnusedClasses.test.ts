import UnusedClasses from "./getUnusedClasses";
import mock = require("mock-fs");

import FindHtml from "./../helpers/findHtml";
jest.mock("./../helpers/findHtml", () => jest.fn());

import FindUnusedCss from "./findUnusedCss";
jest.mock("./findUnusedCss", () => jest.fn());

const mockFindUnusedCss = (returnValue: string[]) => {
  // @ts-ignore
  FindUnusedCss.mockImplementationOnce(() => {
    return {
      findUnusedCss: () => Promise.resolve(returnValue),
    };
  });
};

describe("GetUnusedClasses", () => {
  beforeAll(() => {
    mock({
      "file.html": "file.html",
      "file.scss": "file.scss",
    });

    // @ts-ignore
    FindHtml.mockImplementation(() => {
      return {
        findHtml: () => ["file.html"],
      };
    });
  });

  afterAll(() => {
    mock.restore();
  });

  it("should return empty array if no unused css files", async () => {
    mockFindUnusedCss([]);

    const result = await new UnusedClasses().getUnusedClasses("");
    expect(result).toEqual([]);
  });

  it("should return only unused classes from the results", async () => {
    mockFindUnusedCss(["class1"]);

    const result = await new UnusedClasses().getUnusedClasses("");
    expect(result).toEqual([[["class1"], "file.html"]]);
  });
});
