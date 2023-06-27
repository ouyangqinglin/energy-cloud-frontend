/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:41:09
 * @LastEditTime: 2023-06-27 14:41:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\HwChargeChild\RealTime.tsx
 */

import React from 'react';
import { Skeleton, Row, Col } from 'antd';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/label';
import useSubscribe from '@/pages/screen/useSubscribe';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { powerHourFormat, useFormat } from '@/utils/format';

const RealTime: React.FC<RealTimeProps> = (props) => {
  const { id, loading, open = true } = props;

  const equipmentData = useSubscribe(id, open);

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'a', format: useFormat },
    { label: 'B枪状态', field: 'b', format: useFormat },
  ];
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
        </>
      ) : (
        <>
          <Label title="状态信息" />
          <Detail data={equipmentData || {}} items={statusItems} column={4} />
          <Label title="运行信息" />
          <Detail data={equipmentData || {}} items={runItems} column={4} />
        </>
      )}
    </>
  );
};

export default RealTime;
