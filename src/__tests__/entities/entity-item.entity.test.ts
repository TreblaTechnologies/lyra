import { EntityItem } from "../../entities/entity-item.entity";

describe("EntityItem Interface", () => {
  it("should allow a string label and value", () => {
    const item: EntityItem = {
      label: "Test Label",
      value: "Test Value",
    };

    expect(item.label).toBe("Test Label");
    expect(item.value).toBe("Test Value");
  });

  it("should allow a string label and a number value", () => {
    const item: EntityItem = {
      label: "Test Label",
      value: 123,
    };

    expect(item.label).toBe("Test Label");
    expect(item.value).toBe(123);
  });
});
