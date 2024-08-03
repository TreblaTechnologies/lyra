import {
  getFirstTwoWords,
  getFirstWord,
  getInitials,
  getLastWord,
  getPluralOrSingular,
  isShortWord,
} from "../../helpers/string.helper";

describe("String Utilities", () => {
  it("should get the first word", () => {
    expect(getFirstWord("hello world")).toBe("hello");
    expect(getFirstWord("hello")).toBe("hello");
    expect(getFirstWord("  hello  ")).toBe("hello");
  });

  it("should get the last word", () => {
    expect(getLastWord("hello world")).toBe("world");
    expect(getLastWord("world")).toBe("world");
    expect(getLastWord("  world  ")).toBe("world");
  });

  it("should get the first two words", () => {
    expect(getFirstTwoWords("hello beautiful world")).toBe("hello beautiful");
    expect(getFirstTwoWords("hello")).toBe("hello");
    expect(getFirstTwoWords("hello beautiful world", false)).toBe(
      "hello beautiful"
    );
    expect(getFirstTwoWords("hello the world", true)).toBe("hello the world");
    expect(getFirstTwoWords("hello the the world", true)).toBe(
      "hello the the world"
    );
  });

  it("should identify short words correctly", () => {
    expect(isShortWord("the")).toBe(true);
    expect(isShortWord("a")).toBe(true);
    expect(isShortWord("no")).toBe(true);
    expect(isShortWord("hello")).toBe(false);
    expect(isShortWord("world")).toBe(false);
  });

  it("should return plural or singular based on count", () => {
    expect(getPluralOrSingular(1, "apple", "apples")).toBe("1 apple");
    expect(getPluralOrSingular(2, "apple", "apples")).toBe("2 apples");
    expect(getPluralOrSingular(0, "apple", "apples")).toBe("");
  });

  it("should get initials from text", () => {
    expect(getInitials("John Doe")).toBe("JD");
    expect(getInitials("SingleName")).toBe("S");
    expect(getInitials("  John  Doe  ")).toBe("JD");
    expect(getInitials("John the Doe")).toBe("JD");
    expect(getInitials("John the the Doe")).toBe("JD");
  });
});
