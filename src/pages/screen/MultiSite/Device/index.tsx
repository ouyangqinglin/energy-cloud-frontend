/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:56:33
 * @LastEditTime: 2023-08-23 19:06:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Device\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import { items, onlineItems } from './config';
import DigitStat from '../../components/DigitStat';
import styles from './index.less';

const Device: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={223} right={24} top={546}>
        <DecorationCarousel panelStyle={{ padding: 0 }} title="设备">
          <DigitStat className={styles.digit} items={items} span={12} />
          <DigitStat className={styles.digit} items={onlineItems} span={24} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default Device;
