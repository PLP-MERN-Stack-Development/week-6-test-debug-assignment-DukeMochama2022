const { capitalizeFirstLetter } = require("../../src/utils");

describe("capitalizeFirstLetter", () => {
  it("capitalizes the first letter of a lowercase word", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  it("returns the same string if the first letter is already capitalized", () => {
    expect(capitalizeFirstLetter("World")).toBe("World");
  });

  it("returns an empty string if input is empty", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  it("returns the input if it is not a string", () => {
    expect(capitalizeFirstLetter(null)).toBe(null);
    expect(capitalizeFirstLetter(undefined)).toBe(undefined);
    expect(capitalizeFirstLetter(123)).toBe(123);
  });
});




