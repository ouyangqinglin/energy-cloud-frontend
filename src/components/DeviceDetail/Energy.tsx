/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:28:42
 * @LastEditTime: 2023-06-27 15:27:03
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Energy.tsx
 */

import React, { useMemo } from 'react';
import { Tabs, Empty } from 'antd';
import EmptyPage from '../EmptyPage';
import type { TabsProps } from 'antd';
import Alarm from '@/components/Alarm';
import LogTable from '@/components/LogTable';
import { getLogs } from '@/services/equipment';
import styles from './index.less';
import { DeviceDetailType } from './config';

const Energy: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: '实时数据',
        key: '1',
        children: (
          <>
            <EmptyPage />
          </>
        ),
      },
      {
        label: '历史数据',
        key: '2',
      },
      {
        label: '告警',
        key: '3',
        children: <Alarm params={{ id }} />,
      },
      {
        label: '日志',
        key: '4',
        children: <LogTable params={{ id }} request={getLogs} />,
      },
      {
        label: '配置',
        key: '5',
        children: <EmptyPage />,
      },
    ];
  }, [id]);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
    </>
  );
};

export default Energy;
