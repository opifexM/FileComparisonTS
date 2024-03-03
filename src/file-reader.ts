import * as fs from 'fs';
import path from 'path';

export function readFileData(filePath: string): string {
  try {
    const finalPath = path.resolve(filePath);
    return fs.readFileSync(finalPath, 'utf8').trim();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error reading file at ${filePath}: ${error.message}`);
      throw error;
    } else {
      throw new Error(`An unknown error occurred while reading file at '${filePath}'.`);
    }
  }
}