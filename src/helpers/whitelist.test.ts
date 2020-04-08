import { handler } from "./whitelist/handler";
import { Ignore } from "../config";

describe("Whitelist", () => {
  const input = [".test.sub-no-used", ".class-no-used"];

  it("should filter selectors defined in ignore", () => {
    const fileToIgnore: Ignore = {
      file: "filename",
      selectors: [".class-no-used"]
    };
    const results = handler(input, fileToIgnore, []);
    expect(results).toEqual([".test.sub-no-used"]);
  });

  it("should filter out all selectors", () => {
    const fileToIgnore: Ignore = {
      file: "filename",
      selectors: [".class-no-used", ".sub-no-used"]
    };
    const results = handler(input, fileToIgnore, []);
    expect(results).toEqual([]);
  });
});
