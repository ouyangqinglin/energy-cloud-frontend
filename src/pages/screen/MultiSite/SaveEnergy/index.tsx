/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 10:05:05
 * @LastEditTime: 2023-08-29 13:41:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SaveEnergy\index.tsx
 */
import React from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import DigitStat from '../../components/DigitStat';
import styles from './index.less';
import { items } from './config';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';

const SaveEnergy: React.FC = () => {
  const { data: energyData } = useRequest(getData, { pollingInterval: REQUEST_INTERVAL_5_MINUTE });

  return (
    <>
      <Cell cursor="default" width={400} height={267} right={24} bottom={24}>
        <DecorationCarousel panelStyle={{ padding: '16px 28px 0' }} title="节能减排">
          <DigitStat className={styles.digit} items={items} span={24} data={energyData} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default SaveEnergy;
