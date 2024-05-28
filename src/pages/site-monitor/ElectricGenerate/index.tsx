import { useCallback, useEffect, useRef, useState } from 'react';
import type { ElectricGenerateInfo } from './type';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { columns } from './config';
import { getElectricGenerateUnitList, getElectricGenerateUnitStatistic } from './service';
import EnergyStatisticCard from './components/StatisticCard';
import { useHistory, useModel, useRequest } from 'umi';
import type { SiteDataType } from '@/services/station';
import SiteLabel from '@/components/SiteLabel';
import type { ActionType } from '@ant-design/pro-table';
import styles from './index.less';
import { formatMessage } from '@/utils';

const Energy = () => {
  const [siteData, setSiteData] = useState<SiteDataType>();
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const history = useHistory();

  const requestList: YTProTableCustomProps<
    ElectricGenerateInfo,
    ElectricGenerateInfo
  >['request'] = async (params) => {
    return getElectricGenerateUnitList({ ...params, ...{ siteId: siteData?.id } });
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
      !initialState?.menuPathTitleMap?.get?.('/site-monitor/electric-generate')
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
        {formatMessage({ id: 'siteMonitor.generatingUnit', defaultMessage: '发电单元' })}
      </SiteLabel>
      <YTProTable<ElectricGenerateInfo, ElectricGenerateInfo>
        actionRef={actionRef}
        columns={columns}
        options={false}
        className={styles.tableWrapper}
        toolBarRender={() => []}
        headerTitle={<EnergyStatisticCard data={statisticData} />}
        request={requestList}
        rowKey="deviceId"
        manualRequest={true}
      />
    </>
  );
};

export default Energy;
