/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 14:36:25
 * @LastEditTime: 2023-08-23 14:58:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\InstallCapacity\index.tsx
 */
import React, { useMemo } from 'react';
import Cell from '../../components/LayoutCell';
import DigitStat from '../../components/DigitStat';
import { items } from './config';
import styles from './index.less';
import { useRequest } from 'umi';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';

const InstallCapacity: React.FC = () => {
  const { data: installData } = useRequest(getData, { pollingInterval: REQUEST_INTERVAL_5_MINUTE });

  return (
    <>
      <Cell cursor="default" width={1026} height={80} left={447} bottom={24}>
        <DigitStat className={styles.digit} items={items} span={6} data={installData} />
      </Cell>
    </>
  );
};

export default InstallCapacity;
