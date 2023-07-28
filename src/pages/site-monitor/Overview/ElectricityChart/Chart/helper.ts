import moment from 'moment';
import type { TimeType } from '../../components/TimeButtonGroup';
import type { ChartConfigType, ChartItemType, ChartType, DataType, Flag } from '../type';
import { TimeFormat } from './config';

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

const getChartData = (data: ChartItemType[], field: string): DataType[] => {
  const valueMap = new Map(
    data.map((item) => {
      return [moment(item?.eventTs).format('HH:mm'), item?.doubleVal];
    }),
  );

  const result: DataType[] = [];
  const length = allMinute.length;
  for (let i = 0; i < length; i++) {
    result.push({
      time: allMinute[i],
      value: valueMap.get(allMinute[i]),
      field,
    });
  }

  return result;
};

export const getLineChartData = (rawSourceData: ChartType, fieldConfig: ChartConfigType[]) => {
  const result: DataType[] = [];
  fieldConfig.forEach(({ show, field, name }) => {
    if (!show) {
      return;
    }
    const formatValues = getChartData(rawSourceData?.[field] || [], name);
    result.push(...formatValues);
  });
  return result;
};

export const getBarChartData = (
  rawSourceData: ChartType,
  fieldConfig: ChartConfigType[],
  timeType: TimeType,
) => {
  const result: DataType[] = [];
  fieldConfig.forEach(({ field, show, name }) => {
    if (!show) {
      return;
    }
    const transformData =
      rawSourceData?.[field]?.map(({ eventTs, doubleVal }) => {
        return {
          time: moment(eventTs).format(TimeFormat.get(timeType)),
          value: doubleVal,
          field: name,
        };
      }) ?? [];
    result.push(...transformData);
  });
  return result;
};
