/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-27 11:19:44
 * @LastEditTime: 2024-06-07 09:41:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Weather\index.tsx
 */

import React, { useEffect } from 'react';
import { Spin, Space } from 'antd';
import { useRequest } from 'umi';
import { getSiteId } from '../../Scene/helper';
import weatherMap, { iconUnknow } from '@/utils/weather';
import styles from './index.less';
import { getWeather } from './service';
import { formatMessage, isEmpty } from '@/utils';

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
            {data?.weather && (
              <>
                <span className={styles.name}>
                  {formatMessage({ id: `weather.${data?.weather}`, defaultMessage: data?.weather })}
                </span>
                <img className={styles.img} src={weatherMap.get(data?.weather) || iconUnknow} />
              </>
            )}
            {(!isEmpty(data?.nighttemp) || !isEmpty(data?.daytemp)) && (
              <span className={styles.temp}>
                {Math.min(data?.nighttemp ?? 0, data?.daytemp ?? 0)}℃ -{' '}
                {Math.max(data?.nighttemp ?? 0, data?.daytemp ?? 0)}℃{' '}
              </span>
            )}
          </Space>
        </>
      )}
    </div>
  );
};

export default Weather;
