/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-01 15:10:57
 * @LastEditTime: 2023-12-14 10:25:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteMap\SiteStatus\index.tsx
 */
import React, { memo, useEffect, useMemo } from 'react';
import { statusItems } from './config';
import styles from './index.less';
import { useRequest } from 'umi';
import { getData } from './service';
import { REQUEST_INTERVAL_5_MINUTE } from '../../config';
import { MapTypeEnum } from '../config';

export type SiteStatusProps = {
  type: MapTypeEnum;
  code: number;
};

const SiteStatus: React.FC<SiteStatusProps> = memo((props) => {
  const { type, code } = props;

  const { data: statusData, run } = useRequest(() => getData({ type, code }), {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  useEffect(() => {
    run();
  }, [code]);

  const status = useMemo(() => {
    return statusItems.map((item, index) => {
      return (
        <span key={item.field} className={index ? styles.error : 'flex1 mr12'}>
          <img src={item.icon} />
          {item.label}：{statusData?.[item.field] ?? '--'}
        </span>
      );
    });
  }, [statusData]);

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.title}>站点状态</div>
        <div className="flex">{status}</div>
      </div>
    </>
  );
});

export default SiteStatus;
