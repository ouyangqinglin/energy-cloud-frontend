/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2024-02-21 16:26:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\index.tsx
 */
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useModel } from 'umi';
import Stat from './Stat';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';
import { formatMessage } from '@/utils';
import MasterSlaveGroup from './MasterSlaveGroup';

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
        <SiteLabel onChange={onChange}>
          {' '}
          {formatMessage({ id: 'siteMonitor.energyStorageUnit', defaultMessage: '储能单元' })}
        </SiteLabel>
        <Stat siteId={siteData?.id} className="mb24" />
        <MasterSlaveGroup siteId={siteData?.id} />
      </div>
    </>
  );
};

export default Index;
