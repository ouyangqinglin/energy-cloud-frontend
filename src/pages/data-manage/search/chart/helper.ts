/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-04 11:18:13
 * @LastEditTime: 2024-07-25 09:35:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\chart\helper.ts
 */

export const defaultOptions = {
  backgroundColor: 'white',
  grid: {
    left: 50,
    top: 10,
    right: 40,
    bottom: 70,
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
