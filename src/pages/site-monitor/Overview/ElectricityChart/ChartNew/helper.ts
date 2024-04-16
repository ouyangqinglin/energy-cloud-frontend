import moment from 'moment';
import type { TimeType } from '../../components/TimeButtonGroup';
import type { ChartConfigType, ChartItemType, ChartType, TotalConfigType } from '../type';
import { TimeFormat } from './config';
import { TypeChartDataType } from '@/components/Chart/TypeChart';

export const makeDataVisibleAccordingFlag = (
  config: ChartConfigType[],
  powerData: any,
  shouldShowLine: boolean,
) => {
  const configForVisible = config.map((item) => {
    let shouldIShow = powerData?.[item.field]?.flag;
    //收益除了日，其他一直都有
    if (item.field == 'gain' && shouldShowLine) {
      shouldIShow = false;
    }
    item.show = shouldIShow;
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
    const { field, show, name, color } = fieldConfig[index];
    if (!show) continue;
    result.push({
      name,
      type: 'line',
      data: getChartData(rawSourceData?.[field]?.data || []),
      itemStyle: { color },
    });
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
    const { field, show, name, color, unit } = fieldConfig[index];
    if (!show) continue;
    rawSourceData?.[field]?.data?.forEach(({ eventTs, doubleVal }) => {
      arr.push({ label: moment(eventTs).format(TimeFormat.get(timeType)), value: doubleVal });
    });
    result.push({
      name,
      type: 'bar',
      barMaxWidth: 25,
      data: arr,
      itemStyle: { color },
      total: rawSourceData?.[field]?.total || '--',
      unit,
    });
  }
  return result;
};

export const getTotalData = (totalMap: TotalConfigType[], rawSourceData: any) => {
  return totalMap.map((item: any) => {
    item.value = rawSourceData[item.field] || '--';
    return item;
  });
};
