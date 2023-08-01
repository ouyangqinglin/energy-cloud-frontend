/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-28 16:33:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\index.tsx
 */
import React from 'react';
import { Row, Col } from 'antd';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import { DeviceDataType } from '@/services/equipment';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type EnergyInfoProps = {
  deviceData?: DeviceDataType;
  showLabel?: boolean;
  loading?: boolean;
  source?: EnergySourceEnum;
};

const EnergyInfo: React.FC<EnergyInfoProps> = (props) => {
  const { deviceData, showLabel, loading, source } = props;

  return (
    <>
      <Row gutter={20}>
        <Col span={14}>
          <Cabinet
            deviceData={deviceData}
            showLabel={showLabel}
            loading={loading}
            source={source}
          />
        </Col>
        <Col span={10}>
          <Power deviceData={deviceData} loading={loading} />
          <Electric deviceData={deviceData} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default EnergyInfo;
