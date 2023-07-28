/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-27 17:25:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\index.tsx
 */
import React from 'react';
import { Row, Col } from 'antd';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import { DeviceDataType } from '@/services/equipment';

export type EnergyInfoProps = {
  deviceData?: DeviceDataType;
  showLabel?: boolean;
};

const EnergyInfo: React.FC<EnergyInfoProps> = (props) => {
  const { deviceData, showLabel } = props;

  return (
    <>
      <Row gutter={20}>
        <Col span={14}>
          <Cabinet siteId={deviceData?.siteId} showLabel={showLabel} />
        </Col>
        <Col span={10}>
          <Power siteId={deviceData?.siteId} />
          <Electric siteId={deviceData?.siteId} />
        </Col>
      </Row>
    </>
  );
};

export default EnergyInfo;
