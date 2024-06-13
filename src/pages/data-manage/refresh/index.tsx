import React, { useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useAuthority } from '@/hooks';
import { formatMessage } from '@/utils';
import Income from './Income';
import Power from './Power';
import RectData from './RectData';

type RefreshtProps = {};

const Refresh: React.FC<RefreshtProps> = () => {
  const { authorityMap } = useAuthority([
    'oss:dataStatistics:refresh:rect',
    'oss:dataStatistics:refresh:power',
    'oss:dataStatistics:refresh:income',
  ]);
  const items = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('oss:dataStatistics:refresh:rect')) {
      result.push({
        key: '0',
        label: formatMessage({ id: 'dataManage.1003', defaultMessage: '矩形数据同步' }),
        children: <RectData />,
      });
    }
    if (authorityMap.get('oss:dataStatistics:refresh:power')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'dataManage.1004', defaultMessage: '功率刷新' }),
        children: <Power />,
      });
    }
    if (authorityMap.get('oss:dataStatistics:refresh:rect')) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'dataManage.1005', defaultMessage: '电量收益刷新' }),
        children: <Income />,
      });
    }
    return result;
  }, [authorityMap]);
  return (
    <>
      <Tabs className="category-tabs p20" tabBarGutter={34} defaultActiveKey="1" items={items} />
    </>
  );
};

export default Refresh;
