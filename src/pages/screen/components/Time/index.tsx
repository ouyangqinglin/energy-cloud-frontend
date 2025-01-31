/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 14:30:11
 * @LastEditTime: 2024-02-25 18:20:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Time\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { weekInfo } from '@/utils/dict';
import { getLocale } from '@/utils';
import moment from 'moment';
import styles from './index.less';
import '@/assets/styles/font.less';
const isUS = getLocale().isEnUS;

const Time: React.FC = () => {
  const [date, setDate] = useState({ date: '', week: '', time: '' });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment();
      setDate({
        date: now.format(isUS ? 'MM/DD/YYYY' : 'YYYY年MM月DD日'),
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
