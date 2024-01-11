/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-08 10:51:07
 * @LastEditTime: 2024-01-11 11:23:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\helper.tsx
 */

import { formatMessage } from '@/utils';
import {
  deviceAlarmStatusFormat,
  onlineStatusFormat,
  powerFormat,
  powerHourFormat,
} from '@/utils/format';
import { DetailItem } from '../Detail';
import { DeviceProductTypeEnum, DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { connectEnum, masterSlaveEnum } from '@/utils/dict';
import { DeviceDataType } from '@/services/equipment';

export const topItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.communication', defaultMessage: '通信' }),
    field: 'networkStatus',
    format: onlineStatusFormat,
  },
  {
    label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
    field: 'alarmStatus',
    format: (value, data) => {
      return (
        <>
          <span className="flex">
            {deviceAlarmStatusFormat(value)}
            <span className="ml8">{data?.alarmCount}</span>
          </span>
        </>
      );
    },
  },
  {
    label: formatMessage({ id: 'siteMonitor.recentOfflineTime', defaultMessage: '最近离线时间' }),
    field: 'offlineTime',
    show: (_, data) => data?.networkStatus === OnlineStatusEnum.Offline,
  },
  {
    label: formatMessage({ id: 'siteMonitor.recentOnlineTime', defaultMessage: '最近在线时间' }),
    field: 'sessionStartTime',
    show: (_, data) => data?.networkStatus !== OnlineStatusEnum.Offline,
  },
  {
    label: formatMessage({ id: 'siteMonitor.activationTime', defaultMessage: '激活时间' }),
    field: 'activeTime',
  },
  {
    label: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
    field: 'sn',
  },
  {
    label: formatMessage({ id: 'device.equipmentManufacturer', defaultMessage: '设备厂商' }),
    field: 'factoryName',
  },
  { label: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }), field: 'model' },
  {
    label: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    field: 'productTypeName',
  },
];

export const bottomItems: DetailItem[] = [
  {
    label: formatMessage({ id: 'siteMonitor.entryTime', defaultMessage: '录入时间' }),
    field: 'createTime',
  },
  {
    label: formatMessage({ id: 'siteMonitor.enteredBy', defaultMessage: '录入人' }),
    field: 'createUserName',
  },
  {
    label: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
    field: 'siteName',
  },
];

