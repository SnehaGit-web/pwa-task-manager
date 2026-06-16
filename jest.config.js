module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterFramework: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styleMock.js",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  transform: { "^.+\\.(js|jsx)$": "babel-jest" },
};
