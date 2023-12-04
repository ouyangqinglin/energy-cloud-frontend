/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-28 17:41:49
 * @LastEditTime: 2023-12-03 18:35:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\index.tsx
 */
import React from 'react';
import { useModel } from 'umi';
import ExchangeSiteList from '../exchangeManage';
import SiteList from './siteList';
import { SiteTypeEnum } from '@/utils/dictionary';

const Index: React.FC = () => {
  const { siteType } = useModel('site', (model) => ({ siteType: model?.state?.siteType }));

  return <>{(siteType as any) == SiteTypeEnum.Exchange ? <ExchangeSiteList /> : <SiteList />}</>;
};

export default Index;
