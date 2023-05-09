/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 11:19:44
 * @LastEditTime: 2023-04-27 14:48:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useRequest } from 'umi';
import { arrayToMap } from '@/utils';
import { weatherInfo, weekInfo } from '@/utils/dictionary';
import styles from './index.less';
import IconUnknow from '@/assets/image/screen/weather/cloudy.png';
import { getWeather } from '@/components/ScreenDialog/service';
import dayjs from 'dayjs';

export type WeatherProps = {
  code: string;
};

const weatherMap = arrayToMap(weatherInfo);

const Weather: React.FC<WeatherProps> = (props) => {
  const { code } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getWeather, {
    manual: true,
  });
  const [date, setDate] = useState({ date: '', week: '', time: '' });

  useEffect(() => {
    run(code);
  }, [code]);

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
          <img className={styles.img} src={weatherMap[data.weather] || IconUnknow} />
          <span className={styles.name}>{data.weather}</span>
        </>
      )}
      <span>{`${date.date} ${date.week}`}</span>
      <span className={styles.time}>{date.time}</span>
    </div>
  );
};

export default Weather;
