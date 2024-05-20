/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2024-05-20 09:53:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Alarm\index.tsx
 */
import React, { useMemo } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import Alarm, { PageTypeEnum, AlarmProps } from './AlarmTable';
import styles from './index.less';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

const Index: React.FC<AlarmProps> = (props) => {
  const { params, isStationChild } = props;

  const { authorityMap } = useAuthority([
    'device:detail:alarm:history',
    'device:detail:alarm:current',
  ]);

  const items = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('device:detail:alarm:history')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'alarmManage.currentAlarm', defaultMessage: '当前告警' }),
        children: (
          <Alarm isStationChild={isStationChild} params={params} type={PageTypeEnum.Current} />
        ),
      });
    }
    if (authorityMap.get('device:detail:alarm:current')) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'alarmManage.historicalAlarm', defaultMessage: '历史告警' }),
        children: (
          <Alarm isStationChild={isStationChild} params={params} type={PageTypeEnum.History} />
        ),
      });
    }
    return result;
  }, [authorityMap]);

  return <Tabs className={styles.tabs} tabBarGutter={34} items={items} />;
};

export default Index;
