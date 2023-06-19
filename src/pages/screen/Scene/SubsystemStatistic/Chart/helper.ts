import dayjs from 'dayjs';
import { isEmpty, isNumber, sortBy } from 'lodash';
import type { ChartData, ChartRes } from './type';

export const convertToData = (arr: ChartRes) => {
  if (isEmpty(arr)) {
    return [];
  }
  return arr.map((item) => {
    const date = dayjs(item.ts).format('MM-DD');
    const value = Math.floor(item.value * 100) / 100;

    return {
      date,
      value,
      field: item.field ?? '',
    };
  });
};

export const sortedData = (sourceData: ChartData) => sortBy(sourceData, (o) => o.date);
