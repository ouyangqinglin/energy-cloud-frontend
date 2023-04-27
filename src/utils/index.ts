export function arrayToMap(array: any[], key = 'value', value = 'label') {
  const map = {};
  array.forEach((item) => {
    map['' + item[key]] = item[value];
  });
  return map;
}

export const isEmpty = (value: any) => {
  return value === null || value === undefined || value === '';
};

export const getValue = (value: any, unit = '') => {
  return isEmpty(value) ? '' : value + unit;
};
