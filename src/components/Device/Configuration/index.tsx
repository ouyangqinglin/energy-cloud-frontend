/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-09-25 14:16:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\index.tsx
 */
import React, { useEffect, useMemo } from 'react';
import { useRequest } from 'umi';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { getEquipInfo } from '@/services/equipment';
import { isEmpty } from '@/utils';
import Empty from 'antd/es/empty';
import RemoteSetting from './RemoteSetting';
import { DeviceTypeEnum } from '@/utils/dictionary';
import RemoteUpgrade from './RemoteUpgrade';

export type ConfigProps = {
  deviceId: string;
};

const remoteSettingType = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattAir];

const Configuration: React.FC<ConfigProps> = (props) => {
  const { deviceId } = props;

  const { data: deviceData, run } = useRequest(getEquipInfo, { manual: true });

  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
  }, [deviceId]);

  return (
    <>
      <div className="px24">
        {deviceData?.paramConfigType ? <Community deviceData={deviceData} /> : <></>}
        {!isEmpty(deviceData?.productConfigType) ? <DeviceConfig deviceData={deviceData} /> : <></>}
        {remoteSettingType.includes(deviceData?.productId) ? (
          <RemoteSetting deviceData={deviceData} />
        ) : (
          <></>
        )}
        <RemoteUpgrade deviceId={deviceData?.deviceId} />
      </div>
    </>
  );
};

export default Configuration;
