import extractClassesFromNgClass from "./extractClassesFromNgClass";

describe("ExtractClassesFromNgClass", () => {
  const template = `{ class1: true, class2: false }`;

  it("should extract all possible classes found in ngClass attribute", () => {
    const results = extractClassesFromNgClass(template);
    expect(results).toEqual(["class1", "class2"]);
  });
});
