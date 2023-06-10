/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 14:30:11
 * @LastEditTime: 2023-06-10 17:22:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Time\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { weekInfo } from '@/utils/dictionary';
import moment from 'moment';
import styles from './index.less';
import '@/assets/styles/font.less';

const Time: React.FC = () => {
  const [date, setDate] = useState({ date: '', week: '', time: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      setDate({
        date: now.format('YYYY年MM月DD日'),
        week: weekInfo[now.day()],
        time: now.format('HH:mm:ss'),
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className={`flex ${styles.time}`}>
        <span className={styles.hour}>{date.time}</span>
        <span className="ml16 mr8">{date.date}</span>
        <span>{date.week}</span>
      </div>
    </>
  );
};

export default Time;
