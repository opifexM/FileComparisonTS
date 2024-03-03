import yaml from 'js-yaml';

import { Parser } from '#src/parser/parser.interface.js';

export class YamlParser implements Parser {
  public parse(data: string): Record<string, unknown> {
    try {
      return yaml.load(data) as Record<string, unknown>;
    } catch (error) {
      throw new Error('Failed to parse the YAML data.');
    }
  }
}