module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/index.ts',
    '<rootDir>/index.ts',
  ],
  "coverageReporters": ['json', 'lcov', 'text', 'clover', 'cobertura'],
  "reporters": ['default'],
  "testResultsProcessor": "jest-sonar-reporter",
};
