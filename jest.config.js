/* eslint-disable @typescript-eslint/no-require-imports */
// /* eslint-disable @typescript-eslint/no-require-imports */
// const nextJest = require("next/jest");

// const createJestConfig = nextJest({
//   dir: "./",
// });

// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "jest-environment-jsdom",
//   preset: "ts-jest",
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   transformIgnorePatterns: [
//     "/node_modules/(?!lucide-react|some-other-esm-module)/",
//   ],
// };

// module.exports = createJestConfig(customJestConfig);
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
