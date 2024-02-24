/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-21 14:31:10
 * @LastEditTime: 2024-02-21 14:31:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\index copy.tsx
 */
import React from 'react';
import { Row, Col } from 'antd';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import { DeviceDataType } from '@/services/equipment';
import ElectricDiagram from './ElectricDiagram';
import { DeviceTypeEnum } from '@/utils/dictionary';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type EnergyInfoType = {
  deviceData?: DeviceDataType;
  showLabel?: boolean;
  loading?: boolean;
  source?: EnergySourceEnum;
};

const newWindLiquidEnergy: (DeviceTypeEnum | undefined)[] = [
  DeviceTypeEnum.Liquid2Energy,
  DeviceTypeEnum.Wind2Energy,
  DeviceTypeEnum.PvEnergy,
  DeviceTypeEnum.SmallEnergy,
];

const EnergyInfo: React.FC<EnergyInfoType> = (props) => {
  const { deviceData, showLabel, loading, source } = props;

  return (
    <>
      <Row className="mb20" gutter={20}>
        <Col span={14}>
          <Cabinet
            deviceData={deviceData}
            showLabel={showLabel}
            loading={loading}
            source={source}
          />
        </Col>
        <Col span={10}>
          <Power deviceData={deviceData} loading={loading} source={source} />
          <Electric deviceData={deviceData} loading={loading} source={source} />
        </Col>
      </Row>
      {newWindLiquidEnergy.includes(deviceData?.productId) && (
        <ElectricDiagram deviceData={deviceData} />
      )}
    </>
  );
};

export default EnergyInfo;
