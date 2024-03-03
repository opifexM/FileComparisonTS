import _ from 'lodash';

import { DiffValue, NestedDiffMap } from '#src/diff-generator.js';
import { Formatter } from '#src/formatter/formatter.interface.js';

export class PlainFormatter implements Formatter {
  public format(data1: Record<string, unknown>, data2: Record<string, unknown>, diffData: NestedDiffMap): string {
    return this.addLinePlain(data1, data2, diffData).trim();
  }

  private getKeyWithParent(parent: string, key: string): string {
    return (parent.length > 0) ? `${parent}.${key}` : key;
  }

  private getFormatObject(obj: unknown): string {
    if (_.isObject(obj) && !_.isDate(obj)) {
      return '[complex value]';
    }
    if (_.isString(obj)) {
      return `'${obj}'`;
    }
    return String(obj);
  }

  private addLinePlain(
    data1: Record<string, unknown>,
    data2: Record<string, unknown>,
    diffData: NestedDiffMap,
    parent: string = ''
  ): string {
    return Array.from(diffData.entries()).reduce((acc: string[], [diffKey, diffValue]): string[] => {
      const value1 = data1[diffKey];
      const value2 = data2[diffKey];

      switch (diffValue) {
      case DiffValue.Deleted:
        return [...acc, `Property '${this.getKeyWithParent(parent, diffKey)}' was removed\n`];
      case DiffValue.Added:
        return [...acc, `Property '${this.getKeyWithParent(parent, diffKey)}' was added with value: ${this.getFormatObject(value2)}\n`];
      case DiffValue.Changed:
        return [...acc, `Property '${this.getKeyWithParent(parent, diffKey)}' was updated. From ${this.getFormatObject(value1)} to ${this.getFormatObject(value2)}\n`];
      default:
        if (diffValue instanceof Map) {
          return [...acc, this.addLinePlain(value1 as Record<string, unknown>, value2 as Record<string, unknown>, diffValue, this.getKeyWithParent(parent, diffKey))];
        }
        return acc;
      }
    }, []).join('');
  }
}