/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: "./output/code-coverage",
  reporters: ["default", "./node_modules/jest-html-reporter"]
}