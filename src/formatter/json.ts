import { NestedDiffMap } from '#src/diff-generator.js';
import { Formatter } from '#src/formatter/formatter.interface.js';

export class JsonFormatter implements Formatter {
  public format(_data1: Record<string, unknown>, data2: Record<string, unknown>, _diffData: NestedDiffMap): string {
    return JSON.stringify(data2);
  }
}