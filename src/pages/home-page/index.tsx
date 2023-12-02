/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-02 16:06:43
 * @LastEditTime: 2023-12-02 16:12:13
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\home-page\index.tsx
 */

import React from 'react';
import { useModel } from 'umi';
import ExchangeSite from './ExchangeSite';
import HomePage from './home';

export const enum SubSystemType {
  PV = 0,
  ES,
  EI,
  CS,
  ELEC,
}

const Index: React.FC = () => {
  const {} = useModel('site');

  return (
    <>
      <HomePage />
      {/* <ExchangeSite /> */}
    </>
  );
};

export default Index;
