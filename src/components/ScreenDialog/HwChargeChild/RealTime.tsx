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
import Label from '@/components/Detail/DotLabel';
import useSubscribe from '@/pages/screen/useSubscribe';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { powerHourFormat, useFormat } from '@/utils/format';
import { LabelTypeEnum } from '@/components/ScreenDialog';

const RealTime: React.FC<RealTimeProps> = (props) => {
  const { id, loading, open = true, detailProps, labelType = LabelTypeEnum.DotLabel } = props;

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
          {labelType == LabelTypeEnum.DotLabel ? (
            <Label title="状态信息" />
          ) : (
            <Detail.Label title="状态信息" />
          )}
          <Detail
            data={equipmentData || {}}
            items={statusItems}
            column={4}
            {...(detailProps || {})}
          />
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
