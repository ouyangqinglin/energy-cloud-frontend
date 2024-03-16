import React, { useMemo, useRef } from 'react';
import styles from './index.less';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import { useLocation } from 'umi';
import PriceMarketList from './PriceMarket';
import PricePhotovoltaicList from './PricePhotovoltaic';
import PriceChargingList from './PriceCharging';
import type { ActionType } from '@ant-design/pro-table';
import { formatMessage } from '@/utils';
import type { LocationType } from '@/types';
import { useAuthority } from '@/hooks';
import { SiteTypeEnum } from '@/utils/dict';

const enum TabKeys {
  MARKET = 'MARKET',
  PHOTOVOLTAIC = 'PHOTOVOLTAIC',
  ESS = 'ESS',
  CHARGING = 'CHARGING',
}

const Customer: React.FC = () => {
  const location = useLocation<LocationType>();
  const siteType = (location as LocationType).query?.siteType;
  const chargingActionRef = useRef<ActionType>(null);
  const photovoltaicActionRef = useRef<ActionType>(null);
  const ESSActionRef = useRef<ActionType>(null);
  const marketActionRef = useRef<ActionType>(null);
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:electricPriceManage:electric',
    'siteManage:siteConfig:electricPriceManage:pv',
    'siteManage:siteConfig:electricPriceManage:ESS',
    'siteManage:siteConfig:electricPriceManage:charge',
  ]);

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
      case TabKeys.ESS:
        ESSActionRef.current?.reload();
        break;
    }
  };

  const category = useMemo(() => {
    const result: TabsProps['items'] = [];
    const isShowESSTab = [
      SiteTypeEnum.ES,
      SiteTypeEnum.PV_ES,
      SiteTypeEnum.ES_CS,
      SiteTypeEnum.PV_ES_CS,
    ].includes(Number(siteType));
    const isShowPVTab = [
      SiteTypeEnum.PV,
      SiteTypeEnum.PV_ES,
      SiteTypeEnum.PV_ES_CS,
      SiteTypeEnum.PV_CS,
    ].includes(Number(siteType));
    const isShowChargeTab = [
      SiteTypeEnum.CS,
      SiteTypeEnum.ES_CS,
      SiteTypeEnum.PV_CS,
      SiteTypeEnum.PV_ES_CS,
    ].includes(Number(siteType));
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:electric')) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.electricPriceSetting',
          defaultMessage: '市电电价设置',
        }),
        key: TabKeys.MARKET,
        children: <PriceMarketList actionRef={marketActionRef} />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:pv') && isShowPVTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.pvGridElectricityPriceSetting',
          defaultMessage: '光伏上网电价设置',
        }),
        key: TabKeys.PHOTOVOLTAIC,
        children: <PricePhotovoltaicList setType={0} actionRef={photovoltaicActionRef} />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:ESS') && isShowESSTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.ESSElectricityPriceSetting',
          defaultMessage: '储能放电电价设置',
        }),
        key: TabKeys.ESS,
        children: <PricePhotovoltaicList setType={1} actionRef={ESSActionRef} />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:charge') && isShowChargeTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.chargePileChargingSettings',
          defaultMessage: '充电桩计费设置',
        }),
        key: TabKeys.CHARGING,
        children: <PriceChargingList actionRef={chargingActionRef} />,
      });
    }
    return result;
  }, [authorityMap]);

  return (
    <>
      <Tabs onChange={onChange} className={styles.category} tabBarGutter={24} items={category} />
    </>
  );
};

export default Customer;
