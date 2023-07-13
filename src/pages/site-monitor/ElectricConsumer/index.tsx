import { useCallback, useEffect, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns, loadColumns } from './config';
import { getElectricGenerateUnitList, getElectricGenerateUnitStatistic } from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { useRequest } from 'umi';
import useSiteColumn from '@/hooks/useSiteColumn';
import { useToggle } from 'ahooks';
import { getDefaultSite } from '@/hooks/useFetchDefaultSiteId';
import { Tabs } from 'antd';
import styles from './index.less';
import { ActionType } from '@ant-design/pro-components';

export const enum TabType {
  CHARGE_STACK = 'CHARGE_STACK',
  LOAD = 'LOAD',
}

const Energy = () => {
  const { run: runForDefaultSiteId } = useRequest(getDefaultSite, { manual: true });
  const [hasCacheSiteId, { set }] = useToggle(false);
  const [siteId, setSiteId] = useState<number>();
  const defaultSiteIdRef = useRef<number>();

  const [siteColumn] = useSiteColumn<ElectricGenerateInfo>({
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
    requestList: getElectricGenerateUnitList,
    columns: [siteColumn, ...columns],
  });
  const tabChange = (activeKey: TabType) => {
    if (activeKey === TabType.LOAD) {
      setConfig({
        requestList: getElectricGenerateUnitList,
        columns: [siteColumn, ...loadColumns],
      });
    } else {
      setConfig({
        requestList: getElectricGenerateUnitList,
        columns: [siteColumn, ...columns],
      });
    }
    actionRef?.current?.reload();
  };

  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = async (params) => {
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

  return (
    <>
      <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
        actionRef={actionRef}
        columns={config.columns}
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
                  label: `负载`,
                  key: TabType.LOAD,
                  children: [],
                },
              ]}
            />
          </div>
        }
        request={requestList}
        rowKey="deviceId"
      />
    </>
  );
};

export default Energy;
