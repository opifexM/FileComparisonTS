import { FormatConverter } from '#src/format-converter.js';
import { FormatType } from '#src/formatter/format.type.js';

export function startGeneration(filepath1: string, filepath2: string, format: FormatType = FormatType.stylish): string {
  const generator = new FormatConverter(filepath1, filepath2, format);
  return generator.start();
}