import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';
import type { TabsProps } from 'antd';
import { Tabs, Button, Modal, message } from 'antd';
import YTProTable from '@/components/YTProTable';
import { useLocation } from '@/hooks';
import PriceMarketList from './PriceMarket';
import PricePhotovoltaicList from './PricePhotovoltaic';
import PriceChargingList from './PriceCharging';
import type { ActionType } from '@ant-design/pro-table';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { getRulesSyncSite } from '@/pages/station/stationList/service';
import { debounce } from 'lodash';
import { columns as defaultColumns } from './config';
//市电
import { getMarketElectricityPriceList, syncSiteRule } from './PriceMarket/service';
//光伏type=1，储能type=0
import { getPhotovoltaicElectricityPriceList } from './PricePhotovoltaic/service';
//充电桩
import { getChargingElectricityPriceList } from './PriceCharging/service';
import { SiteTypeStrEnum } from '@/utils/enum';

const enum TabKeys {
  MARKET = '1',
  PHOTOVOLTAIC = '2',
  ESS = '3',
  CHARGING = '4',
}

type ElectricPriceType = {
  siteType?: SiteTypeStrEnum;
  inDevice?: boolean;
  siteId?: string;
};

type LocationType = {
  id?: string;
};

const ElectricPrice: React.FC<ElectricPriceType> = (props) => {
  const { siteType, inDevice = false, siteId } = props;

  const location = useLocation<LocationType>();
  const { id } = location?.query || {};
  const chargingActionRef = useRef<ActionType>(null);
  const photovoltaicActionRef = useRef<ActionType>(null);
  const ESSActionRef = useRef<ActionType>(null);
  const marketActionRef = useRef<ActionType>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [siteList, setSiteList] = useState<any[]>([]);
  const [currentType, setCurrentType] = useState<string>(TabKeys.MARKET);
  const [ids, setIds] = useState<React.Key[]>([]);

  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:electricPriceManage:electric',
    'siteManage:siteConfig:electricPriceManage:pv',
    'siteManage:siteConfig:electricPriceManage:ESS',
    'siteManage:siteConfig:electricPriceManage:charge',
    'oss:site:mains:priceSync',
    'oss:site:internet:priceSync',
    'oss:site:charge:priceSync',
    'oss:site:discharge:priceSync',
  ]);

  const getSiteData = (siteName = '') => {
    getRulesSyncSite({ siteId: id, name: siteName, type: currentType }).then((res) => {
      if (res.code == 200) {
        setSiteList(res.data);
      }
    });
  };
  useEffect(() => {
    if (visible) {
      getSiteData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onChange = (activeKey: string) => {
    setCurrentType(activeKey);
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
      SiteTypeStrEnum.ES,
      SiteTypeStrEnum.PV_ES,
      SiteTypeStrEnum.ES_CS,
      SiteTypeStrEnum.PV_ES_CS,
    ].includes(siteType as SiteTypeStrEnum);
    const isShowPVTab = [
      SiteTypeStrEnum.PV,
      SiteTypeStrEnum.PV_ES,
      SiteTypeStrEnum.PV_ES_CS,
      SiteTypeStrEnum.PV_CS,
    ].includes(siteType as SiteTypeStrEnum);
    const isShowChargeTab = [
      SiteTypeStrEnum.CS,
      SiteTypeStrEnum.ES_CS,
      SiteTypeStrEnum.PV_CS,
      SiteTypeStrEnum.PV_ES_CS,
    ].includes(siteType as SiteTypeStrEnum);

    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:electric')) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.electricPriceSetting',
          defaultMessage: '市电电价设置',
        }),
        key: TabKeys.MARKET,
        children: (
          <PriceMarketList
            priceType={TabKeys.MARKET}
            actionRef={marketActionRef}
            inDevice={inDevice}
            siteId={inDevice ? siteId : id}
          />
        ),
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:pv') && isShowPVTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.pvGridElectricityPriceSetting',
          defaultMessage: '馈网电价设置',
        }),
        key: TabKeys.PHOTOVOLTAIC,
        children: (
          <PricePhotovoltaicList
            priceType={TabKeys.PHOTOVOLTAIC}
            setType={0}
            actionRef={photovoltaicActionRef}
            inDevice={inDevice}
            siteId={inDevice ? siteId : id}
          />
        ),
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:ESS') && isShowESSTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.ESSElectricityPriceSetting',
          defaultMessage: '储能放电电价设置',
        }),
        key: TabKeys.ESS,
        children: (
          <PricePhotovoltaicList
            setType={1}
            priceType={TabKeys.ESS}
            actionRef={ESSActionRef}
            inDevice={inDevice}
            siteId={inDevice ? siteId : id}
          />
        ),
      });
    }
    if (
      authorityMap.get('siteManage:siteConfig:electricPriceManage:charge') &&
      isShowChargeTab &&
      !inDevice
    ) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.chargePileChargingSettings',
          defaultMessage: '充电桩计费设置',
        }),
        key: TabKeys.CHARGING,
        children: (
          <PriceChargingList
            priceType={TabKeys.CHARGING}
            actionRef={chargingActionRef}
            siteId={id}
          />
        ),
      });
    }
    return result;
  }, [siteType, authorityMap, inDevice, siteId, id]);

  const haspriceSyncAuthority = useCallback(() => {
    if (currentType == TabKeys.MARKET) {
      //市电电价设置
      return authorityMap.get('oss:site:mains:priceSync');
    } else if (currentType == TabKeys.PHOTOVOLTAIC) {
      //馈网电价设置
      return authorityMap.get('oss:site:internet:priceSync');
    } else if (currentType == TabKeys.ESS) {
      //储能放电电价设置
      return authorityMap.get('oss:site:discharge:priceSync');
    } else if (currentType == TabKeys.CHARGING) {
      //充电桩计费设置
      return authorityMap.get('oss:site:charge:priceSync');
    } else {
      return true;
    }
  }, [authorityMap, currentType]);

  const operations =
    haspriceSyncAuthority() && !inDevice ? (
      <Button type="primary" onClick={() => setVisible(true)}>
        {formatMessage({
          id: 'siteManage.siteList.electricityPriceSynchronization',
          defaultMessage: '电价同步',
        })}
      </Button>
    ) : (
      ''
    );

  const handleOk = () => {
    if (ids.length) {
      const params = {
        ids,
        type: Number(currentType),
        siteId: id,
      };
      syncSiteRule(params).then((res) => {
        if (res.data) {
          onChange(currentType);
          message.success(
            formatMessage({
              id: 'siteManage.siteList.electricityPriceSynchronizationSuc',
              defaultMessage: '电价同步成功',
            }),
          );
        } else {
          message.success(
            formatMessage({
              id: 'siteManage.siteList.electricityPriceSynchronizationFil',
              defaultMessage: '电价同步失败',
            }),
          );
        }
        setVisible(false);
      });
    } else {
      setVisible(false);
    }
  };

  const columns = useMemo(() => {
    return [
      {
        title: formatMessage({
          id: 'siteManage.siteList.siteName',
          defaultMessage: '站点名称',
        }),
        dataIndex: 'siteId',
        valueType: 'select',
        formItemProps: {
          name: 'siteId',
        },
        fieldProps: {
          showSearch: true,
          options: siteList,
          fieldNames: { label: 'name', value: 'id' },
        },
        width: 150,
        ellipsis: true,
        hideInTable: true,
      },
      ...defaultColumns,
    ];
  }, [siteList]);

  const requestList = useCallback(
    (params) => {
      switch (currentType) {
        case TabKeys.CHARGING: //充电桩计费设置
          return getChargingElectricityPriceList(params);
        case TabKeys.MARKET: //市电电价设置
          return getMarketElectricityPriceList(params);
        case TabKeys.PHOTOVOLTAIC: //光伏上网电价设置
          params.type = 0;
          return getPhotovoltaicElectricityPriceList(params);
        case TabKeys.ESS: //储能放电电价设置
          params.type = 1;
          return getPhotovoltaicElectricityPriceList(params);
        default: //市电
          return getMarketElectricityPriceList(params);
      }
    },
    [currentType],
  );

  return (
    <>
      <Tabs
        tabBarExtraContent={operations}
        onChange={onChange}
        className={styles.category}
        tabBarGutter={24}
        items={category}
      />
      <Modal
        width={800}
        title={formatMessage({
          id: 'siteManage.siteList.electricityPriceSynchronization',
          defaultMessage: '电价同步',
        })}
        visible={visible}
        destroyOnClose
        onOk={handleOk}
        onCancel={() => setVisible(false)}
        maskClosable={false}
      >
        <YTProTable<any, any>
          columns={columns}
          toolBarRender={false}
          request={requestList}
          rowSelection={{
            type: 'checkbox',
            onChange: (selectedRowKeys: React.Key[]) => {
              setIds(selectedRowKeys);
            },
          }}
        />
      </Modal>
    </>
  );
};

export default ElectricPrice;
