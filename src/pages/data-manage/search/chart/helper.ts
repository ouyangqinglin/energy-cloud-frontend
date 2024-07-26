/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-04 11:18:13
 * @LastEditTime: 2024-07-26 14:52:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\chart\helper.ts
 */

export const defaultOptions = {
  backgroundColor: 'white',
  grid: {
    top: 40,
    right: 40,
    bottom: 70,
    left: 50,
  },
  legend: {
    type: 'scroll',
    top: 'bottom',
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      start: 0,
      end: 100,
      height: 15,
      bottom: 50,
    },
  ],
  xAxis: {
    axisLabel: {
      formatter: (value: string) => {
        return value.replace(' ', '\n');
      },
    },
  },
  series: [],
};
