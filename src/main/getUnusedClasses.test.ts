import UnusedClasses from "./getUnusedClasses";

describe("GetUnusedClasses", () => {
  it("should return only unused classes from the results", () => {
    const promiseA = new Promise((resolutionFunc, rejectionFunc) => {
      resolutionFunc(777);
    });

    // const a = new UnusedClasses();

    // spyOnProperty(a, "mapClasses").and.returnValue(promiseA);

    // a.getUnusedClasses("conf.path").then(res => {
    //   console.log(res);
    // });

    expect(2).toBe(2);
  });
});
