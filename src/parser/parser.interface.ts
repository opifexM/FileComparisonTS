export interface Parser {
  parse(data: string): Record<string, unknown>;
}