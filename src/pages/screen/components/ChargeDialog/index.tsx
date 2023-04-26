/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-04-26 14:16:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ChargeDialog\index.tsx
 */

import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useRequest } from 'umi';
import Dialog from '@/pages/screen/components/Dialog';
import type { item, BusinessDialogProps } from '@/pages/screen/components/Dialog';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import styles from '../Dialog/index.less';
import { getDeviceInfo } from '../Dialog/service';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';

const ChargeDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  const gunInfoItem: DetailItem[] = [
    { label: '枪A状态', field: 'aGun1' },
    { label: '枪B状态', field: 'bGun1' },
    { label: '枪A状态', field: 'aGun2' },
    { label: '枪B状态', field: 'bGun2' },
    { label: '枪A状态', field: 'aGun3' },
    { label: '枪B状态', field: 'bGun3' },
    { label: '枪A状态', field: 'aGun4' },
    { label: '枪B状态', field: 'bGun4' },
  ];
  const deviceInfoItem: DetailItem[] = [
    { label: 'A相电压', field: 'aVoltage' },
    { label: 'A相电流', field: 'aElectric' },
    { label: 'B相电压', field: 'bVoltage' },
    { label: 'B相电流', field: 'bElectric' },
    { label: 'C相电压', field: 'cVoltage' },
    { label: 'C相电流', field: 'cElectric' },
    { label: '实时充电功率', field: 'currentPower', span: 2 },
    { label: '今日充电量', field: 'todayCharge' },
    { label: '累计充电量', field: 'totalCharge' },
    { label: '今日充电收益', field: 'todayChargeRevenue' },
    { label: '累计充电收益', field: 'totalChargeRevenue' },
  ];

  const runInfo = (
    <div>
      <Row>
        <Col flex="0 0 10.41vw">
          <img className={styles.productLogo} src={ImgCharge} />
          <Detail
            items={gunInfoItem}
            data={data}
            column={2}
            labelStyle={{ width: '3.2vw', color: '#A7B7CA', fontSize: '1.11vh' }}
            contentStyle={{ color: 'white', fontSize: '1.11vh' }}
          />
        </Col>
        <Col className={styles.productInfo} flex="1">
          <div className={styles.label}>
            <span className={styles.dot} />
            设备名称：{data?.name}
          </div>
          <Detail
            items={deviceInfoItem}
            data={data}
            column={2}
            labelStyle={{ width: '4.5vw', color: '#A7B7CA', fontSize: '1.11vh' }}
            contentStyle={{ color: 'white', fontSize: '1.11vh' }}
          />
        </Col>
      </Row>

      <div className={styles.splitLine} />
      <div className={styles.label}>
        <span className={styles.dot} />
        电气回路信息
      </div>
    </div>
  );
  const introInfo = <div>产品介绍</div>;
  const items: item[] = [
    { label: '运行信息', children: runInfo },
    { label: '产品介绍', children: introInfo },
  ];

  useEffect(() => {
    run(id);
  }, [id]);

  return <Dialog open={open} onCancel={onCancel} items={items} loading={loading} />;
};

export default ChargeDialog;
