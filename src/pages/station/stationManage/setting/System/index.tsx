/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 18:08:53
 * @LastEditTime: 2023-12-21 11:49:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\index.tsx
 */
import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Monitor from './Monitor';
import OverviewSetting from './OverviewSetting';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

const System: React.FC = () => {
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:runManage:monitorSetting',
    'siteManage:siteConfig:runManage:overviewSetting',
  ]);

  const tabItems = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('siteManage:siteConfig:runManage:monitorSetting')) {
      result.push({
        key: 'monitor',
        label: formatMessage({ id: 'siteManage.set.monitorSetup', defaultMessage: '监测设置' }),
        children: <Monitor />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:runManage:overviewSetting')) {
      result.push({
        key: 'strategy',
        label: formatMessage({
          id: 'siteManage.set.largeScreenConfig',
          defaultMessage: '大屏配置',
        }),
        children: <OverviewSetting />,
      });
    }
    return result;
  }, [authorityMap]);

  return (
    <>
      <Tabs items={tabItems} className="category-tabs" tabBarGutter={24} />
    </>
  );
};

export default System;
