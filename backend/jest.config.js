const config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: [
    "backend/**/*.js",      // ✅ Ensures backend files are covered
    "!**/node_modules/**",  // ❌ Ignore dependencies
    "!**/coverage/**",      // ❌ Ignore coverage output
    "!**/__tests__/**",     // ❌ Ignore test files
    "!**/jest.config.js",   // ❌ Ignore this config file itself
  ],
  testEnvironment: "node",  // ✅ Recommended for backend testing
};

module.exports = config;
