/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-01 11:28:24
 * @LastEditTime: 2023-08-01 14:24:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Chart\Line\config.ts
 */
import moment, { Moment } from 'moment';
import { chartTypeEnum } from '../config';

const getAllMinute = (step = 2) => {
  return Array.from({ length: (24 * 60) / step }).map((_, index) => {
    return moment()
      .startOf('day')
      .add(index * step, 'minute')
      .format('HH:mm');
  });
};

const getAllDay = (date: Moment) => {
  return Array.from({ length: moment(date).daysInMonth() }).map((_, index) => {
    return index + 1 + '';
  });
};

const getAllMonth = () => {
  return Array.from({ length: 12 }).map((_, index) => {
    return index + 1 + '';
  });
};

export const typeMap = new Map([
  [chartTypeEnum.Day, { format: 'HH:mm', fun: getAllMinute }],
  [chartTypeEnum.Month, { format: 'D', fun: getAllDay }],
  [chartTypeEnum.Year, { format: 'M', fun: getAllMonth }],
]);
