import Detail from '@/components/Detail';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.less';
import { useMemo } from 'react';
import { formatMessage } from '@/utils';

const EVChargerOrderInfo = () => {
  const tabItems = useMemo<TabsProps['items']>(() => {
    return [
      {
        key: 'run',
        label: formatMessage({ id: 'device.todayOrder', defaultMessage: '今日订单' }),
      },
      {
        key: 'control',
        label: formatMessage({ id: 'device.historyOrder', defaultMessage: '历史订单' }),
      },
    ];
  }, []);

  const onTabChange = (value: string) => {
    console.log('value>>', value);
  };
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.orderInformation', defaultMessage: '订单信息' })}
        className="mt16"
      />
      <Tabs className={styles.tabs} items={tabItems} onChange={onTabChange} />
    </div>
  );
};
export default EVChargerOrderInfo;
