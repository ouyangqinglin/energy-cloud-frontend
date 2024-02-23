/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 11:19:44
 * @LastEditTime: 2023-06-13 15:58:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\index.tsx
 */

import React, { useEffect } from 'react';
import { Spin, Space } from 'antd';
import { useRequest } from 'umi';
import { getSiteId } from '../../Scene/helper';
import weatherMap, { iconUnknow } from '@/utils/weather';
import { getLocale } from '@/utils';
import { weatherUS } from '@/utils/dictionary';
import styles from './index.less';
import { getWeather } from './service';
const isUS = getLocale().isEnUS;

const Weather: React.FC = (props) => {
  const siteId = getSiteId();
  const {
    data = {},
    loading,
    run,
  } = useRequest(getWeather, {
    manual: true,
    pollingInterval: 60 * 60 * 1000,
  });

  useEffect(() => {
    run(siteId);
  }, [siteId]);

  return (
    <div className={`flex ${styles.weather}`}>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Space align="center">
            <span className={styles.name}>{isUS ? weatherUS[data?.weather] : data?.weather}</span>
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
