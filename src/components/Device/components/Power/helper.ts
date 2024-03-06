/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-03-05 14:51:12
 * @LastEditTime: 2024-03-05 15:31:41
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\components\Power\helper.ts
 */

import { formatMessage } from '@/utils';

export const options = {
  grid: {
    left: 0,
    top: 30,
    right: 20,
    bottom: 30,
  },
  dataZoom: [
    {
      type: 'inside',
    },
    {
      start: 0,
      end: 100,
      height: 15,
      bottom: 10,
    },
  ],
  yAxis: {
    name: formatMessage({ id: 'common.unit', defaultMessage: '单位' }) + '（kW）',
    nameTextStyle: {
      align: 'left',
    },
  },
  series: [
    {
      type: 'line',
    },
  ],
};
