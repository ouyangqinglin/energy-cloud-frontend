import { formatMessage } from '@/utils';

export const defaultOptions = (series: any = []) => ({
  grid: {
    left: 0,
    top: 50,
    right: 0,
    bottom: 0,
  },
  legend: {
    show: true,
    left: '35%',
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
      name: formatMessage({ id: 'common.power', defaultMessage: '功率' }) + '(KW)',
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
