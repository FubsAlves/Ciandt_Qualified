const chai = require("chai");
const {assert} = chai;
require("util").inspect.defaultOptions.depth = null;
chai.config.truncateThreshold = 0;

describe("example tests", () => {
  it("should work for zero", () => {
    assert.equal(descendingOrder(0), 0);
  });

  it("should work for a single digit", () => {
    assert.equal(descendingOrder(4), 4);
  });

  it("should work for multiple digits that are the same", () => {
    assert.equal(descendingOrder(777), 777);
  });

  it("should work for multiple digits that are in the right order", () => {
    assert.equal(descendingOrder(65), 65);
  });

  it("should work for multiple digits that are in the reverse order", () => {
    assert.equal(descendingOrder(47), 74);
  });

  it("should work for multiple digits that are in random order", () => {
    assert.equal(descendingOrder(1021), 2110);
  });

  it("should work for lots of digits", () => {
    assert.equal(descendingOrder(172384956), 987654321);
  });
});