/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:57:57
 * @LastEditTime: 2023-08-23 19:13:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\index.tsx
 */
import React from 'react';
import Cell from '../../components/LayoutCell';
import DecorationCarousel from '../../components/DecorationCarousel';
import DigitStat from '../../components/DigitStat';
import { items } from './config';
import styles from './index.less';

const Task: React.FC = () => {
  return (
    <>
      <Cell cursor="default" width={400} height={276} right={24} top={253}>
        <DecorationCarousel panelStyle={{ padding: '16px 16px 0' }} title="任务">
          <DigitStat className={styles.digit} items={items} span={24} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default Task;
