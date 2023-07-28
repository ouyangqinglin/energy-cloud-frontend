/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-27 17:42:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useModel } from 'umi';
import Stat from './Stat';
import EnergyInfo from '@/components/EnergyInfo';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';

const Index: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteDataType>();
  const { initialState } = useModel('@@initialState');
  const history = useHistory();

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

  return (
    <>
      <div className="p24">
        <SiteLabel onChange={onChange} />
        <Stat siteId={siteData?.id} className="mb24" />
        <EnergyInfo deviceData={{ siteId: siteData?.id }} showLabel />
      </div>
    </>
  );
};

export default Index;
