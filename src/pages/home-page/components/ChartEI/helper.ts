import { TimeType } from '@/components/TimeButtonGroup';
import moment from 'moment';

type DataType = {
  time: string;
  value?: number | undefined;
  field: string;
  total?: number | undefined;
};

type ChartDataType = {
  eventTs: string;
  doubleVal: number;
};
const allMinute = Array.from({ length: (24 * 60) / 10 }).map((_, index) => {
  return moment()
    .startOf('day')
    .add(index * 10, 'minute')
    .format('HH:mm');
});

export const lineLegendMap = new Map([
  ['pvIncome', '当日光伏收益(元)'],
  ['esIncome', '当日储能收益(元)'],
  ['income', '当日收益(元)'],
]);

const getChartData = (data: ChartDataType[], field: string): DataType[] => {
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

export const getLineChartData = (rawSourceData: Record<string, ChartDataType[]>) => {
  const result: DataType[] = [];
  lineLegendMap.forEach((item, key) => {
    result.push(...getChartData(rawSourceData?.[key] || [], item));
  });
  return result;
};

export const barLegendMap = new Map([
  ['pvIncome', '当日光伏收益(元)'],
  ['esIncome', '当日储能收益(元)'],
  ['income', '当日收益(元)'],
]);

export const yearBarLegendMap = new Map([
  ['pvIncome', '月光伏收益(元)'],
  ['esIncome', '月储能收益(元)'],
  ['income', '月收益(元)'],
]);

export const totalBarLegendMap = new Map([
  ['pvIncome', '年光伏收益(元)'],
  ['esIncome', '年储能收益(元)'],
  ['income', '年收益(元)'],
]);

export const TimeFormat = new Map([
  [TimeType.MONTH, 'YYYY-MM-DD'],
  [TimeType.YEAR, 'YYYY-MM'],
  [TimeType.TOTAL, 'YYYY'],
]);

export const getBarChartData = (
  rawSourceData: Record<string, ChartDataType[]>,
  timeType: TimeType,
) => {
  const result: DataType[] = [];
  const legendMap = () => {
    if (timeType === TimeType.YEAR) {
      return yearBarLegendMap;
    }
    if (timeType === TimeType.TOTAL) {
      return totalBarLegendMap;
    }
    return barLegendMap;
  };
  legendMap().forEach((field, key) => {
    const transformData =
      rawSourceData?.[key]?.map(({ eventTs, doubleVal }) => {
        const valueObj = key === 'income' ? { total: doubleVal } : { value: doubleVal };
        return {
          time: moment(eventTs).format(TimeFormat.get(timeType)),
          field,
          ...valueObj,
        };
      }) ?? [];
    result.push(...transformData);
  });
  return result;
};
