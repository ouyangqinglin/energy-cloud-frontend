import { formatMessage } from '@/utils';

/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-06 15:45:35
 * @LastEditTime: 2024-01-06 15:45:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\module\BmuTabs\helper.ts
 */
export const chartOptions = {
  grid: {
    bottom: 50,
  },
  legend: {
    icon: 'rect',
  },
  tooltip: {
    formatter: (params: any) => {
      const { value, name } = (params || {})[0];
      return name + '：' + (value[1] === '' ? value[2] + '℃' : value[1] + 'V');
    },
  },
  xAxis: {
    triggerEvent: true,
  },
  yAxis: [
    {
      name: formatMessage({ id: 'siteMonitor.voltage', defaultMessage: '电压' }) + '(V)',
      alignTicks: true,
    },
    {
      name: formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }) + '(℃)',
    },
  ],
  series: [
    {
      type: 'bar',
      barMaxWidth: 10,
      stack: 'Total',
      itemStyle: {
        color: 'rgba(0, 125, 255, 1)',
      },
    },
    {
      type: 'bar',
      yAxisIndex: 1,
      barMaxWidth: 10,
      stack: 'Total',
      itemStyle: {
        color: 'rgba(61, 213, 152, 1)',
      },
    },
  ],
  dataZoom: [
    {
      type: 'inside',
    },
    {
      start: 0,
      end: 100,
      height: 15,
    },
  ],
};

export const getFieldByLabel = (label: string) => {
  const num = label
    .replace(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' }), '')
    .replace(formatMessage({ id: 'siteMonitor.temperature', defaultMessage: '温度' }), '');
  const field =
    label.indexOf(formatMessage({ id: 'siteMonitor.cell', defaultMessage: '电芯' })) > -1
      ? 'Voltage'
      : 'Temperature';
  return field + num;
};
