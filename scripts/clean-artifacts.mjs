import { rimraf } from 'rimraf';

const pathsToClean = ['test-results', 'playwright-report', 'blob-report', 'artifacts'];

await Promise.all(pathsToClean.map((path) => rimraf(path)));
