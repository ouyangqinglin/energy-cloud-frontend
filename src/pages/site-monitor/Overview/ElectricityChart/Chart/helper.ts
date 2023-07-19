import moment from 'moment';
import { TimeType } from '../../components/TimeButtonGroup';

type DataType = {
  time: string;
  value: number | undefined;
  field: string;
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
  ['me', '市电'],
  ['pv', '光伏'],
  ['es', '储能'],
  ['cs', '充电桩'],
  ['load', '其他负载'],
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

export const getLineChartData = (
  rawSourceData: Record<string, ChartDataType[]>,
  showLineRange: string[],
) => {
  const result: DataType[] = [];
  lineLegendMap.forEach((item, key) => {
    if (!showLineRange.includes(key)) {
      return;
    }
    const formatValues = getChartData(rawSourceData?.[key] || [], item);
    result.push(...formatValues);
  });
  return result;
};

export const barLegendMap = new Map([
  ['charge', '充电量'],
  ['discharge', '放电量'],
  ['selfUse', '自发自用电量'],
  ['pvPowerGeneration', '光伏发电量'],
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
  barLegendMap.forEach((field, key) => {
    const transformData =
      rawSourceData?.[key]?.map(({ eventTs, doubleVal }) => {
        return {
          time: moment(eventTs).format(TimeFormat.get(timeType)),
          value: doubleVal,
          field,
        };
      }) ?? [];
    console.log(rawSourceData, transformData);
    result.push(...transformData);
  });
  return result;
};
