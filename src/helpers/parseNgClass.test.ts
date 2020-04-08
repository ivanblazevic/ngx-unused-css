import parseNgClass from "./parseNgClass";

describe("Parse ngClass method", () => {
  const template = `<div [ngClass]="{ class1: true, class2: false }"></div>`;

  it("should create all possible variations from given values in the ngClass attribute", () => {
    const results = parseNgClass(template, "");

    const expectedResults = `<html><head></head><body><div></div><div class="class1 class2"></div><div class="class2"></div><div class="class1"></div></body></html>`;

    expect(results).toEqual(expectedResults);
  });
});
