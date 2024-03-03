import { generateDiffMap } from '#src/diff-generator.js';
import { readFileData } from '#src/file-reader.js';
import { FormatType } from '#src/formatter/format.type.js';
import { Formatter } from '#src/formatter/formatter.interface.js';
import { JsonFormatter } from '#src/formatter/json.js';
import { PlainFormatter } from '#src/formatter/plain.js';
import { StylishFormatter } from '#src/formatter/stylish.js';
import { JsonParser } from '#src/parser/json-parser.js';
import { Parser } from '#src/parser/parser.interface.js';
import { ParserType } from '#src/parser/parser.type.js';
import { YamlParser } from '#src/parser/yaml-parser.js';

export class FormatConverter {
  private readonly fileName1: string;
  private readonly fileName2: string;
  private readonly fileFormatter: Formatter;
  private readonly fileParser1: Parser;
  private readonly fileParser2: Parser;

  public constructor(fileName1: string, fileName2: string, selectedFormat: FormatType) {
    this.fileName1 = fileName1;
    this.fileName2 = fileName2;

    switch (selectedFormat) {
    case FormatType.json:
      this.fileFormatter = new JsonFormatter();
      break;
    case FormatType.stylish:
      this.fileFormatter = new StylishFormatter();
      break;
    case FormatType.plain:
      this.fileFormatter = new PlainFormatter();
      break;
    default:
      throw new Error(`Unsupported format: ${selectedFormat}`);
    }

    switch (fileName1.split('.').slice(-1)[0]) {
    case ParserType.json:
      this.fileParser1 = new JsonParser();
      break;
    case ParserType.yml:
    case ParserType.yaml:
      this.fileParser1 = new YamlParser();
      break;
    default:
      throw new Error(`Incorrect file format for parse '${fileName1}'`);
    }

    switch (fileName2.split('.').slice(-1)[0]) {
    case ParserType.json:
      this.fileParser2 = new JsonParser();
      break;
    case ParserType.yml:
    case ParserType.yaml:
      this.fileParser2 = new YamlParser();
      break;
    default:
      throw new Error(`Incorrect file format for parse '${fileName2}'`);
    }
  }

  public start(): string {
    const fileData1 = readFileData(this.fileName1);
    const fileData2 = readFileData(this.fileName2);
    const parsedData1 = this.fileParser1.parse(fileData1);
    const parsedData2 = this.fileParser2.parse(fileData2);
    const diffData = generateDiffMap(parsedData1, parsedData2);

    return this.fileFormatter.format(parsedData1, parsedData2, diffData);
  }
}