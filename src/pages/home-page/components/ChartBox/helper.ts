import { TimeType } from '@/components/TimeButtonGroup';
import moment from 'moment';
import type { ChartItem, ChartPowerItem } from './type';

export type DataType = {
  time: string;
  value?: number | undefined;
  total?: number | undefined;
  field: string;
};

export const allMinute = Array.from({ length: (24 * 60) / 10 }).map((_, index) => {
  return moment()
    .startOf('day')
    .add(index * 10, 'minute')
    .format('HH:mm');
});

const DEFAULT_FIELD_MAP = {
  time: 'eventTs',
  value: 'doubleVal',
};

export const getChartData = (
  data: ChartPowerItem | ChartItem[],
  field: string,
  fieldMap = DEFAULT_FIELD_MAP,
  valueResField = 'value',
): DataType[] => {
  const valueMap = new Map(
    data.map((item) => {
      return [moment(item[fieldMap.time]).format('HH:mm'), item[fieldMap.value]];
    }),
  );
  const result: DataType[] = [];
  const length = allMinute.length;
  for (let i = 0; i < length; i++) {
    result.push({
      time: allMinute[i],
      [valueResField]: valueMap.get(allMinute[i]),
      field,
    });
  }

  return result;
};

export const getLineChartData = (
  lineLegendMap: any,
  rawSourceData: Record<string, ChartPowerItem[]>,
) => {
  const result: DataType[] = [];
  lineLegendMap.forEach((item, key) => {
    result.push(...getChartData(rawSourceData?.[key] || [], item));
  });
  return result;
};

export const TimeFormat = new Map([
  [TimeType.MONTH, 'YYYY-MM-DD'],
  [TimeType.YEAR, 'YYYY-MM'],
  [TimeType.TOTAL, 'YYYY'],
  [TimeType.DAY, 'HH:mm'],
]);

export const getBarChartData = (
  barLegendMap: any,
  rawSourceData: Record<string, ChartItem[]>,
  timeType: TimeType,
) => {
  const result: DataType[] = [];
  barLegendMap.forEach((field, key) => {
    const transformData =
      rawSourceData?.[key]?.map(({ timeDimension, electricity }) => {
        return {
          time: moment(timeDimension).format(TimeFormat.get(timeType)),
          value: electricity,
          field,
        };
      }) ?? [];
    result.push(...transformData);
  });
  return result;
};
