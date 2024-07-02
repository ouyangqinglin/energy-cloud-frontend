/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 14:36:25
 * @LastEditTime: 2024-05-23 17:04:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\InstallCapacity\index.tsx
 */
import React, { useMemo } from 'react';
import Cell from '../../components/LayoutCell';
import DigitStat from '../../components/DigitStat';
import type { DigitStatItemType } from '../../components/DigitStat';
import { items } from './config';
import styles from './index.less';
import { useModel, useRequest } from 'umi';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../config';

const InstallCapacity: React.FC = () => {
  const { unit } = useModel('siteType');
  const { data: installData } = useRequest(getData, { pollingInterval: REQUEST_INTERVAL_5_MINUTE });

  const config = useMemo(() => {
    const result: DigitStatItemType[] = [];
    items.forEach((item) => {
      if (item?.key == 'pv') {
        if (!unit.hasPv) {
          return;
        }
      } else if (item?.key == 'charge') {
        if (!unit.hasCharge) {
          return;
        }
      } else if (item?.key == 'energy') {
        if (!unit.hasEnergy) {
          return;
        }
      }
      result.push(item);
    });
    return result;
  }, [unit]);

  return (
    <>
      <Cell cursor="default" width={1000} height={80} left={469} bottom={24}>
        <DigitStat
          className={styles.digit}
          items={config}
          span={24 / config.length}
          data={installData}
        />
      </Cell>
    </>
  );
};

export default InstallCapacity;
