const requestLogger = require("../../src/middleware/requestLogger");

describe("requestLogger middleware", () => {
  it("should log the method and path and call next", () => {
    const req = { method: "GET", path: "/test" };
    const res = {};
    const next = jest.fn();

    requestLogger(req, res, next);

    expect(req.logged).toBe("GET /test");
    expect(next).toHaveBeenCalled();
  });
});
