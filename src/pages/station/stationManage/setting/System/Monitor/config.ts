import { formatMessage } from '@/utils';

export const areaMap = new Map([
  ['row1', 0],
  ['row2', 1],
  ['row3', 2],
  ['row4', 3],
  ['row5', 4],
  ['row6', 5],
  ['row7', 6],
]);

export const defaultOpenKeys = ['electric'];

export const monitorTypeMap = new Map([
  // subType =1 电气 =2充/发/用电量  =3 放/馈电量 =4 功率
  [
    'electric',
    {
      type: 5,
      data: [
        {
          name: formatMessage({
            id: 'siteManage.set.mainsElectricConsumption',
            defaultMessage: '市电供电量',
          }),
          area: 'row1',
          subType: 2,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.mainsRealtimePower',
            defaultMessage: '市电实时功率',
          }),
          area: 'row2',
          subType: 4,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.gridBackPower',
            defaultMessage: '市电馈网电量',
          }),
          area: 'row3',
          subType: 3,
        },
      ],
    },
  ],
  [
    'photovoltaic',
    {
      type: 1,
      data: [
        {
          name: formatMessage({
            id: 'siteManage.set.pvPowerGeneration',
            defaultMessage: '光伏发电量',
          }),
          area: 'row1',
          subType: 2,
        },
        {
          name: formatMessage({ id: 'siteManage.set.pvGridPower', defaultMessage: '光伏上网电量' }),
          area: 'row2',
          subType: 3,
        },
        {
          name: formatMessage({ id: 'siteManage.set.pvPower', defaultMessage: '光伏发电功率' }),
          area: 'row3',
          subType: 4,
        },
      ],
    },
  ],
  [
    'energy',
    {
      type: 2,
      data: [
        {
          name: formatMessage({
            id: 'siteManage.set.energyStorageCharge',
            defaultMessage: '储能充电量',
          }),
          area: 'row1',
          subType: 2,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.energyStorageDischarge',
            defaultMessage: '储能放电量',
          }),
          area: 'row2',
          subType: 3,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.storageRealtimePower',
            defaultMessage: '储能实时功率',
          }),
          area: 'row3',
          subType: 4,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.energyStorageBatteryCharge',
            defaultMessage: '储能电池充电量',
          }),
          area: 'row4',
          subType: 6,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.energyStorageBatteryDischarge',
            defaultMessage: '储能电池放电量',
          }),
          area: 'row5',
          subType: 7,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.energyStorageBatteryEnableDischarge',
            defaultMessage: '储能电池可放电量',
          }),
          area: 'row6',
          subType: 8,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.storageBatteryRealtimePower',
            defaultMessage: '储能电池实时功率',
          }),
          area: 'row7',
          subType: 5,
        },
      ],
    },
  ],
  [
    'charge',
    {
      type: 3,
      data: [
        {
          name: formatMessage({
            id: 'siteManage.set.chargeElectricConsumption',
            defaultMessage: '充电桩充电量',
          }),
          area: 'row1',
          subType: 2,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.chargeRealtimePower',
            defaultMessage: '充电桩实时功率',
          }),
          area: 'row2',
          subType: 4,
        },
      ],
    },
  ],
  [
    'load',
    {
      type: 4,
      data: [
        {
          name: formatMessage({
            id: 'siteManage.set.loadPowerConsumption',
            defaultMessage: '负载用电量',
          }),
          area: 'row1',
          subType: 2,
        },
        {
          name: formatMessage({
            id: 'siteManage.set.loadRealtimePower',
            defaultMessage: '负载实时功率',
          }),
          area: 'row2',
          subType: 4,
        },
      ],
    },
  ],
]);
