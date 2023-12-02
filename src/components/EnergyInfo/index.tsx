/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-07-28 16:33:34
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { Row, Col } from 'antd';
import Cabinet from './Cabinet';
import Power from './Power';
import Electric from './Electric';
import { DeviceDataType } from '@/services/equipment';
import MasterSlaveGroup from './MasterSlaveGroup';

export enum EnergySourceEnum {
  SiteMonitor,
  DeviceManage,
}

export type EnergyInfoProps = {
  deviceData?: DeviceDataType;
  showLabel?: boolean;
  loading?: boolean;
  source?: EnergySourceEnum;
  emsGroupData: any; //ems主从分组数据加所有设备数据
  loadingGroupData: boolean;
};

const EnergyInfo: React.FC<EnergyInfoProps> = (props) => {
  const { deviceData, showLabel, loading, source, emsGroupData, loadingGroupData } = props;
  // groupId为-1代表无主从（以前的），!=-1代表EMS主从设备，主从混合暂不考虑
  const groupId = useMemo(() => {
    let isGroup = '';
    if (emsGroupData) {
      isGroup = emsGroupData[0]?.groupId || '';
    }
    return isGroup;
  }, [emsGroupData]);
  return (
    <>
      <Row gutter={20}>
        <Col span={14}>
          {+groupId != -1 ? (
            <>
              <MasterSlaveGroup
                emsGroupData={emsGroupData}
                loadingEmsTabs={loadingGroupData}
                deviceData={deviceData}
              />
            </>
          ) : (
            <Cabinet
              deviceData={deviceData}
              showLabel={showLabel}
              loading={loading}
              source={source}
            />
          )}
        </Col>
        <Col span={10}>
          <Power deviceData={deviceData} loading={loading} source={source} />
          <Electric deviceData={deviceData} loading={loading} source={source} />
        </Col>
      </Row>
    </>
  );
};

export default EnergyInfo;
