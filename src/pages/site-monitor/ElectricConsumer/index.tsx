import { useCallback, useEffect, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getElectricGenerateUnitList, getElectricGenerateUnitStatistic } from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { useRequest } from 'umi';
import useSiteColumn from '@/hooks/useSiteColumn';
import { useToggle } from 'ahooks';
import { getDefaultSite } from '@/hooks/useFetchDefaultSiteId';

const Energy = () => {
  const { run: runForDefaultSiteId } = useRequest(getDefaultSite, { manual: true });

  const [hasCacheSiteId, { set }] = useToggle(false);
  const [siteId, setSiteId] = useState<number>();

  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = async (params) => {
    if (!hasCacheSiteId) {
      const siteData = await runForDefaultSiteId();
      set(true);
      setSiteId(siteData?.id);
      return getElectricGenerateUnitList({ ...params, ...{ siteId: siteData?.id } });
    }
    return getElectricGenerateUnitList({ ...params });
  };

  const [siteColumn] = useSiteColumn<ElectricGenerateInfo>({
    hideInTable: true,
    dataIndex: 'siteId',
    // initialValue: data?.id,
    fieldProps: {
      // defaultValue: data?.id,
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

  return (
    <>
      <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
        columns={[siteColumn, ...columns]}
        options={false}
        toolBarRender={() => []}
        headerTitle={<EnergyStatisticCard data={statisticData} />}
        request={requestList}
        rowKey="deviceId"
      />
    </>
  );
};

export default Energy;
