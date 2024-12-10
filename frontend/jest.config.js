// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// export default {
//   preset: 'ts-jest/presets/default-esm',
//   testEnvironment: 'jsdom',
//   setupFilesAfterEnv: ['./src/setupTests.ts'],
//   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
//   modulePaths: ['<rootDir>'],
//   testMatch: [
//     '<rootDir>/src/**/*.test.js',
//     '<rootDir>/src/**/*.test.jsx',
//     '<rootDir>/src/**/*.test.ts',
//     '<rootDir>/src/**/*.test.tsx',
//   ],
// };

export {};
export default {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },

  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],

  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
