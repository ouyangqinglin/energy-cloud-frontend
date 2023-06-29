/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-06-27 17:44:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Alarm from './AlarmTable';

type AlarmType = {
  isStationChild?: boolean;
  params?: {
    id?: string;
  };
};

const Index: React.FC<AlarmType> = (props) => {
  const { params, isStationChild } = props;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `当前告警`,
      children: <Alarm isStationChild={isStationChild} />,
    },
    {
      key: '2',
      label: `历史告警`,
      children: <Alarm isStationChild={isStationChild} />,
    },
  ];

  return <Tabs className="page-tabs" tabBarGutter={34} items={items} />;
};

export default Index;
