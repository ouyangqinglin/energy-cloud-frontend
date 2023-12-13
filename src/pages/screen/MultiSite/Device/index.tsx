/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:56:33
 * @LastEditTime: 2023-08-23 19:06:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Device\index.tsx
 */
import React from 'react';
import { useRequest } from 'umi';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import { items, onlineItems } from './config';
import DigitStat from '../../components/DigitStat';
import styles from './index.less';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';
import { formatMessage } from '@/utils';

const Device: React.FC = () => {
  const { data: deviceData } = useRequest(getData, { pollingInterval: REQUEST_INTERVAL_5_MINUTE });

  return (
    <>
      <Cell cursor="default" width={400} height={223} right={24} top={546}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title={formatMessage({ id: 'device.device', defaultMessage: '设备' })}>
          <DigitStat className={styles.digit} items={items} span={12} data={deviceData} />
          <div className="px12">
            <DigitStat
              className={styles.onlineDigit}
              items={onlineItems}
              span={24}
              data={deviceData}
            />
          </div>
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default Device;
