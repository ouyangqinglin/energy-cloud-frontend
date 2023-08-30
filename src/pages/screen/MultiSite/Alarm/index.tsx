/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:56:33
 * @LastEditTime: 2023-08-22 09:56:37
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Alarm\index.tsx
 */
import React from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import DigitStat from '../../components/DigitStat';
import { items } from './config';
import styles from './index.less';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';

const Alarm: React.FC = () => {
  const { data: alarmData } = useRequest(getData, { pollingInterval: REQUEST_INTERVAL_5_MINUTE });

  return (
    <>
      <Cell cursor="default" width={400} height={143} right={24} top={90}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="告警">
          <DigitStat className={styles.digit} items={items} span={12} data={alarmData} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default Alarm;
