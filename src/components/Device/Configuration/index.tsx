/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-31 16:22:51
 * @LastEditTime: 2023-12-27 20:00:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { useBoolean } from 'ahooks';

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
  const [emptyNum, setEmptyNum] = useState(0);
  const { serviceGruop } = useDeviceModel({
    productId,
    isGroup: true,
    page: DeviceServicePageEnum.Config,
  });
  const realTimeData = useSubscribe(deviceId, true);

  const onLoadChange = useCallback(() => {
    setTimeout(() => {
      setEmptyNum(containRef?.current?.innerText?.trim?.() ? Math.random() + 1 : 0);
    }, 300);
  }, []);

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
                onLoadChange={onLoadChange}
              />
              {oldRemoteUpgradeProductIds.includes(deviceData?.productId) && (
                <RemoteUpgrade deviceId={deviceData?.deviceId} />
              )}
            </div>
            {(!containRef?.current?.innerText || !emptyNum) && <Empty className="mt20" />}
          </>
        )}
      </div>
    </>
  );
};

export default ConfigurationTab;
