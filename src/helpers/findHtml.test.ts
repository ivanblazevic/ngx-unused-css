import FindHtml from "./findHtml";
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

  it("should return array of html files", () => {
    const results = new FindHtml().findHtml("base");
    expect(results).toEqual([
      "base/somefile.html",
      "base/subdir/somefilefromsubdir.html"
    ]);
  });
});
