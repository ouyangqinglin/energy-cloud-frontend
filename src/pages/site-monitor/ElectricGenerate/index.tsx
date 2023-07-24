import { useCallback, useEffect, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getElectricGenerateUnitList, getElectricGenerateUnitStatistic } from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { getDefaultSite } from '@/hooks/useFetchDefaultSiteId';
import { useRequest } from 'umi';
import { useToggle } from 'ahooks';
import { SiteDataType, getSiteUnitConfig } from '@/services/station';
import EmptyPage from '@/components/EmptyPage';
import SiteLabel from '@/components/SiteLabel';
import { ActionType } from '@ant-design/pro-table';

const Energy = () => {
  const [siteId, setSiteId] = useState<number>();
  const actionRef = useRef<ActionType>();

  const { data: siteConfig, run } = useRequest(getSiteUnitConfig, {
    manual: true,
  });

  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = async (params) => {
    return getElectricGenerateUnitList({ ...params, ...{ siteId } });
  };

  const {
    data: statisticData,
    run: runForStatistic,
    cancel,
  } = useRequest(getElectricGenerateUnitStatistic, { manual: true });

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(Number(data.id));
      actionRef.current?.reloadAndRest?.();
    }
  }, []);

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
        <>
          <SiteLabel className="px24 pt24 mb0" onChange={onChange} />
          <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
            actionRef={actionRef}
            columns={columns}
            options={false}
            toolBarRender={() => []}
            headerTitle={<EnergyStatisticCard data={statisticData} />}
            request={requestList}
            rowKey="deviceId"
          />
        </>
      )}
    </>
  );
};

export default Energy;
