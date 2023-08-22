/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 14:38:48
 * @LastEditTime: 2023-08-22 15:23:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\IncomeStat\index.tsx
 */
import React, { useMemo } from 'react';
import Cell from '../../components/LayoutCell';
import DigitStat from '../../components/DigitStat';
import { items } from './config';
import styles from './index.less';

const IncomeStat: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={1026} height={80} left={447} top={118}>
        <DigitStat className={styles.digit} items={items} span={4} unitLinkValue={false} />
      </Cell>
    </>
  );
};

export default IncomeStat;
