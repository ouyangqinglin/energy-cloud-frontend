/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-07-04 10:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React, { useMemo } from 'react';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import EnergyManageTab from './EnergyManageTab';
import SystemSetting from './SystemSetting';
import ConverterSetting from './ConverterSetting';
import BatterySetting from './BatterySetting';
import styles from './index.less';
import { useSubscribe } from '@/hooks';
import { OnlineStatusEnum } from '@/utils/dictionary';
import type { DeviceDataType } from '@/services/equipment';
export type ConfigProps = {
  deviceId: string;
  productId: string;
  deviceData: DeviceDataType;
};

const SelfEmsIndex: React.FC<ConfigProps> = (props) => {
  const { deviceId, productId, deviceData } = props;
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(deviceId, openSubscribe);
  realTimeData.emsSn = (deviceData.config && JSON.parse(deviceData.config)?.emsSn) || '';
  realTimeData.paramConfigType = deviceData.paramConfigType;
  // mock
  // realTimeData = {
  //   SysEnableSelfStartFunction: 0,
  //   MunicipalChargingFunctionEnabled: 1,
  //   EnableOffGridOperationFunction: 0,
  //   EnableGridConnectionFunction: 1,
  //   emsSn: 123456,
  //   paramConfigType: 6,
  //   generalChargingPowerLimit: 1,
  //   severeChargingPowerLimit: 2,
  //   generalInverterPowerLimit: 3,
  //   severeInverterPowerLimitation: 4,
  //   converterGeneralOvervoltageLimit: 5,
  //   converterSevereOvervoltageLimit: 6,
  //   converterGeneralUndervoltageLimit: 7,
  //   converterSevereUndervoltageLimit: 8,
  //   converterGeneralChargingCurrentLimit: 9,
  //   converterSevereChargingCurrentLimit: 10,
  //   generalInverterCurrentLimit: 11,
  //   severeInverterCurrentLimit: 12,
  //   converterGeneralOverTemperatureLimit: 13,
  //   converterSevereOverTemperatureLimit: 14,
  //   converterGeneralLowTemperatureLimit: 15,
  //   converterSevereLowTemperatureLimit: 16,
  //   antiBackflowThreshold: 11,
  //   maximumLoadOfTransformer: 22,
  //   maxAllowableChargingVoltage: 1,
  //   overVoltageErrorClearDifference: 2,
  //   minAllowableChargingVoltage: 3,
  //   lowVoltageErrorClearDifference: 4,
  //   maxAllowableTemperature: 5,
  //   overTempErrorClearDifference: 6,
  //   minAllowableTemp: 7,
  //   lowTempErrorClearDifference: 8,
  //   maxAllowableVoltageOfBatteryPack: 9,
  //   overVoltageErrorDifferenceOfBatteryPack: 10,
  //   maxAllowableChargingCurrentOfBatteryPack: 11,
  //   maxAllowableDischargeCurrentOfBatteryPack: 12,
  //   generalOvervoltageLimit: 13,
  //   severeOvervoltageLimit: 14,
  //   generalUndervoltageLimit: 15,
  //   severeUndervoltageLimit: 16,
  //   generalChargingCurrentLimit: 17,
  //   severeChargingCurrentLimit: 18,
  //   generalDischargeCurrentLimit: 19,
  //   severeDischargeCurrentLimit: 20,
  //   generalOverTemperatureLimit: 21,
  //   severeOverTemperatureLimit: 22,
  //   generalLowTemperatureLimit: 23,
  //   severeLowTemperatureLimit: 24,
  //   EnableBatterySystemSelfStartFunction: 1,
  // };
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `系统设置`,
      children: (
        <SystemSetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    },
    {
      key: '2',
      label: `变流器设置`,
      children: (
        <ConverterSetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    },
    {
      key: '3',
      label: `电池设置`,
      children: (
        <BatterySetting deviceId={deviceId} productId={productId} realTimeData={realTimeData} />
      ),
    },
    {
      key: '4',
      label: `能量管理`,
      children: (
        <EnergyManageTab productId={productId} deviceId={deviceId} realTimeData={realTimeData} />
      ),
    },
  ];

  return <Tabs className={styles.tabs} tabBarGutter={34} items={items} />;
};

export default SelfEmsIndex;
