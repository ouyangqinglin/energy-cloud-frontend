/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:45:21
 * @LastEditTime: 2023-06-27 14:45:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\HwChargeYt\RealTime.tsx
 */

import React, { useState, useEffect } from 'react';
import { Skeleton, Row, Col } from 'antd';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/DotLabel';
import useSubscribe from '@/pages/screen/useSubscribe';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { powerHourFormat, useFormat } from '@/utils/format';
import { getGuns } from '@/services/equipment';
import { arrayToMap } from '@/utils';
import { LabelTypeEnum } from '@/components/ScreenDialog';

const RealTime: React.FC<RealTimeProps> = (props) => {
  const { id, loading, open = true, detailProps, labelType = LabelTypeEnum.DotLabel } = props;

  const [aGunId, setAGunId] = useState('');
  const [bGunId, setBGunId] = useState('');
  const aGunData = useSubscribe(aGunId, open);
  const bGunData = useSubscribe(bGunId, open);
  const equipmentData = useSubscribe(id, open);

  useEffect(() => {
    if (open && id) {
      getGuns(id).then(({ data = [] }) => {
        const gunMap: Record<string, any> = arrayToMap(data || [], 'key', 'deviceId');
        setAGunId(gunMap.AGun);
        setBGunId(gunMap.BGun);
      });
    }
  }, [id, open]);

  const aStatusItems: DetailItem[] = [{ label: 'A枪状态', field: 'Status', format: useFormat }];
  const bStatusItems: DetailItem[] = [{ label: 'B枪状态', field: 'Status', format: useFormat }];
  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'todayCharge', format: powerHourFormat },
    { label: '累计充电量', field: 'Pimp', format: powerHourFormat },
  ];

  return (
    <>
      {loading ? (
        <>
          <Skeleton.Button className="mb12" size="small" active />
          <Row>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
          </Row>
        </>
      ) : (
        <>
          {labelType == LabelTypeEnum.DotLabel ? (
            <Label title="状态信息" />
          ) : (
            <Detail.Label title="状态信息" />
          )}
          <Row>
            <Col span={12}>
              <Detail data={aGunData} items={aStatusItems} column={2} />
            </Col>
            <Col span={12}>
              <Detail data={bGunData} items={bStatusItems} column={2} />
            </Col>
          </Row>
          {labelType == LabelTypeEnum.DotLabel ? (
            <Label title="运行信息" />
          ) : (
            <Detail.Label title="运行信息" />
          )}
          <Detail data={equipmentData || {}} items={runItems} column={4} {...(detailProps || {})} />
        </>
      )}
    </>
  );
};

export default RealTime;
