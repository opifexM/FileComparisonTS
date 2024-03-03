import { Parser } from '#src/parser/parser.interface.js';

export class JsonParser implements Parser {
  public parse(data: string): Record<string, unknown> {
    return JSON.parse(data);
  }
}