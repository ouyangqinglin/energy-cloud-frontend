/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-08 10:51:07
 * @LastEditTime: 2024-03-15 11:41:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\helper.tsx
 */

import { formatMessage, getPlaceholder, getPropsFromTree, isEmpty } from '@/utils';
import {
  deviceAlarmStatusFormat,
  emsConnectMethodFormat,
  onlineStatus1Format,
  onlineStatusFormat,
  powerFormat,
  powerHourFormat,
} from '@/utils/format';
import { DetailItem } from '../Detail';
import { DeviceProductTypeEnum, DeviceTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import { masterSlave1Enum, meterSerialNumberEnum } from '@/utils/dict';
import { DeviceDataType } from '@/services/equipment';

const connectFormat = (
  data: DeviceDataType[],
  productTypeIds: DeviceProductTypeEnum[],
  productIds: DeviceTypeEnum[],
) => {
  const result = getPropsFromTree(data, 'networkStatus', 'children', (item) => {
    return (
      productTypeIds.includes(item.productTypeId as any) ||
      productIds.includes(item?.productId as any)
    );
  });
  const value = result[0];
  if (isEmpty(value)) {
    return getPlaceholder(value);
  } else {
    return onlineStatusFormat(value);
  }
};

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
    field: 'adr',
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
    field: 'msid',
    format: (value) => masterSlave1Enum[value]?.text,
  },
  deviceCode: {
    label: formatMessage({ id: 'common.deviceCode', defaultMessage: '设备ID' }),
    field: 'devid',
  },
  externalIpAddress: {
    label: formatMessage({ id: 'device.externalIpAddress', defaultMessage: '外网IP' }),
    field: 'nadr',
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
  iccid: {
    label: 'ICCID',
    field: 'iccid',
  },
  upperComputerCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.upperComputer', defaultMessage: '上位机' }) },
    ),
    field: 'e601',
    format: onlineStatus1Format,
  },
  cloudPlatformCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.cloudPlatform', defaultMessage: '云平台' }) },
    ),
    field: 'e603',
    format: onlineStatus1Format,
  },
  thirdCloudPlatformCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.thirdCloudPlatform', defaultMessage: '第三方云平台' }) },
    ),
    field: 'e603',
    format: onlineStatus1Format,
  },
  lightBoardCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.lightBoard', defaultMessage: '灯板' }) },
    ),
    field: 'e607',
    format: onlineStatus1Format,
  },
  converterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.converter', defaultMessage: '变流器' }) },
    ),
    field: 'converterCommunication',
    showPlaceholder: false,
    format: (_, data) => connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.Pcs], []),
  },
  inverterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.inverter', defaultMessage: '逆变器' }) },
    ),
    field: 'inverterCommunication',
    showPlaceholder: false,
    format: (_, data) => connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.Pcs], []),
  },
  bmsCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: 'BMS' },
    ),
    field: 'bmsCommunication',
    showPlaceholder: false,
    format: (_, data) =>
      connectFormat(
        data?.deviceTreeData,
        [DeviceProductTypeEnum.BatteryStack, DeviceProductTypeEnum.BatteryCluster],
        [],
      ),
  },
  liquidCoolerCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'liquidCoolerCommunication',
    showPlaceholder: false,
    format: (_, data) => connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.Air], []),
    show: (_, data: DeviceDataType) => data.productId == DeviceTypeEnum.Liquid2Ems,
  },
  dehumidifierCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'dehumidifierCommunication',
    showPlaceholder: false,
    format: (_, data) =>
      connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.Dehumidifier], []),
    show: (_, data: DeviceDataType) => data.productId == DeviceTypeEnum.Liquid2Ems,
  },
  airCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'airCommunication',
    showPlaceholder: false,
    format: (_, data) => connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.Air], []),
    show: (_, data: DeviceDataType) =>
      data.productId == DeviceTypeEnum.Wind2EnergyEms ||
      data.productId == DeviceTypeEnum.SmallEnergyEms ||
      data.productId == DeviceTypeEnum.PvEnergyEms ||
      data.productId == DeviceTypeEnum.FGCCEnergyEms,
  },
  fireFightCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.fireFighting', defaultMessage: '消防' }) },
    ),
    field: 'fireFightCommunication',
    showPlaceholder: false,
    format: (_, data) => connectFormat(data?.deviceTreeData, [DeviceProductTypeEnum.FireFight], []),
  },
  gridMeterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.gridMeter', defaultMessage: '电网侧电表' }) },
    ),
    field: 'gridMeterCommunication',
    showPlaceholder: false,
    format: (_, data) =>
      connectFormat(
        data?.deviceTreeData,
        [],
        [DeviceTypeEnum.YTEnergyMetterAKR, DeviceTypeEnum.Liquid2ElectricMeter],
      ),
  },
  inverterMeterCommunication: {
    label: formatMessage(
      { id: 'device.communicationSentence', defaultMessage: '通信' },
      { name: formatMessage({ id: 'device.inverterMeter', defaultMessage: '逆变侧电表' }) },
    ),
    field: 'inverterMeterCommunication',
    showPlaceholder: false,
    format: (_, data) =>
      connectFormat(
        data?.deviceTreeData,
        [],
        [DeviceTypeEnum.YTEnergyMetterDTSD, DeviceTypeEnum.Liquid2InverterMeter],
      ),
  },
  meterSerialNumber: {
    label: formatMessage({ id: 'device.meterNumber', defaultMessage: '电表序号' }),
    field: 'MeterSerialNumber',
    show: (_, data) => [95, 96].includes(data?.productId),
    format: (value) => meterSerialNumberEnum[value]?.text,
  },
  emsCommunicationMethod: {
    label: formatMessage(
      { id: 'device.communicationMethodSentence', defaultMessage: '通信方式' },
      { name: 'EMS' },
    ),
    field: 'comm',
    format: emsConnectMethodFormat,
  },
  inverterCommunicationMethod: {
    label: formatMessage(
      { id: 'device.communicationMethodSentence', defaultMessage: '通信方式' },
      { name: formatMessage({ id: 'device.inverter', defaultMessage: '逆变器' }) },
    ),
    field: 'comm',
    format: emsConnectMethodFormat,
  },
  bcmuSn: {
    label: formatMessage(
      { id: 'common.serialSentence', defaultMessage: '序列号' },
      { name: 'BCMU' },
    ),
    field: 'b105',
  },
  bcmuManufacturer: {
    label: formatMessage(
      { id: 'common.manufacturerSentence', defaultMessage: '厂商' },
      { name: 'BCMU' },
    ),
    field: 'b106',
  },
  bcmuModel: {
    label: formatMessage({ id: 'common.modelSentence', defaultMessage: '型号' }, { name: 'BCMU' }),
    field: 'b107',
  },
  bcmuHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: 'BCMU' },
    ),
    field: 'hv',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyBatteryCluster &&
      data.productId != DeviceTypeEnum.PvEnergyBms,
  },
  bcmuSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: 'BCMU' },
    ),
    field: 'softVersion',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyBatteryCluster &&
      data.productId != DeviceTypeEnum.PvEnergyBms,
  },
  bauSn: {
    label: formatMessage(
      { id: 'common.serialSentence', defaultMessage: '序列号' },
      { name: 'BAU' },
    ),
    field: 'b105',
  },
  bauManufacturer: {
    label: formatMessage(
      { id: 'common.manufacturerSentence', defaultMessage: '厂商' },
      { name: 'BAU' },
    ),
    field: 'b106',
  },
  bauModel: {
    label: formatMessage({ id: 'common.modelSentence', defaultMessage: '型号' }, { name: 'BAU' }),
    field: 'b107',
  },
  bauHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: 'BAU' },
    ),
    field: 'hv',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyBatteryCluster &&
      data.productId != DeviceTypeEnum.PvEnergyBms,
  },
  bauSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: 'BAU' },
    ),
    field: 'softVersion',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyBatteryCluster &&
      data.productId != DeviceTypeEnum.PvEnergyBms,
  },
  bmuNumber: {
    label: formatMessage({ id: 'device.bmuNumber', defaultMessage: '电池模块个数' }),
    field: 'b121',
  },
  bsNumber: {
    label: formatMessage({ id: 'device.bsNumber', defaultMessage: '电池簇个数' }),
    field: 'b121',
  },
  airHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'hv',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyAir &&
      data.productId != DeviceTypeEnum.PvEnergyAir,
  },
  airSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.air', defaultMessage: '空调' }) },
    ),
    field: 'softVersion',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyAir &&
      data.productId != DeviceTypeEnum.PvEnergyAir,
  },
  hardwareVersion: {
    label: formatMessage({ id: 'device.hardwareVersion', defaultMessage: '硬件版本' }),
    field: 'hv',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyAir &&
      data.productId != DeviceTypeEnum.SmallEnergyFireFight &&
      data.productId != DeviceTypeEnum.PvEnergyFirFight,
  },
  softwareVersion: {
    label: formatMessage({ id: 'device.softwareVersion', defaultMessage: '软件版本' }),
    field: 'softVersion',
    show: (value, data) =>
      data.productId != DeviceTypeEnum.SmallEnergyAir &&
      data.productId != DeviceTypeEnum.SmallEnergyFireFight &&
      data.productId != DeviceTypeEnum.PvEnergyFirFight,
  },
  meterNumber: {
    label: formatMessage({ id: 'device.softwareVersion', defaultMessage: '电表序号' }),
    field: 'MeterSerialNumber',
  },
  meterAddress: {
    label: formatMessage({ id: 'device.meterAddress', defaultMessage: '电表地址' }),
    field: 'MeterAddress',
  },
  liquidCoolerHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'hv',
  },
  liquidCoolerSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.liquidCooler', defaultMessage: '液冷机' }) },
    ),
    field: 'softVersion',
  },
  compressorHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.compressor', defaultMessage: '压缩机' }) },
    ),
    field: 'y1',
  },
  compressorSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.compressor', defaultMessage: '压缩机' }) },
    ),
    field: 'y2',
  },
  softwareCoding: {
    label: formatMessage({ id: 'device.softwareCoding', defaultMessage: '软件编码' }),
    field: 'y3',
  },
  dehumidifierHardwareVersion: {
    label: formatMessage(
      { id: 'device.hardwareVersionSentence', defaultMessage: '硬件版本' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'hv',
  },
  dehumidifierSoftwareVersion: {
    label: formatMessage(
      { id: 'device.softwareVersionSentence', defaultMessage: '软件版本' },
      { name: formatMessage({ id: 'device.dehumidifier1', defaultMessage: '除湿机' }) },
    ),
    field: 'softVersion',
  },
  gunNumber: {
    label: formatMessage({ id: 'device.gunNumber', defaultMessage: '充电枪数量' }),
    field: 'gunNumber',
  },
  terminalNumber: {
    label: formatMessage({ id: 'device.terminalNumber', defaultMessage: '终端数量' }),
    field: 'terminalNumber',
  },
};

const emsKeys = [
  'ipAddress',
  'ratedPower',
  'ratedCapacity',
  'masterSlave',
  'deviceCode',
  'externalIpAddress',
  'emsHardwareVersion',
  'emsSoftwareVersion',
  'imeiNumber',
  'cloudPlatformCommunication',
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

const fgccEmsKeys = [
  'ipAddress',
  'ratedPower',
  'ratedCapacity',
  'masterSlave',
  'deviceCode',
  'externalIpAddress',
  'emsHardwareVersion',
  'emsSoftwareVersion',
  'imeiNumber',
  'iccid',
  'thirdCloudPlatformCommunication',
  'lightBoardCommunication',
  'inverterCommunication',
  'bmsCommunication',
  'liquidCoolerCommunication',
  'dehumidifierCommunication',
  'airCommunication',
  'fireFightCommunication',
  'gridMeterCommunication',
  'inverterMeterCommunication',
];

const pcsKeys = ['ratedPower', 'meterSerialNumber', 'emsCommunicationMethod'];
const pvEnergyPcsKeys = [
  'ratedPower',
  'meterSerialNumber',
  'hardwareVersion',
  'softwareVersion',
  'emsCommunicationMethod',
];

const bmsKeys = [
  'bcmuSn',
  'bcmuManufacturer',
  'bcmuModel',
  'bcmuHardwareVersion',
  'bcmuSoftwareVersion',
  'meterSerialNumber',
  'emsCommunicationMethod',
  'bmuNumber',
];

const fgccStackKeys = [
  'bauSn',
  'bauManufacturer',
  'bauModel',
  'bauHardwareVersion',
  'bauSoftwareVersion',
  'bsNumber',
  'emsCommunicationMethod',
];

const airKeys = [
  'airHardwareVersion',
  'airSoftwareVersion',
  'meterSerialNumber',
  'emsCommunicationMethod',
];

const fireFightKeys = [
  'hardwareVersion',
  'softwareVersion',
  'meterSerialNumber',
  'emsCommunicationMethod',
];

const meterKeys = ['meterNumber', 'meterAddress', 'meterSerialNumber', 'emsCommunicationMethod'];

const liquidCoolerKeys = [
  'liquidCoolerHardwareVersion',
  'liquidCoolerSoftwareVersion',
  'softwareCoding',
  // 'compressorHardwareVersion',
  'compressorSoftwareVersion',
  'meterSerialNumber',
  'emsCommunicationMethod',
];

const dehumidifierKeys = [
  'dehumidifierHardwareVersion',
  'dehumidifierSoftwareVersion',
  'meterSerialNumber',
  'emsCommunicationMethod',
];

const chargeKeys = ['ratedPower', 'gunNumber'];

const chargeStackKeys = ['ratedPower', 'gunNumber'];

const dynamoKeys = ['ratedPower', 'inverterCommunicationMethod'];

const productTypeIdKeysMap = new Map([
  [DeviceProductTypeEnum.Ems, emsKeys],
  [DeviceProductTypeEnum.Pcs, pcsKeys],
  [DeviceProductTypeEnum.BatteryStack, bmsKeys],
  [DeviceProductTypeEnum.BatteryCluster, bmsKeys],
  [DeviceProductTypeEnum.Air, airKeys],
  [DeviceProductTypeEnum.FireFight, fireFightKeys],
  [DeviceProductTypeEnum.Dehumidifier, dehumidifierKeys],
  [DeviceProductTypeEnum.EnergyElectricMeter, meterKeys],
  [DeviceProductTypeEnum.EnergyElectricMeter, meterKeys],
  [DeviceProductTypeEnum.Dynamo, dynamoKeys],
]);

const productIdKeysMap = new Map([
  [DeviceTypeEnum.Liquid2Air, liquidCoolerKeys],
  [DeviceTypeEnum.ChargeY601, chargeKeys],
  [DeviceTypeEnum.ChargeY602, chargeKeys],
  [DeviceTypeEnum.ChargeY801, chargeKeys],
  [DeviceTypeEnum.ChargeY802, chargeKeys],
  [DeviceTypeEnum.ChargeY801, chargeKeys],
  [DeviceTypeEnum.ChargeS2801, chargeStackKeys],
  [DeviceTypeEnum.PvEnergyPcs, pvEnergyPcsKeys],
  [DeviceTypeEnum.FGCCEnergyEms, fgccEmsKeys],
  [DeviceTypeEnum.FGCCEnergyBatteryStack, fgccStackKeys],
]);

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
