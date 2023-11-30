/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-27 19:08:24
 * @LastEditTime: 2023-07-27 19:08:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\config.ts
 */
import type { BasicDataNode } from 'rc-tree';
import type { DataNode } from 'antd/lib/tree';
import { DeviceDataType } from '@/services/equipment';
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
import { DeviceTypeEnum } from '@/utils/dictionary';

export type TreeNode = BasicDataNode & DataNode & DeviceDataType;

export const deviceMap = new Map([
  [DeviceTypeEnum.Ems, YTEmsOutlined],
  [DeviceTypeEnum.BWattBatteryStack, YTBmsOutlined],
  [DeviceTypeEnum.Pcs, YTCabinetOutlined],
  [DeviceTypeEnum.Air, YTAirOutlined],
  [DeviceTypeEnum.PvInverter11, YTPVInverterOutlined],
  [DeviceTypeEnum.YtCharge160, YTChargeOutlined],
  [DeviceTypeEnum.Energy, YTEnergyOutlined],
  [DeviceTypeEnum.ElectricMeter, YTMeterOutlined],
  [DeviceTypeEnum.PvInverterCabinet, YTMeterOutlined],
  [DeviceTypeEnum.HwCharge, YTChargeStackOutlined],
  [DeviceTypeEnum.HwChargeSuperChild, YTChargeOutlined],
  [DeviceTypeEnum.HwChargeChild, YTChargeOutlined],
  [DeviceTypeEnum.HwChargeYt, YTChargeOutlined],
  [DeviceTypeEnum.YtCharge120, YTChargeOutlined],
  [DeviceTypeEnum.YtCharge7, YTChargeOutlined],
  [DeviceTypeEnum.PvInverter4, YTPVInverterOutlined],
  [DeviceTypeEnum.EnergyCabinet, YTMeterOutlined],
  [DeviceTypeEnum.BoxSubstation, YTMeterOutlined],
  [DeviceTypeEnum.Cabinet, YTCabinetOutlined],
  [DeviceTypeEnum.YtCharge360, YTChargeStackOutlined],
  [DeviceTypeEnum.BatteryCluster, YTBmsOutlined],
  [DeviceTypeEnum.PvInverter36, YTPVInverterOutlined],
  [DeviceTypeEnum.BWattEms, YTEmsOutlined],
  [DeviceTypeEnum.BWattBatteryStack, YTBmsOutlined],
  [DeviceTypeEnum.BWattPcs, YTCabinetOutlined],
  [DeviceTypeEnum.BWattElectricMeter, YTMeterOutlined],
  [DeviceTypeEnum.BWattAir, YTAirOutlined],
  [DeviceTypeEnum.BWattBatteryCluster, YTBmsOutlined],
  [DeviceTypeEnum.BWattEnergy, YTEnergyOutlined],
  [DeviceTypeEnum.YunCharge120, YTChargeOutlined],
  [DeviceTypeEnum.GRWTPvInverter, YTPVInverterOutlined],
  [DeviceTypeEnum.YtCharge360LocalEms, YTChargeStackOutlined],
  [DeviceTypeEnum.HwChargeLocalEms, YTChargeStackOutlined],
  [DeviceTypeEnum.EnergyLocalEms, YTEnergyOutlined],
  [DeviceTypeEnum.PvInverter4LocalEms, YTPVInverterOutlined],
  [DeviceTypeEnum.PvInverter11LocalEms, YTPVInverterOutlined],
  [DeviceTypeEnum.YtCharge160LocalEms, YTChargeOutlined],
  [DeviceTypeEnum.YtCharge120LocalEms, YTChargeOutlined],
  [DeviceTypeEnum.YTEnergyEms, YTEmsOutlined],
  [DeviceTypeEnum.YTEnergyAir, YTAirOutlined],
  [DeviceTypeEnum.YTEnergyPcs, YTCabinetOutlined],
  [DeviceTypeEnum.YTEnergyMetter, YTMeterOutlined],
  [DeviceTypeEnum.YTEnergyBatteryStack, YTBmsOutlined],
  [DeviceTypeEnum.YTEnergy, YTEnergyOutlined],
  [DeviceTypeEnum.YTEnergyMetterRAIG, YTMeterOutlined],
  [DeviceTypeEnum.YTEnergyMetterDTSD, YTMeterOutlined],
  [DeviceTypeEnum.PvEnergy, YTEnergyOutlined],
  [DeviceTypeEnum.PvEnergyAir, YTAirOutlined],
  [DeviceTypeEnum.PvEnergyPcs, YTCabinetOutlined],
  [DeviceTypeEnum.PvEnergyMeter, YTMeterOutlined],
  [DeviceTypeEnum.PvEnergyBms, YTBmsOutlined],
]);
