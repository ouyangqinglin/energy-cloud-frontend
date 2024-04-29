/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-04-24 13:54:16
 * @LastEditTime: 2024-04-25 13:43:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\EnergyFlow\RealTimeData\Charge\index.tsx
 */

import React, { memo, useEffect } from 'react';
import styles from '../index.less';
import { config } from './helper';
import Detail from '@/components/Detail';
import { Col, Row } from 'antd';
import { useRequest } from 'umi';
import { getChargeStat } from './service';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';
import { formatMessage } from '@/utils';

type ChargeType = {
  siteId?: number;
};

const Charge: React.FC<ChargeType> = (props) => {
  const { siteId } = props;

  const { data: statData, run } = useRequest(getChargeStat, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  const stat = config.map((item) => {
    return (
      <Col span={8} xxl={12}>
        <div className={`card-wrap p16 flex`}>
          <img src={item.icon} className={`mr10 ${styles.img}`} />
          <Detail
            className={styles.detail}
            items={item.items}
            data={statData}
            column={1}
            layout="vertical"
            colon={false}
          />
        </div>
      </Col>
    );
  });

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  return (
    <>
      <div className={styles.realTimeData}>
        <div className={styles.realContent}>
          <Detail.Label
            className="mb12"
            title={formatMessage({
              id: 'siteMonitor.chargingGunReal-TimeStatus',
              defaultMessage: '充电枪实时状态',
            })}
            showLine={false}
            bold={false}
          />
          <Row gutter={[10, 10]}>{stat}</Row>
        </div>
      </div>
    </>
  );
};

export default memo(Charge);
