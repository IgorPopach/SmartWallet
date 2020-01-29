module.exports = {
    // Display individual test results with the test suite hierarchy.
    verbose: true,
  
    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },

    setupFiles: [
      "<rootDir>/tests/initialize.ts"
    ],

    // Disable diagnostics
    globals: {
        "ts-jest": {
            diagnostics: false,
        }
    },

  
    // Test spec file resolution pattern
    // Matches parent folder `tests` and filename
    // should contain `test` or `spec`.
    testRegex: "(.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  
    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

    testPathIgnorePatterns: [
        "/node_modules/"
    ]

  };