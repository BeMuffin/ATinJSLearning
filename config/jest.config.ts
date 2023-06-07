import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  maxConcurrency: 5,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['../..'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.test\\.js$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testTimeout: 60000,
};

export default config;
