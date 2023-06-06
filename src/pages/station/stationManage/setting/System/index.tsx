/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 18:08:53
 * @LastEditTime: 2023-06-01 18:20:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\index.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Monitor from './Monitor';
import styles from '../ElectricityPrice/index.less';

const System: React.FC = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'monitor',
      label: '监测设置',
      children: <Monitor />,
    },
  ];

  return (
    <>
      <Tabs
        activeKey="monitor"
        items={tabItems}
        tabBarExtraContent={{ left: <strong style={{ paddingRight: 16 }}>所属类目：</strong> }}
        className={styles.category}
        tabBarGutter={24}
      />
    </>
  );
};

export default System;