export const allItems: Record<string, DetailItem> = {
  ipAddress: {
    label: formatMessage({ id: 'common.ipAddress', defaultMessage: 'IP地址' }),
    field: 'ipAddress',
  },
  ratedPower: {
    label: formatMessage({ id: 'device.ratedPower', defaultMessage: '额定功率' }),
    field: 'ratedOutputPower',
    format: powerFormat,
  },
  ratedCapacity: {
    label: formatMessage({ id: 'device.ratedCapacity', defaultMessage: '额定容量' }),
    field: 'ratedCapacity',
    format: powerHourFormat,
  },
  masterSlave: {
    label: formatMessage({ id: 'device.masterSlaveIdentification', defaultMessage: '主从标识' }),
    field: 'd',
    format: (value) => masterSlaveEnum[value],
  },
  deviceCode: {
    label: formatMessage({ id: 'common.deviceCode', defaultMessage: '设备编码' }),
    field: 'deviceId',
  },
  externalIpAddress: {
    label: formatMessage({ id: 'common.ipAddress', defaultMessage: '外网IP' }),
    field: 'nadr',
  },
  emsSn: {
    label: formatMessage({ id: 'common.equipmentEmsSerial', defaultMessage: 'EMS序列号' }),
    field: 'emsSn',
  },
  emsHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: 'EMS' },
    ),
    field: 'hv',
  },
  emsSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: 'EMS' },
    ),
    field: 'softVersion',
  },
  imeiNumber: {
    label: formatMessage({ id: 'device.imeiNumber', defaultMessage: 'IMEI号' }),
    field: 'imei',
  },
  upperComputerCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.upperComputer', defaultMessage: '上位机' }) },
    ),
    field: 'e601',
    format: (value) => connectEnum[value]?.text,
  },
  cloudPlatformCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.cloudPlatform', defaultMessage: '云平台' }) },
    ),
    field: 'e603',
    format: (value) => connectEnum[value]?.text,
  },
  ytCloudCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.YTCloud', defaultMessage: '永泰云' }) },
    ),
    field: 'networkStatus',
    format: (value) => connectEnum[value]?.text,
  },
  lightBoardCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.lightBoard', defaultMessage: '灯板' }) },
    ),
    field: 'e607',
    format: (value) => connectEnum[value]?.text,
  },
  converterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.converter', defaultMessage: '变流器' }) },
    ),
    field: 'converterCommunication',
    format: (value) => connectEnum[value]?.text,
  },
  bmsCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: 'BMS' },
    ),
    field: 'bmsCommunication',
    format: (value) => connectEnum[value]?.text,
  },
  liquidCoolerCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'liquidCoolerCommunication',
    format: (value) => connectEnum[value]?.text,
    show: (_, data: DeviceDataType) => data.productId == DeviceTypeEnum.Liquid2Ems,
  },
  dehumidifierCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'dehumidifierCommunication',
    format: (value) => connectEnum[value]?.text,
    show: (_, data: DeviceDataType) => data.productId == DeviceTypeEnum.Liquid2Ems,
  },
  airCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'airCommunication',
    format: (value) => connectEnum[value]?.text,
    show: (_, data: DeviceDataType) => data.productId == DeviceTypeEnum.Wind2EnergyEms,
  },
  fireFightCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.fireFighting', defaultMessage: '空调' }) },
    ),
    field: 'fireFightCommunication',
    format: (value) => connectEnum[value]?.text,
  },
  gridMeterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.gridMeter', defaultMessage: '电网侧电表' }) },
    ),
    field: 'gridMeterCommunication',
    format: (value) => connectEnum[value]?.text,
  },
  inverterMeterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.inverterMeter', defaultMessage: '逆变侧电表' }) },
    ),
    field: 'inverterMeterCommunication',
    format: (value) => connectEnum[value]?.text,
  },
  emsCommunicationMethod: {
    label: formatMessage(
      { id: 'device.communicationMethodSentence', defaultMessage: '通信方式' },
      { name: 'EMS' },
    ),
    field: 'emsCommunicationMethod',
  },
  emsCommunicationStatus: {
    label: formatMessage(
      { id: 'device.communicationStatusWithSentence', defaultMessage: '通信状态' },
      { name: 'EMS' },
    ),
    field: 'emsCommunicationStatus',
    format: (value) => connectEnum[value]?.text,
  },
  bcmuSn: {
    label: formatMessage(
      { id: 'common.serialSentence', defaultMessage: '序列号' },
      { name: 'BCMU' },
    ),
    field: 'bcmuSn',
  },
  bcmuManufacturer: {
    label: formatMessage(
      { id: 'common.manufacturerSentence', defaultMessage: '厂商' },
      { name: 'BCMU' },
    ),
    field: 'bcmuManufacturer',
  },
  bcmuModel: {
    label: formatMessage({ id: 'common.modelSentence', defaultMessage: '型号' }, { name: 'BCMU' }),
    field: 'bcmuModel',
  },
  bcmuHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: 'BCMU' },
    ),
    field: 'bcmuHardwareVersion',
  },
  bcmuSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: 'BCMU' },
    ),
    field: 'bcmuSoftwareVersion',
  },
  bmuNumber: {
    label: formatMessage({ id: 'device.bmuNumber', defaultMessage: '电池模块个数' }),
    field: 'bmuNumber',
  },
  airHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'airHardwareVersion',
  },
  airSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'airSoftwareVersion',
  },
  hardwareVersion: {
    label: formatMessage({ id: 'device.hardwareVersion', defaultMessage: '硬件版本' }),
    field: 'hardwareVersion',
  },
  softwareVersion: {
    label: formatMessage({ id: 'device.softwareVersion', defaultMessage: '软件版本' }),
    field: 'softwareVersion',
  },
  meterNumber: {
    label: formatMessage({ id: 'device.softwareVersion', defaultMessage: '电表序号' }),
    field: 'meterNumber',
  },
  meterAddress: {
    label: formatMessage({ id: 'device.meterAddress', defaultMessage: '电表地址' }),
    field: 'meterAddress',
  },
  liquidCoolerHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'liquidCoolerHardwareVersion',
  },
  liquidCoolerSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'liquidCoolerSoftwareVersion',
  },
  compressorHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.compressor', defaultMessage: '压缩机' }) },
    ),
    field: 'compressorHardwareVersion',
  },
  compressorSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.compressor', defaultMessage: '压缩机' }) },
    ),
    field: 'compressorSoftwareVersion',
  },
  softwareCoding: {
    label: formatMessage({ id: 'device.softwareCoding', defaultMessage: '软件编码' }),
    field: 'softwareCoding',
  },
  dehumidifierHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'dehumidifierHardwareVersion',
  },
  dehumidifierSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'dehumidifierSoftwareVersion',
  },
};

