/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 10:49:21
 * @LastEditTime: 2023-06-27 10:49:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\YtCharge\RealTime.tsx
 */
import React, { useState, useEffect } from 'react';
import { Skeleton, Row, Col } from 'antd';
import Meter, { MeterSkeleton } from '@/components/Meter';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/label';
import useSubscribe from '@/pages/screen/useSubscribe';
import { getRelatedDevice, getGuns } from '@/services/equipment';
import { arrayToMap } from '@/utils';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { useFormat, powerHourFormat } from '@/utils/format';

const RealTime: React.FC<RealTimeProps> = (props) => {
  const { id, loading, open = true } = props;

  const [relatedIds, setRelatedIds] = useState([]);
  const [aGunId, setAGunId] = useState('');
  const [bGunId, setBGunId] = useState('');
  const aGunData = useSubscribe(aGunId, open);
  const bGunData = useSubscribe(bGunId, open);
  const meterData = useSubscribe(relatedIds, open);

  useEffect(() => {
    if (open && id) {
      getRelatedDevice(id).then((res) => {
        if (res?.data?.associatedIds) {
          setRelatedIds(res.data.associatedIds);
        }
      });
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
          <Skeleton.Button className="mb12" size="small" active />
          <Row>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
          </Row>
          <MeterSkeleton />
        </>
      ) : (
        <>
          <Label title="状态信息" />
          <Row>
            <Col span={12}>
              <Detail data={aGunData} items={aStatusItems} column={2} />
            </Col>
            <Col span={12}>
              <Detail data={bGunData} items={bStatusItems} column={2} />
            </Col>
          </Row>
          <Label title="运行信息" />
          <Detail data={{ ...meterData }} items={runItems} column={4} />
          <Meter data={meterData} />
        </>
      )}
    </>
  );
};

export default RealTime;
