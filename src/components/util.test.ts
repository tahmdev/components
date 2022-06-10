import { getPercent } from "./util";
describe("getPercent", () => {
  it("should work with 2 positive numbers ", () => {
    expect(getPercent(1, 100)).toBe(1);
  });
  it("should work with 1 positive and 1 negative number ", () => {
    expect(getPercent(-1, 100)).toBe(-1);
  });
  it("should work with 2 negative numbers ", () => {
    expect(getPercent(-1, -100)).toBe(1);
  });
});
