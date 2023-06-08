/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 11:19:44
 * @LastEditTime: 2023-06-08 19:56:55
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useRequest } from 'umi';
import { weekInfo } from '@/utils/dictionary';
import weatherMap, { iconUnknow } from '@/utils/weather';
import styles from './index.less';
import { getWeather } from './service';
import dayjs from 'dayjs';

export type WeatherProps = {
  id: string;
};

const Weather: React.FC<WeatherProps> = (props) => {
  const { id } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getWeather, {
    manual: true,
  });
  const [date, setDate] = useState({ date: '', week: '', time: '' });

  useEffect(() => {
    run(id);
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = dayjs();
      setDate({
        date: now.format('YYYY-MM-DD'),
        week: weekInfo[now.day()],
        time: now.format('HH:mm:ss'),
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`flex ${styles.weather}`}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <img className={styles.img} src={weatherMap.get(data?.weather) || iconUnknow} />
          <span className={styles.name}>{data?.weather}</span>
        </>
      )}
      <span>{`${date.date} ${date.week}`}</span>
      <span className={styles.time}>{date.time}</span>
    </div>
  );
};

export default Weather;
