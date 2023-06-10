/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 11:19:44
 * @LastEditTime: 2023-06-09 14:30:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\index.tsx
 */

import React, { useEffect } from 'react';
import { Spin, Space } from 'antd';
import { useRequest } from 'umi';
import weatherMap, { iconUnknow } from '@/utils/weather';
import styles from './index.less';
import { getWeather } from './service';

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

  useEffect(() => {
    run(id);
  }, [id]);

  return (
    <div className={`flex ${styles.weather}`}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Space align="center">
            <span className={styles.name}>{data?.weather}</span>
            <img className={styles.img} src={weatherMap.get(data?.weather) || iconUnknow} />
            <span className={styles.temp}>
              {Math.min(data?.nighttemp, data?.daytemp)}℃ -{' '}
              {Math.max(data?.nighttemp, data?.daytemp)}℃{' '}
            </span>
          </Space>
        </>
      )}
    </div>
  );
};

export default Weather;
