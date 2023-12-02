/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 16:06:43
 * @LastEditTime: 2023-12-02 17:10:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\index.tsx
 */

import React from 'react';
import { useModel } from 'umi';
import ExchangeSite from './ExchangeSite';
import HomePage from './home';
import { SiteTypeEnum } from '@/utils/dictionary';

export const enum SubSystemType {
  PV = 0,
  ES,
  EI,
  CS,
  ELEC,
}

const Index: React.FC = () => {
  const { siteType } = useModel('site', (model) => ({ siteType: model?.state?.siteType }));

  return <>{(siteType as any) == SiteTypeEnum.Exchange ? <ExchangeSite /> : <HomePage />}</>;
};

export default Index;
