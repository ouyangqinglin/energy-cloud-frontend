import { useCallback, useEffect, useRef, useState } from 'react';
import type { DeviceInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns, loadColumns } from './config';
import {
  getChargeStackList,
  getElectricGenerateUnitStatistic,
  getOtherDeviceList,
} from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { useHistory, useModel, useRequest } from 'umi';
import { Tabs } from 'antd';
import styles from './index.less';
import { ActionType } from '@ant-design/pro-table';
import { SiteDataType } from '@/services/station';
import SiteLabel from '@/components/SiteLabel';
import { formatMessage } from '@/utils';

export const enum TabType {
  CHARGE_STACK = 'CHARGE_STACK',
  OTHER_DEVICE = 'OTHER_DEVICE',
}

const Energy = () => {
  const [siteData, setSiteData] = useState<SiteDataType>();
  const { initialState } = useModel('@@initialState');
  const history = useHistory();

  const actionRef = useRef<ActionType>();
  const [config, setConfig] = useState({
    requestList: getChargeStackList,
    columns: [...columns],
  });
  const tabChange = (activeKey: TabType) => {
    if (activeKey === TabType.OTHER_DEVICE) {
      setConfig({
        requestList: getOtherDeviceList,
        columns: [...loadColumns],
      });
    } else {
      setConfig({
        requestList: getChargeStackList,
        columns: [...columns],
      });
    }
    actionRef?.current?.reloadAndRest?.();
  };

  const requestList: YTProTableCustomProps<DeviceInfo, DeviceInfo>['request'] = async (params) => {
    return config.requestList({ ...params, ...{ siteId: siteData?.id } });
  };

  const {
    data: statisticData,
    run: runForStatistic,
    cancel,
  } = useRequest(getElectricGenerateUnitStatistic, { manual: true });

  const onChange = useCallback((data: SiteDataType) => {
    setSiteData(data);
    actionRef.current?.reloadAndRest?.();
  }, []);

  useEffect(() => {
    if (siteData?.id) {
      runForStatistic(siteData?.id);
    }
    return () => {
      cancel();
    };
  }, [siteData]);

  useEffect(() => {
    if (
      siteData?.isLoad &&
      initialState?.menuPathTitleMap &&
      !initialState?.menuPathTitleMap?.get?.('/site-monitor/electric-consumer')
    ) {
      history.push({
        pathname: '/site-monitor/overview',
      });
    }
  }, [initialState?.menuPathTitleMap, siteData]);

  return (
    <>
      <SiteLabel className="px24 pt24 mb0" onChange={onChange}>
        {' '}
        {formatMessage({ id: 'siteMonitor.consumptionUnit', defaultMessage: '用电单元' })}
      </SiteLabel>
      <YTProTable<DeviceInfo, DeviceInfo>
        actionRef={actionRef}
        columns={config.columns}
        options={false}
        className={styles.tableWrapper}
        toolBarRender={() => []}
        headerTitle={
          <div className={styles.headerTitleWrapper}>
            <EnergyStatisticCard data={statisticData} />
            <Tabs
              onChange={tabChange}
              type="card"
              className={styles.tabWrapper}
              items={[
                {
                  label: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
                  key: TabType.CHARGE_STACK,
                  children: [],
                },
                {
                  label: formatMessage({ id: 'device.otherLoad', defaultMessage: '其他负载' }),
                  key: TabType.OTHER_DEVICE,
                  children: [],
                },
              ]}
            />
          </div>
        }
        request={requestList}
        rowKey="deviceId"
        manualRequest={true}
      />
    </>
  );
};

export default Energy;
