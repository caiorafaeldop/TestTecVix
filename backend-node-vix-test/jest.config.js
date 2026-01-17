/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/prisma/",
    "/__tests__/",
    "/__mocks__/",
    "/middlewares/logs*",
    "/public/",
    "/middlewares/errorHandler.ts",
    "/swagger/",
  ],
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  verbose: true,
  clearMocks: true,
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/singleton.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/src/__tests__/singleton.ts",
    "<rootDir>/src/__tests__/__mocks__/",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};
