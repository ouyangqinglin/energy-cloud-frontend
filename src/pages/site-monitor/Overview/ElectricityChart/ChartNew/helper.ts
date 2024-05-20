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

export const getLineChartData = (rawSourceData: ChartType, fieldConfig: ChartConfigType[]) => {
  const result: TypeChartDataType[] = [];
  for (let index = 0; index < fieldConfig.length; index++) {
    const { field, show, name, color, unit } = fieldConfig[index];
    if (!show) continue;
    result.push({
      name,
      type: 'line',
      data: (rawSourceData?.[field]?.data || []).map((item) => {
        return {
          label: item.eventTs,
          value: item.doubleVal,
        };
      }),
      color,
      unit,
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
      arr.push({ label: eventTs, value: doubleVal });
    });
    result.push({
      name,
      type: 'bar',
      barMaxWidth: 25,
      data: arr,
      color,
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
