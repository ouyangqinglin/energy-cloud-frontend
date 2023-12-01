/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 18:08:53
 * @LastEditTime: 2023-08-22 13:33:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\index.tsx
 */
import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Monitor from './Monitor';
import OverviewSetting from './OverviewSetting';
import {formatMessage} from "@/utils";

const System: React.FC = () => {
  const tabItems: TabsProps['items'] = [
    {
      key: 'monitor',
      label: formatMessage({ id: 'siteManage.set.monitorSetup', defaultMessage: '监测设置' }),
      children: <Monitor />,
    },
    {
      key: 'strategy',
      label: formatMessage({ id: 'siteManage.set.largeScreenConfig', defaultMessage: '大屏配置' }),
      children: <OverviewSetting />,
    },
  ];

  return (
    <>
      <Tabs items={tabItems} className="category-tabs" tabBarGutter={24} />
    </>
  );
};

export default System;
