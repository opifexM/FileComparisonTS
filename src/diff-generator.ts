import _ from 'lodash';

export enum DiffValue {
  Deleted = 'deleted',
  Added = 'added',
  Unchanged = 'unchanged',
  Changed = 'changed',
}

// eslint-disable-next-line no-use-before-define
export type NestedDiffMapValue = DiffValue | NestedDiffMap;
export type NestedDiffMap = Map<string, NestedDiffMapValue>;

export const generateDiffMap = (data1: Record<string, unknown>, data2: Record<string, unknown>): NestedDiffMap => {
  const uniqueKeys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  return uniqueKeys.reduce((map: NestedDiffMap, key) => {
    const hasInData1 = _.has(data1, key);
    const hasInData2 = _.has(data2, key);
    if (hasInData1 && !hasInData2) {
      map.set(key, DiffValue.Deleted);
      return map;
    }

    if (!hasInData1 && hasInData2) {
      map.set(key, DiffValue.Added);
      return map;
    }

    const value1 = _.get(data1, key, '');
    const value2 = _.get(data2, key, '');
    if (_.isEqual(value1, value2)) {
      map.set(key, DiffValue.Unchanged);
      return map;
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      map.set(key, generateDiffMap(value1 as Record<string, unknown>, value2 as Record<string, unknown>));
      return map;
    }

    map.set(key, DiffValue.Changed);
    return map;
  }, new Map<string, NestedDiffMapValue>());
};