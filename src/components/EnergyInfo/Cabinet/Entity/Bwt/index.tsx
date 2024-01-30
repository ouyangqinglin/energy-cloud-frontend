/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-01-29 11:30:32
 * @LastEditTime: 2024-01-29 16:36:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\EnergyInfo\Cabinet\Entity\Bwt\index.tsx
 */

import React from 'react';
import { EntityType } from '../../type';
import Model from '../../Model';
import EnergyImg from '@/assets/image/station/energy/enery.png';
import { ConfigType } from '../../type';
import { formatMessage } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import {
  bwattAirWorkFormat,
  chargeFormat,
  doorFormat,
  electricModelFormat,
  modelFormat,
  percentageFormat,
  powerFormat,
  runFormat,
  tempFormat,
  voltageFormat,
  wetFormat,
  workFormat,
} from '@/utils/format';
import AirImg from '@/assets/image/station/energy/air.png';
import AirLineImg from '@/assets/image/station/energy/air-line.png';
import DoorImg from '@/assets/image/station/energy/door.png';
import DoorLineImg from '@/assets/image/station/energy/door-line.png';
import EmsImg from '@/assets/image/station/energy/ems.png';
import EmsLineImg from '@/assets/image/station/energy/ems-line.png';
import StackImg from '@/assets/image/station/energy/stack.png';
import StackLineImg from '@/assets/image/station/energy/stack-line.png';
import PeakImg from '@/assets/image/station/energy/peak.png';
import PeakLineImg from '@/assets/image/station/energy/pack-line.png';
import PcsImg from '@/assets/image/station/energy/pcs.png';
import PcsLineImg from '@/assets/image/station/energy/pcs-line.png';
import { getPackItems } from '../../helper';

const energyPowerFormat = (value: number, data: any) => {
  return (
    <span>
      {powerFormat(value)}({chargeFormat(data.CADI)})
    </span>
  );
};

const configs: ConfigType[] = [
  {
    label: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }),
    productTypeId: DeviceProductTypeEnum.Air,
    position: { top: 51, left: 2 },
    icon: AirImg,
    line: AirLineImg,
    linePosition: { top: 11, left: 94 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
        field: 'AirConditioningUnitOperationStatus',
        customFormat: bwattAirWorkFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.roomTemperature', defaultMessage: '室内温度' }),
        field: 'IndoorTemperature',
        customFormat: tempFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.humidness', defaultMessage: '湿度' }),
        field: 'Humidity',
        customFormat: wetFormat,
      },
    ],
  },
  {
    label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    showLabel: false,
    position: { top: 203, left: 2 },
    icon: DoorImg,
    line: DoorLineImg,
    linePosition: { top: 11, left: 152 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.storageDoor', defaultMessage: '储能仓门' }),
        field: 'AccessControlStatus',
        customFormat: doorFormat,
      },
    ],
  },
  {
    label: 'EMS',
    productTypeId: DeviceProductTypeEnum.Ems,
    position: { top: 302, left: 2 },
    icon: EmsImg,
    line: EmsLineImg,
    linePosition: { top: 11, left: 87 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' }),
        field: 'emsSysStatus',
        customFormat: runFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.systemModel', defaultMessage: '系统模式' }),
        field: 'sysModel',
        customFormat: modelFormat,
      },
    ],
  },
  {
    label: formatMessage({ id: 'siteMonitor.batteryPile', defaultMessage: '电池堆' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 450, left: 2 },
    icon: StackImg,
    line: StackLineImg,
    linePosition: { top: -74, left: 97 },
    data: [
      {
        label: 'SOC',
        field: 'SOC',
        customFormat: percentageFormat,
      },
    ],
  },
  {
    label: formatMessage({ id: 'siteMonitor.monomerInformation', defaultMessage: '单体极值信息' }),
    productTypeId: DeviceProductTypeEnum.BatteryStack,
    position: { top: 185, left: 802 },
    icon: PeakImg,
    line: PeakLineImg,
    linePosition: { top: 11, left: -60 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.maxVoltage', defaultMessage: '最高电压' }),
        field: 'MVVOASU',
        customFormat: voltageFormat,
      },
      {
        label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
        field: 'MaxNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minVoltage', defaultMessage: '最低电压' }),
        field: 'MVVOSU',
        customFormat: voltageFormat,
      },
      {
        label: formatMessage({ id: 'device.cellNumber', defaultMessage: '电芯编号' }),
        field: 'MNOIV',
      },
      {
        label: formatMessage({ id: 'siteMonitor.maxTemperature', defaultMessage: '最高温度' }),
        field: 'MaximumIndividualTemperature',
        customFormat: tempFormat,
      },
      {
        label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
        field: 'MITN',
      },
      {
        label: formatMessage({ id: 'siteMonitor.minTemperature', defaultMessage: '最低温度' }),
        field: 'LVOMT',
        customFormat: tempFormat,
      },
      {
        label: formatMessage({ id: 'device.temperaturePoint', defaultMessage: '温度点' }),
        field: 'MNOIT',
      },
    ],
  },
  {
    label: 'PCS',
    productTypeId: DeviceProductTypeEnum.Pcs,
    dataProductTypeIds: [DeviceProductTypeEnum.BatteryStack],
    position: { top: 487, left: 802 },
    icon: PcsImg,
    line: PcsLineImg,
    linePosition: { top: 11, left: -233 },
    data: [
      {
        label: formatMessage({ id: 'siteMonitor.workingMode', defaultMessage: '工作模式' }),
        field: 'CurrentChargingAndDischargingModel',
        customFormat: electricModelFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.workingCondition', defaultMessage: '工作状态' }),
        field: 'WorkStatus',
        customFormat: workFormat,
      },
      {
        label: formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' }),
        field: 'P',
        customFormat: energyPowerFormat,
      },
    ],
  },
];

const Bwt: React.FC<EntityType> = (props) => {
  const { ...restProps } = props;

  return (
    <>
      <Model
        modelStyle={{
          backgroundImage: `url(${EnergyImg})`,
        }}
        configs={configs}
        {...restProps}
      >
        {getPackItems()}
      </Model>
    </>
  );
};

export default Bwt;
