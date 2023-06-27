/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 18:08:53
 * @LastEditTime: 2023-06-20 10:11:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\index.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Monitor from './Monitor';
import OverviewSetting from './OverviewSetting';
import styles from '../ElectricityPrice/index.less';

const System: React.FC = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'monitor',
      label: '监测设置',
      children: <Monitor />,
    },
    {
      key: 'strategy',
      label: '概览页配置',
      children: <OverviewSetting />,
    },
  ];

  return (
    <>
      <Tabs items={tabItems} className={styles.category} tabBarGutter={24} />
    </>
  );
};

export default System;
