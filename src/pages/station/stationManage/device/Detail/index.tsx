/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 14:16:38
 * @LastEditTime: 2023-06-21 14:36:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\device\Detail\index.tsx
 */

import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import EmptyPage from '@/components/EmptyPage';
import styles from './index.less';

const Detail: React.FC = () => {
  const items = useMemo<TabsProps['items']>(() => {
    return [
      {
        label: '监控',
        key: '1',
      },
      {
        label: '告警',
        key: '2',
      },
      {
        label: '历史数据',
        key: '3',
      },
      {
        label: '日志',
        key: '4',
      },
      {
        label: '配置',
        key: '5',
      },
    ];
  }, []);

  return (
    <>
      <Tabs className={styles.tabs} items={items} />
      <div>
        <EmptyPage />
      </div>
    </>
  );
};

export default Detail;
