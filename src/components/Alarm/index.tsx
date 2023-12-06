/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-07-04 10:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Alarm, { PageTypeEnum, AlarmProps } from './AlarmTable';
import styles from './index.less';
import { formatMessage } from '@/utils';

const Index: React.FC<AlarmProps> = (props) => {
  const { params, isStationChild } = props;

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: formatMessage({ id: 'alarmManage.currentAlarm', defaultMessage: '当前告警' }),
      children: (
        <Alarm isStationChild={isStationChild} params={params} type={PageTypeEnum.Current} />
      ),
    },
    {
      key: '2',
      label: formatMessage({ id: 'alarmManage.historicalAlarm', defaultMessage: '历史告警' }),
      children: (
        <Alarm isStationChild={isStationChild} params={params} type={PageTypeEnum.History} />
      ),
    },
  ];

  return <Tabs className={styles.tabs} tabBarGutter={34} items={items} />;
};

export default Index;
