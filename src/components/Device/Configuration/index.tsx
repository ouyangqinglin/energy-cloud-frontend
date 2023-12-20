/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-12-20 15:44:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\index.tsx
 */
import React, { useMemo } from 'react';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { isEmpty } from '@/utils';
import RemoteSetting from './RemoteSetting';
import { DeviceServicePageEnum, DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import RemoteUpgrade from './RemoteUpgrade';
import SelfEmsIndex from './SelfEmsIndex';
import Control from '../Control';
import { useDeviceModel, useSubscribe } from '@/hooks';

export type ConfigProps = {
  deviceData: any;
  productId: string;
  deviceId: string;
};

const remoteSettingType = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattAir];

const ConfigurationTab: React.FC<ConfigProps> = (props) => {
  const { deviceData, productId, deviceId } = props;

  const { serviceGruop } = useDeviceModel({
    productId,
    isGroup: true,
    page: DeviceServicePageEnum.Config,
  });
  const realTimeData = useSubscribe(deviceId, true);

  return (
    <>
      <div className={deviceData?.status === OnlineStatusEnum.Offline ? 'device-offline' : ''}>
        {productId == (DeviceTypeEnum.YTEnergyEms as any) ? (
          <SelfEmsIndex
            deviceData={deviceData}
            productId={productId}
            deviceId={deviceId}
            realTimeData={realTimeData}
          />
        ) : (
          <div className="px24">
            {deviceData?.paramConfigType ? <Community deviceData={deviceData} /> : <></>}
            {!isEmpty(deviceData?.productConfigType) ? (
              <DeviceConfig deviceData={deviceData} />
            ) : (
              <></>
            )}
            {remoteSettingType.includes(deviceData?.productId) ? (
              <RemoteSetting deviceData={deviceData} />
            ) : (
              <></>
            )}
            <Control
              deviceId={deviceData?.deviceId}
              deviceData={deviceData}
              groupData={serviceGruop}
              realTimeData={realTimeData}
            />
            <RemoteUpgrade deviceId={deviceData?.deviceId} deviceData={deviceData} />
          </div>
        )}
      </div>
    </>
  );
};

export default ConfigurationTab;
