/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:57:57
 * @LastEditTime: 2023-08-29 11:49:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\index.tsx
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
import { formatMessage } from '@/utils';

const Task: React.FC = () => {
  const { data: taskData } = useRequest(getData, {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
    formatResult: (res) => {
      if (res?.data) {
        try {
          for (const key in res?.data) {
            res.data[key + '.total'] = res?.data?.[key]?.total;
            res.data[key + '.pendingProcessing'] = res?.data?.[key]?.pendingProcessing;
            res.data[key + '.timeout'] = res?.data?.[key]?.timeout;
          }
        } catch {}
      }
      return res?.data;
    },
  });

  return (
    <>
      <Cell cursor="default" width={400} height={276} right={24} top={253}>
        <DecorationCarousel
          panelStyle={{ padding: '16px 16px 0' }}
          title={formatMessage({ id: 'screen.task', defaultMessage: '任务' })}
        >
          <DigitStat className={styles.digit} items={items} span={24} data={taskData} />
        </DecorationCarousel>
      </Cell>
    </>
  );
};

export default Task;
