/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-28 16:53:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useModel, useRequest } from 'umi';
import Stat from './Stat';
import EnergyInfo, { EnergySourceEnum } from '@/components/EnergyInfo';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';
import { getEnergeListBySite } from '@/services/equipment';
import { getGroupList } from './service';
import { formatMessage } from '@/utils';

const Index: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteDataType>();
  const { initialState } = useModel('@@initialState');
  const history = useHistory();

  const {
    data: energeList,
    run,
    loading,
  } = useRequest(getEnergeListBySite, {
    manual: true,
  });
  const {
    data: groupData,
    run: getGroupData,
    loading: loadingGroupData,
  } = useRequest(getGroupList, {
    manual: true,
  });
  const onChange = useCallback((data: SiteDataType) => {
    setSiteData(data);
  }, []);

  useEffect(() => {
    if (
      siteData?.isLoad &&
      initialState?.menuPathTitleMap &&
      !initialState?.menuPathTitleMap?.get?.('/site-monitor/energy')
    ) {
      history.push({
        pathname: '/site-monitor/overview',
      });
    }
  }, [initialState?.menuPathTitleMap, siteData]);

  useEffect(() => {
    if (siteData?.id) {
      run({ siteId: siteData.id });
      getGroupData({ siteId: siteData.id }); //新接口，兼容所有设备
    }
  }, [siteData]);

  return (
    <>
      <div className="p24">
        <SiteLabel onChange={onChange}> {formatMessage({ id: 'siteMonitor.energyStorageUnit', defaultMessage: '储能单元' })}</SiteLabel>
        <Stat siteId={siteData?.id} className="mb24" />
        <EnergyInfo
          deviceData={energeList?.[0]}
          showLabel
          loading={loading}
          source={EnergySourceEnum.SiteMonitor}
          emsGroupData={groupData}
          loadingGroupData={loadingGroupData}
        />
      </div>
    </>
  );
};

export default Index;
