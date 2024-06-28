import { formatMessage } from '@/utils';
import moment from 'moment';
import type { Dayjs } from 'dayjs';

export const defaultOptions = (series: any = []) => ({
  grid: {
    left: 10,
    top: 50,
    right: 0,
    bottom: 0,
  },
  legend: {
    show: true,
    left: 'center',
    textStyle: {
      color: '#ACCCEC',
    },
  },
  dataZoom: [
    {
      type: 'inside',
    },
  ],
  tooltip: {
    show: true,
    trigger: 'axis', // 设置为 'axis'，按轴分类展示
    axisPointer: {
      type: 'line', // 设置 axisPointer 的 type 属性为 'shadow'
    },
    backgroundColor: 'rgba(9,12,21,0.8)',
    borderColor: '#127DD0',
    textStyle: {
      color: 'white',
      fontSize: 12,
    },
    confine: true,
  },
  yAxis: [
    {
      name: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '(kWh)',
      splitLine: {
        lineStyle: {
          type: 'dashed', // 设置为虚线
          color: '#192437',
        },
      },
    },
  ],
  series,
});

export const getChartData = (data: any[], labelFiled: string, valueFiled: string) => {
  return data.map((item) => {
    return {
      label: moment(item?.[labelFiled]).format('MM-DD'),
      value: Math.floor(item?.[valueFiled] * 100) / 100,
    };
  });
};

export const getDatesInRange = (startDate: Dayjs, endDate: Dayjs) => {
  const dates = [];
  let currentDate = startDate;
  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    dates.push(currentDate.format('MM-DD'));
    currentDate = currentDate.add(1, 'day');
  }
  return dates;
};
