import { FormatType } from '#src/formatter/format.type.js';
import { startGeneration } from '#src/index.js';
import { test, expect, describe } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileData } from '#src/file-reader.js';

function testFileFormat(inputFileName: string, fileFormat: string | undefined) {
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
    ['file3', 'json'],
  ],
  plain: [
    ['file2', 'json'],
    ['file3', 'json'],
  ],
  json: [
    ['file2', 'json'],
  ],
};

describe.each(Object.entries(fileFormatsMap))(
  'Testing format %s',
  (fileFormat, inputFileName) => {
    test.each(inputFileName)(
      `Testing files with base name '%s' and format '${fileFormat}'`,
      (baseName) => testFileFormat(baseName, fileFormat),
    );
  },
);
