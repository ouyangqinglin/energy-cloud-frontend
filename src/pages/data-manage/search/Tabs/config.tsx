/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-06-25 15:18:26
 * @LastEditTime: 2024-06-26 17:40:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\data-manage\search\Tabs\config.tsx
 */

import { YTCellOneOutlined, YTCellTwoOutlined, YTCellFourOutlined } from '@/components/YTIcons';
import { formatMessage } from '@/utils';

export const layoutConfig = [
  {
    title: formatMessage({ id: 'dataManage.1045', defaultMessage: '一宫格' }),
    value: 1,
    icon: <YTCellOneOutlined />,
  },
  {
    title: formatMessage({ id: 'dataManage.1046', defaultMessage: '二宫格' }),
    value: 2,
    icon: <YTCellTwoOutlined />,
  },
  {
    title: formatMessage({ id: 'dataManage.1047', defaultMessage: '四宫格' }),
    value: 4,
    icon: <YTCellFourOutlined />,
  },
];
