/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-09-25 14:16:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\index.tsx
 */
import React from 'react';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { isEmpty } from '@/utils';
import RemoteSetting from './RemoteSetting';
import { DeviceTypeEnum } from '@/utils/dictionary';
import RemoteUpgrade from './RemoteUpgrade';

export type ConfigProps = {
  deviceData: any;
};
const remoteSettingType = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattAir];
const ConfigurationTab: React.FC<ConfigProps> = (props) => {
  const { deviceData } = props;
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

export default ConfigurationTab;
