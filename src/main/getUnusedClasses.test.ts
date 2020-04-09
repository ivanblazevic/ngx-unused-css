import UnusedClasses from "./getUnusedClasses";
import { ImportMock } from "ts-mock-imports";
import * as findHtmlModule from "./../helpers/findHtml";

describe("GetUnusedClasses", () => {
  it("should return only unused classes from the results", () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc([["class1"], "file.html"]);
    });

    const mockManager = ImportMock.mockClass(findHtmlModule);
    // @ts-ignore
    mockManager.mock("findHtml", [""]);

    const a = new UnusedClasses();

    // @ts-ignore
    spyOn(a, "mapClasses").and.returnValue(Promise.all([promiseA]));

    a.getUnusedClasses("").then(res => {
      // @ts-ignore
      expect(res).toEqual([[["class1"], "file.html"]]);
    });

    ImportMock.restore();
  });
});
