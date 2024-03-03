import { NestedDiffMap } from '#src/diff-generator.js';

export interface Formatter {
  format(data1: Record<string, unknown>, data2: Record<string, unknown>, diffData: NestedDiffMap): string;
}