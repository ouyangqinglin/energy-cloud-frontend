/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 14:32:00
 * @LastEditTime: 2023-11-15 14:32:00
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\index.tsx
 */

import React from 'react';
import { Col, Row } from 'antd';
import { DeviceDataType } from '@/services/equipment';
import Overview from './Overview';
import Run from './Run';
import Power from './Power';
import Electric from './Electric';

export type PvEnergyMachineType = {
  deviceData: DeviceDataType;
};

const PvEnergyMachine: React.FC<PvEnergyMachineType> = (props) => {
  const { deviceData } = props;

  return (
    <>
      <Row gutter={20}>
        <Col span={14}>
          <Overview />
          <Run />
        </Col>
        <Col span={10}>
          <Power />
          <Electric />
        </Col>
      </Row>
    </>
  );
};

export default PvEnergyMachine;
