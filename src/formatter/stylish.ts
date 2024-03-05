import _ from 'lodash';

import { DiffValue, NestedDiffMap } from '#src/diff-generator.js';
import { Formatter } from '#src/formatter/formatter.interface.js';

export class StylishFormatter implements Formatter {
  private readonly SPACE_INCREMENT = 4;

  public format(data1: Record<string, unknown>, data2: Record<string, unknown>, diffData: NestedDiffMap): string {
    return this.addStartEndStylish(this.addLineStylish(data1, data2, diffData)).trim();
  }

  private addStartEndStylish(diffReport: string): string {
    return `{\n${diffReport}}`;
  }

  private getFormatObject(obj: unknown, spaceNumber: number = 0): string {
    if (!_.isObject(obj)) {
      return `${obj}\n`;
    }

    const space = ' '.repeat(spaceNumber);
    const innerSpace = ' '.repeat(spaceNumber + this.SPACE_INCREMENT);
    const entries = Object.entries(obj as Record<string, unknown>);
    const diffReport = entries.reduce((acc: string[], [key, value]) => {
      if (_.isObject(value) && !Array.isArray(value)) {
        return [...acc, `${innerSpace}    ${key}: ${this.getFormatObject(value, spaceNumber + this.SPACE_INCREMENT)}`];
      }
      return [...acc, `${innerSpace}    ${key}: ${value}\n`];
    }, []);
    return ['{\n', ...diffReport, `${space}    }\n`].join('');
  }

  private addLineStylish(
    data1: Record<string, unknown>,
    data2: Record<string, unknown>,
    diffData: NestedDiffMap,
    spaceNumber: number = 0
  ): string {
    const space = ' '.repeat(spaceNumber);
    const innerSpace = ' '.repeat(spaceNumber + this.SPACE_INCREMENT);

    const diffReport = Array.from(diffData.entries()).reduce((acc, [diffKey, diffValue]) => {
      const value1 = data1[diffKey];
      const value2 = data2[diffKey];

      switch (diffValue) {
      case DiffValue.Deleted:
        return [...acc, `${space}  - ${diffKey}: ${this.getFormatObject(value1, spaceNumber)}`];
      case DiffValue.Added:
        return [...acc, `${space}  + ${diffKey}: ${this.getFormatObject(value2, spaceNumber)}`];
      case DiffValue.Unchanged:
        return [...acc, `${space}    ${diffKey}: ${this.getFormatObject(value1, spaceNumber)}`];
      case DiffValue.Changed:
        return [
          ...acc,
          `${space}  - ${diffKey}: ${this.getFormatObject(value1, spaceNumber)}`,
          `${space}  + ${diffKey}: ${this.getFormatObject(value2, spaceNumber)}`
        ];
      default:
        if (diffValue instanceof Map) {
          const nestedLines = this.addLineStylish(value1 as Record<string, unknown>, value2 as Record<string, unknown>, diffValue, spaceNumber + this.SPACE_INCREMENT);
          return [
            ...acc,
            `${innerSpace}${diffKey}: {\n${nestedLines}${innerSpace}}\n`
          ];
        }
      }
      return acc;
    }, [] as string[]);

    return diffReport.join('');
  }
}