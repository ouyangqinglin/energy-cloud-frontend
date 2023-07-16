import { useCallback, useEffect, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getElectricGenerateUnitList, getElectricGenerateUnitStatistic } from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { getDefaultSite } from '@/hooks/useFetchDefaultSiteId';
import { useSiteColumn } from '@/hooks';
import { useRequest } from 'umi';
import { useToggle } from 'ahooks';
import { getSiteUnitConfig } from '@/services/station';
import EmptyPage from '@/components/EmptyPage';

const Energy = () => {
  const { run: runForDefaultSiteId } = useRequest(getDefaultSite, { manual: true });

  const [hasCacheSiteId, { set }] = useToggle(false);
  const [siteId, setSiteId] = useState<number>();
  const defaultSiteIdRef = useRef<number>();

  const { data: siteConfig, run } = useRequest(getSiteUnitConfig, {
    manual: true,
  });

  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = async (params) => {
    if (!hasCacheSiteId) {
      const siteData = await runForDefaultSiteId();
      set(true);
      setSiteId(siteData?.id);
      defaultSiteIdRef.current = siteData?.id;
      return getElectricGenerateUnitList({ ...params, ...{ siteId: siteData?.id } });
    }
    return getElectricGenerateUnitList({ ...params });
  };

  const [siteColumn] = useSiteColumn<ElectricGenerateInfo>({
    hideInTable: true,
    dataIndex: 'siteId',
    params: {
      energyOptions: 1,
    },
    initialValue: defaultSiteIdRef.current,
    fieldProps: {
      value: siteId,
      onChange: setSiteId,
    },
  });

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
        unitNum: 1,
      });
    }
  }, [siteId]);

  return (
    <>
      {siteConfig?.prompt ? (
        <EmptyPage description={siteConfig?.prompt} />
      ) : (
        <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
          columns={[siteColumn, ...columns]}
          options={false}
          params={{ siteId }}
          toolBarRender={() => []}
          onReset={() => setSiteId(defaultSiteIdRef.current)}
          headerTitle={<EnergyStatisticCard data={statisticData} />}
          request={requestList}
          rowKey="deviceId"
        />
      )}
    </>
  );
};

export default Energy;
