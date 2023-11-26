/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:17:13
 * @LastEditTime: 2023-11-26 13:51:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\index.tsx
 */
import React, { useMemo, useCallback, useState, useEffect } from 'react';
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
  emsGroupData?: any; //ems主从分组数据加所有设备数据
  loadingGroupData?: boolean;
};

const EnergyInfo: React.FC<EnergyInfoProps> = (props) => {
  const { deviceData, showLabel, loading, source, emsGroupData, loadingGroupData } = props;
  const [deviceKey, setDeviceKey] = useState();
  // groupId为-1代表无主从（以前的），!=-1代表EMS主从设备，主从混合暂不考虑
  const groupId = useMemo(() => {
    return emsGroupData?.[0]?.groupId ?? -1;
  }, [emsGroupData]);

  useEffect(() => {
    if (emsGroupData) {
      const initDeviceKey = emsGroupData[0]?.devices[0].deviceId || '';
      setDeviceKey(initDeviceKey);
    }
  }, [emsGroupData]);

  const getUnitEchartsParameters = useCallback(
    (key) => {
      setDeviceKey(key);
    },
    [deviceKey],
  );

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
                getUnitEchartsParameters={getUnitEchartsParameters}
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
          <Power deviceData={deviceData} loading={loading} source={source} deviceKey={deviceKey} />
          <Electric
            deviceData={deviceData}
            loading={loading}
            source={source}
            deviceKey={deviceKey}
          />
        </Col>
      </Row>
    </>
  );
};

export default EnergyInfo;
