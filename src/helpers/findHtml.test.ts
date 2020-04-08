import findHtml from "./findHtml";
import mock from "mock-fs";

describe("FindHtml", () => {
  beforeEach(() => {
    mock({
      base: {
        "somefile.html": "file content here",
        subdir: {
          "somefilefromsubdir.html": "file content here"
        }
      }
    });
  });

  it("should create all possible variations from given values in the ngClass attribute", () => {
    const results = findHtml("base");
    expect(results).toEqual([
      "base/somefile.html",
      "base/subdir/somefilefromsubdir.html"
    ]);
  });
});
