/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-25 15:18:26
 * @LastEditTime: 2024-06-25 15:18:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\Tabs\config.ts
 */

import { YTCellOneOutlined, YTCellTwoOutlined, YTCellFourOutlined } from '@/components/YTIcons';
import { formatMessage } from '@/utils';

export const layoutConfig = [
  {
    title: formatMessage({ id: 'dataManage.1018', defaultMessage: '一宫格' }),
    value: 1,
    icon: <YTCellOneOutlined />,
  },
  {
    title: formatMessage({ id: 'dataManage.1019', defaultMessage: '二宫格' }),
    value: 2,
    icon: <YTCellTwoOutlined />,
  },
  {
    title: formatMessage({ id: 'dataManage.1020', defaultMessage: '四宫格' }),
    value: 4,
    icon: <YTCellFourOutlined />,
  },
];
