/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-12-25 15:17:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\index.tsx
 */
import React, { useMemo, useRef } from 'react';
import Community from './Community';
import DeviceConfig from './DeviceConfig';
import { isEmpty } from '@/utils';
import RemoteSetting from './RemoteSetting';
import { DeviceServicePageEnum, DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import RemoteUpgrade from '../module/RemoteUpgrade';
import SelfEmsIndex from './SelfEmsIndex';
import Control from '../Control';
import { useDeviceModel, useSubscribe } from '@/hooks';
import { Empty } from 'antd';

export type ConfigProps = {
  deviceData: any;
  productId?: DeviceTypeEnum;
  deviceId: string;
};

const remoteSettingType = [DeviceTypeEnum.Ems, DeviceTypeEnum.BWattAir];
const oldRemoteUpgradeProductIds = [
  DeviceTypeEnum.ExchangePowerCabinet,
  DeviceTypeEnum.Ems,
  DeviceTypeEnum.BWattEms,
];

const ConfigurationTab: React.FC<ConfigProps> = (props) => {
  const { deviceData, productId, deviceId } = props;

  const containRef = useRef<HTMLDivElement>(null);
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
          <>
            <div ref={containRef} className="px24">
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
              {oldRemoteUpgradeProductIds.includes(deviceData?.productId) && (
                <RemoteUpgrade deviceId={deviceData?.deviceId} />
              )}
            </div>
            {!containRef?.current?.innerText && <Empty className="mt20" />}
          </>
        )}
      </div>
    </>
  );
};

export default ConfigurationTab;