const emsKeys = [
  'ipAddress',
  'ratedPower',
  'ratedCapacity',
  'masterSlave',
  'deviceCode',
  'externalIpAddress',
  'emsSn',
  'emsHardwareVersion',
  'emsSoftwareVersion',
  'imeiNumber',
  'upperComputerCommunication',
  'cloudPlatformCommunication',
  'ytCloudCommunication',
  'lightBoardCommunication',
  'converterCommunication',
  'bmsCommunication',
  'liquidCoolerCommunication',
  'dehumidifierCommunication',
  'airCommunication',
  'fireFightCommunication',
  'gridMeterCommunication',
  'inverterMeterCommunication',
];

const pcsKeys = ['ratedPower', 'emsCommunicationMethod', 'emsCommunicationStatus'];

const bmsKeys = [
  'bcmuSn',
  'bcmuManufacturer',
  'bcmuModel',
  'bcmuHardwareVersion',
  'bcmuSoftwareVersion',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
  'bmuNumber',
];

const airKeys = [
  'airHardwareVersion',
  'airSoftwareVersion',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
];

const fireFightKeys = [
  'hardwareVersion',
  'softwareVersion',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
];

const meterKeys = [
  'meterNumber',
  'meterAddress',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
];

const liquidCoolerKeys = [
  'liquidCoolerHardwareVersion',
  'liquidCoolerSoftwareVersion',
  'softwareCoding',
  'compressorHardwareVersion',
  'compressorSoftwareVersion',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
];

const dehumidifierKeys = [
  'dehumidifierHardwareVersion',
  'dehumidifierSoftwareVersion',
  'emsCommunicationMethod',
  'emsCommunicationStatus',
];

const productTypeIdKeysMap = new Map([
  [DeviceProductTypeEnum.Ems, emsKeys],
  [DeviceProductTypeEnum.Pcs, pcsKeys],
  [DeviceProductTypeEnum.BatteryStack, bmsKeys],
  [DeviceProductTypeEnum.BatteryCluster, bmsKeys],
  [DeviceProductTypeEnum.Air, airKeys],
  [DeviceProductTypeEnum.FireFight, fireFightKeys],
  [DeviceProductTypeEnum.Dehumidifier, dehumidifierKeys],
  [DeviceProductTypeEnum.EnergyElectricMeter, meterKeys],
]);

const productIdKeysMap = new Map([[DeviceTypeEnum.Liquid2Air, liquidCoolerKeys]]);

export const getDetailItems = (data?: DeviceDataType) => {
  const result: DetailItem[] = [];
  if (
    data?.productId &&
    data.productTypeId &&
    (data?.productId as any) >= DeviceTypeEnum.Liquid2Ems
  ) {
    (
      productIdKeysMap.get(data?.productId) || productTypeIdKeysMap.get(data.productTypeId)
    )?.forEach?.((item) => {
      const detailItem = allItems?.[item];
      if (detailItem) {
        result.push(detailItem);
      }
    });
  }
  return result;
};
