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
import { useRequest } from 'umi';
import useSiteColumn from '@/hooks/useSiteColumn';
import { useToggle } from 'ahooks';
import { getDefaultSite } from '@/hooks/useFetchDefaultSiteId';
import { Tabs } from 'antd';
import styles from './index.less';
import { ActionType } from '@ant-design/pro-components';
import { getSiteUnitConfig } from '@/services/station';
import EmptyPage from '@/components/EmptyPage';

export const enum TabType {
  CHARGE_STACK = 'CHARGE_STACK',
  OTHER_DEVICE = 'OTHER_DEVICE',
}

const Energy = () => {
  const { run: runForDefaultSiteId } = useRequest(getDefaultSite, { manual: true });
  const [hasCacheSiteId, { set }] = useToggle(false);
  const [siteId, setSiteId] = useState<number>();
  const defaultSiteIdRef = useRef<number>();

  const { data: siteConfig, run } = useRequest(getSiteUnitConfig, {
    manual: true,
  });

  const [siteColumn] = useSiteColumn<DeviceInfo>({
    hideInTable: true,
    dataIndex: 'siteId',
    initialValue: defaultSiteIdRef.current,
    fieldProps: {
      value: siteId,
      onChange: setSiteId,
    },
  });

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
    actionRef?.current?.reload();
  };

  const requestList: YTProTableCustomProps<DeviceInfo, DeviceInfo>['request'] = async (params) => {
    if (!hasCacheSiteId) {
      const siteData = await runForDefaultSiteId();
      set(true);
      setSiteId(siteData?.id);
      defaultSiteIdRef.current = siteData?.id;
      return config.requestList({ ...params, ...{ siteId: siteData?.id } });
    }
    return config.requestList({ ...params });
  };

  const {
    data: statisticData,
    run: runForStatistic,
    cancel,
  } = useRequest(getElectricGenerateUnitStatistic, { manual: true });
  useEffect(() => {
    if (siteId) {
      runForStatistic(siteId);
    }
    return () => {
      cancel();
    };
  }, [cancel, runForStatistic, siteId]);

  useEffect(() => {
    if (siteId) {
      run({
        siteId,
        unitNum: 3,
      });
    }
  }, [siteId]);

  return (
    <>
      {siteConfig?.prompt ? (
        <EmptyPage description={siteConfig?.prompt} />
      ) : (
        <YTProTable<DeviceInfo, DeviceInfo>
          actionRef={actionRef}
          columns={[siteColumn, ...config.columns]}
          options={false}
          onReset={() => setSiteId(defaultSiteIdRef.current)}
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
                    label: `充电桩`,
                    key: TabType.CHARGE_STACK,
                    children: [],
                  },
                  {
                    label: `其他设备`,
                    key: TabType.OTHER_DEVICE,
                    children: [],
                  },
                ]}
              />
            </div>
          }
          request={requestList}
          rowKey="deviceId"
        />
      )}
    </>
  );
};

export default Energy;
