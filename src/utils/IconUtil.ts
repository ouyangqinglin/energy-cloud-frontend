import * as AntdIcons from '@ant-design/icons';
import * as YTIcons from '@/components/YTIcons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import React from 'react';
import { DeviceProductTypeEnum } from './dictionary';
import {
  YTPVInverterOutlined,
  YTEnergyOutlined,
  YTEmsOutlined,
  YTBmsOutlined,
  YTAirOutlined,
  YTMeterOutlined,
  YTChargeOutlined,
  YTChargeStackOutlined,
  YTCabinetOutlined,
} from '@/components/YTIcons';

const allIcons: Record<string, any> = { ...AntdIcons, ...YTIcons };

export function getIcon(name: string): React.ReactNode | string {
  const icon = allIcons[name];
  return icon || '';
}

export function createIcon(
  icon: string | any,
  props: Partial<CustomIconComponentProps> = {},
): React.ReactNode | string {
  if (typeof icon === 'object') {
    return icon;
  }
  const ele = allIcons[icon];
  if (ele) {
    return React.createElement(allIcons[icon], props);
  }
  return '';
}

export const productTypeIconMap = new Map([
  [DeviceProductTypeEnum.ChargeStack, YTChargeStackOutlined],
  [DeviceProductTypeEnum.FastChargeTerminal, YTChargeOutlined],
  [DeviceProductTypeEnum.DCChargePile, YTChargeOutlined],
  [DeviceProductTypeEnum.ACChargePile, YTChargeOutlined],
  [DeviceProductTypeEnum.Energy, YTEnergyOutlined],
  [DeviceProductTypeEnum.PV, YTPVInverterOutlined],
  [DeviceProductTypeEnum.ExchangeCabinet, YTCabinetOutlined],
  [DeviceProductTypeEnum.Battery, YTBmsOutlined],
  [DeviceProductTypeEnum.OverchargeTerminal, YTChargeOutlined],
  [DeviceProductTypeEnum.ChargeGun, YTChargeOutlined],
  [DeviceProductTypeEnum.Ems, YTEmsOutlined],
  [DeviceProductTypeEnum.BatteryStack, YTBmsOutlined],
  [DeviceProductTypeEnum.BatteryPack, YTBmsOutlined],
  [DeviceProductTypeEnum.Pcs, YTBmsOutlined],
  [DeviceProductTypeEnum.BatteryCluster, YTBmsOutlined],
  [DeviceProductTypeEnum.Air, YTAirOutlined],
  [DeviceProductTypeEnum.ElectricMeter, YTMeterOutlined],
  [DeviceProductTypeEnum.LocalEms, YTEmsOutlined],
  [DeviceProductTypeEnum.EnergyElectricMeter, YTMeterOutlined],
  [DeviceProductTypeEnum.PvEnergy, YTEnergyOutlined],
  [DeviceProductTypeEnum.Dehumidifier, YTCabinetOutlined],
  [DeviceProductTypeEnum.FireFight, YTCabinetOutlined],
]);
