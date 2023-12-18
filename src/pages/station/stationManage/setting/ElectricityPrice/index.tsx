import React, { useRef } from 'react';
import styles from './index.less';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import PriceMarketList from './PriceMarket';
import PricePhotovoltaicList from './PricePhotovoltaic';
import PriceChargingList from './PriceCharging';
import type { ActionType } from '@ant-design/pro-table';
import { formatMessage } from '@/utils';

const enum TabKeys {
  MARKET = 'MARKET',
  PHOTOVOLTAIC = 'PHOTOVOLTAIC',
  CHARGING = 'CHARGING',
}

const Customer: React.FC = () => {
  const chargingActionRef = useRef<ActionType>(null);
  const photovoltaicActionRef = useRef<ActionType>(null);
  const marketActionRef = useRef<ActionType>(null);
  const onChange = (activeKey: string) => {
    switch (activeKey) {
      case TabKeys.CHARGING:
        chargingActionRef.current?.reload();
        break;
      case TabKeys.MARKET:
        marketActionRef.current?.reload();
        break;
      case TabKeys.PHOTOVOLTAIC:
        photovoltaicActionRef.current?.reload();
        break;
    }
  };

  const category: TabsProps['items'] = [
    {
      label: formatMessage({
        id: 'siteManage.set.electricPriceSetting',
        defaultMessage: '市电电价设置',
      }),
      key: TabKeys.MARKET,
      children: <PriceMarketList actionRef={marketActionRef} />,
    },
    {
      label: formatMessage({
        id: 'siteManage.set.pvGridElectricityPriceSetting',
        defaultMessage: '光伏上网电价设置',
      }),
      key: TabKeys.PHOTOVOLTAIC,
      children: <PricePhotovoltaicList actionRef={photovoltaicActionRef} />,
    },
    {
      label: formatMessage({
        id: 'siteManage.set.chargePileChargingSettings',
        defaultMessage: '充电桩计费设置',
      }),
      key: TabKeys.CHARGING,
      children: <PriceChargingList actionRef={chargingActionRef} />,
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey={TabKeys.MARKET}
        onChange={onChange}
        className={styles.category}
        tabBarGutter={24}
        items={category}
      />
    </>
  );
};

export default Customer;
