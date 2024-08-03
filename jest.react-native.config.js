module.exports = {
  roots: ["<rootDir>/__tests__/react-native", "<rootDir>/src/react-native"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/react-native/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  coverageDirectory: "coverage/react-native",
  moduleNameMapper: {
    "^common/(.*)$": "<rootDir>/src/common/$1",
    "^react-native/(.*)$": "<rootDir>/src/react-native/$1",
  },
};
