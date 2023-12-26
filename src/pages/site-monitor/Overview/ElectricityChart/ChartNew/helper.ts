import moment from 'moment';
import type { TimeType } from '../../components/TimeButtonGroup';
import type { ChartConfigType, ChartItemType, ChartType, Flag } from '../type';
import { TimeFormat } from './config';
import { TypeChartDataType } from '@/components/Chart/TypeChart';

export const makeDataVisibleAccordingFlag = (config: ChartConfigType[], flags: Flag[]) => {
  const configForVisible = config.map((item) => {
    const shouldIShow = flags.some(({ code, flag: show }) => {
      if (item.flag === code) {
        return show;
      }
      return false;
    });
    item.show = false;
    if (shouldIShow) {
      item.show = true;
    }
    return item;
  });
  return configForVisible;
};

const allMinute = Array.from({ length: (24 * 60) / 2 }).map((_, index) => {
  return moment()
    .startOf('day')
    .add(index * 2, 'minute')
    .format('HH:mm');
});

const getChartData = (data: ChartItemType[]): any[] => {
  const valueMap = new Map(
    data.map((item) => {
      return [moment(item?.eventTs).format('HH:mm'), item?.doubleVal];
    }),
  );

  const result: any[] = [];
  const length = allMinute.length;
  for (let i = 0; i < length; i++) {
    result.push({
      label: allMinute[i],
      value: valueMap.get(allMinute[i]),
    });
  }

  return result;
};

export const getLineChartData = (rawSourceData: ChartType, fieldConfig: ChartConfigType[]) => {
  const result: TypeChartDataType[] = [];
  for (let index = 0; index < fieldConfig.length; index++) {
    const { field, show, name } = fieldConfig[index];
    if (!show) continue;
    result.push({ name, type: 'line', data: getChartData(rawSourceData?.[field] || []) });
  }
  return result;
};

export const getBarChartData = (
  rawSourceData: ChartType,
  fieldConfig: ChartConfigType[],
  timeType: TimeType,
) => {
  const result: TypeChartDataType[] = [];
  for (let index = 0; index < fieldConfig.length; index++) {
    const arr: any = [];
    const { field, show, name } = fieldConfig[index];
    if (!show) continue;
    rawSourceData?.[field]?.forEach(({ eventTs, doubleVal }) => {
      arr.push({ label: moment(eventTs).format(TimeFormat.get(timeType)), value: doubleVal });
    });
    result.push({ name, type: 'bar', data: arr });
  }
  return result;
};
