import path from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect } from 'vitest';
import { readFileData } from '../src/file-reader.js';
import { FormatType } from '../src/formatter/format.type.js';
import { startGeneration } from '../src/index.js';

function testFileFormat(inputFileName: string, fileFormat: string | undefined): void {
  const fixturesPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '__fixtures__');
  const file1 = path.join(fixturesPath, `${inputFileName}-a.json`);
  const file2 = path.join(fixturesPath, `${inputFileName}-b.json`);
  const expectedResultFile = path.join(fixturesPath, `${inputFileName}-${fileFormat}.txt`);

  const actualResult = startGeneration(file1, file2, fileFormat as FormatType);
  const expectedResult = readFileData(expectedResultFile);
  expect(actualResult).toEqual(expectedResult);
}

const fileFormatsMap = {
  stylish: [
    ['file1', 'json'],
    ['file1', 'yml'],
    ['file2', 'json'],
    ['file3', 'json']
  ],
  plain: [
    ['file2', 'json'],
    ['file3', 'json']
  ],
  json: [
    ['file2', 'json']
  ]
};

console.log(testFileFormat);
describe.each(Object.entries(fileFormatsMap))('Testing format %s', (fileFormat, inputFileNames) => {
  it.each(inputFileNames)(`Testing files with base name '%s' and format '${fileFormat}'`, baseName => {
    testFileFormat(baseName, fileFormat);
  });
});