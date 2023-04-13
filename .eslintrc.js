module.exports = {
  extends: [
    "eslint:recommended",
    // 'plugin:@typescript-eslint/recommended',
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parser: "@typescript-eslint/parser",
  // plugins: ['@typescript-eslint'],
  parserOptions: {
    project: ["tsconfig.json"],
  },
  root: true,
  ignorePatterns: [
    "app/_gql/**/*",
    "src/**/*.test.ts",
    ".*.js",
    "node_modules",
    ".cache",
    "build",
    "*config.js",
  ],
  rules: {
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        disallowTypeAnnotations: true,
        fixStyle: "inline-type-imports",
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        // ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "require-await": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/await-thenable": "error",
  },
};
