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
    }
  }, [siteData]);

  return (
    <>
      <div className="p24">
        <SiteLabel onChange={onChange} />
        <Stat siteId={siteData?.id} className="mb24" />
        <EnergyInfo
          deviceData={energeList?.[0]}
          showLabel
          loading={loading}
          source={EnergySourceEnum.SiteMonitor}
        />
      </div>
    </>
  );
};

export default Index;
