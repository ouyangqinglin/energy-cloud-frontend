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
import { SiteTypeStrEnum } from '@/utils/dict';
import { getRulesSyncSite } from '@/pages/station/stationList/service';
import { debounce } from 'lodash';
import { columns as defaultColumns } from './config';
//市电
import { getMarketElectricityPriceList, syncSiteRule } from './PriceMarket/service';
//光伏type=1，储能type=0
import { getPhotovoltaicElectricityPriceList } from './PricePhotovoltaic/service';
//充电桩
import { getChargingElectricityPriceList } from './PriceCharging/service';

const enum TabKeys {
  MARKET = '1',
  PHOTOVOLTAIC = '2',
  ESS = '3',
  CHARGING = '4',
}

type ElectricPriceType = {
  siteType?: SiteTypeStrEnum;
};

type LocationType = {
  id?: string;
};

const ElectricPrice: React.FC<ElectricPriceType> = (props) => {
  const { siteType } = props;

  const location = useLocation<LocationType>();
  const { id } = location?.query || {};
  const chargingActionRef = useRef<ActionType>(null);
  const photovoltaicActionRef = useRef<ActionType>(null);
  const ESSActionRef = useRef<ActionType>(null);
  const marketActionRef = useRef<ActionType>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [siteList, setSiteList] = useState<any[]>([]);
  const [type, setType] = useState<string>(TabKeys.MARKET);
  const [ids, setIds] = useState<React.Key[]>([]);

  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:electricPriceManage:electric',
    'siteManage:siteConfig:electricPriceManage:pv',
    'siteManage:siteConfig:electricPriceManage:ESS',
    'siteManage:siteConfig:electricPriceManage:charge',
  ]);

  const getSiteData = (siteName = '') => {
    getRulesSyncSite({ siteId: id, name: siteName, type }).then((res) => {
      if (res.code == 200) {
        setSiteList(res.data);
      }
    });
  };

  const requestStation = useCallback(
    debounce((searchText) => {
      getSiteData(searchText);
    }, 700),
    [],
  );

  useEffect(() => {
    if (visible) {
      getSiteData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onChange = (activeKey: string) => {
    setType(activeKey);
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
        children: <PriceMarketList priceType={TabKeys.MARKET} actionRef={marketActionRef} />,
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:pv') && isShowPVTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.pvGridElectricityPriceSetting',
          defaultMessage: '光伏上网电价设置',
        }),
        key: TabKeys.PHOTOVOLTAIC,
        children: (
          <PricePhotovoltaicList
            priceType={TabKeys.PHOTOVOLTAIC}
            setType={0}
            actionRef={photovoltaicActionRef}
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
          <PricePhotovoltaicList setType={1} priceType={TabKeys.ESS} actionRef={ESSActionRef} />
        ),
      });
    }
    if (authorityMap.get('siteManage:siteConfig:electricPriceManage:charge') && isShowChargeTab) {
      result.push({
        label: formatMessage({
          id: 'siteManage.set.chargePileChargingSettings',
          defaultMessage: '充电桩计费设置',
        }),
        key: TabKeys.CHARGING,
        children: <PriceChargingList priceType={TabKeys.CHARGING} actionRef={chargingActionRef} />,
      });
    }
    return result;
  }, [authorityMap, siteType]);

  const operations = (
    <Button type="primary" onClick={() => setVisible(true)}>
      {formatMessage({
        id: 'siteManage.siteList.electricityPriceSynchronization',
        defaultMessage: '电价同步',
      })}
    </Button>
  );

  const handleOk = () => {
    if (ids.length) {
      const params = {
        ids,
        type: Number(type),
        siteId: id,
      };
      syncSiteRule(params).then((res) => {
        if (res.data) {
          onChange(type);
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
          filterOption: false,
          onSearch: requestStation,
          options: siteList,
          fieldNames: { label: 'name', value: 'id' },
        },
        width: 150,
        ellipsis: true,
        hideInTable: true,
      },
      ...defaultColumns,
    ];
  }, [requestStation, siteList]);

  const requestList = useCallback(
    (params) => {
      switch (type) {
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
    [type],
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
