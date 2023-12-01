import {formatMessage} from "@/utils";

export const areaMap = new Map([
  ['elec', 0],
  ['row1', 1],
  ['row2', 2],
  ['row3', 3],
]);

export const defaultOpenKeys = ['electric', 'load'];

export const monitorTypeMap = new Map([
  // subType =1 电气 =2充/发/用电量  =3 放/馈电量 =4 功率
  [
    'electric',
    {
      type: 5,
      data: [
        { name: formatMessage({ id: 'siteManage.set.electricMonitor', defaultMessage: '电气监测' }), area: 'elec', subType: 1 },
        { name: formatMessage({ id: 'siteManage.set.mainsElectricConsumption', defaultMessage: '市电用电量' }), area: 'row1', subType: 2 },
        { name: formatMessage({ id: 'siteManage.set.mainsRealtimePower', defaultMessage: '市电实时功率' }), area: 'row2', subType: 4 },
      ],
    },
  ],
  [
    'photovoltaic',
    {
      type: 1,
      data: [
        { name: formatMessage({ id: 'siteManage.set.electricMonitor', defaultMessage: '电气监测' }), area: 'elec', subType: 1 },
        { name: formatMessage({ id: 'siteManage.set.pvPowerGeneration', defaultMessage: '光伏发电量' }), area: 'row1', subType: 2 },
        { name: formatMessage({ id: 'siteManage.set.pvGridPower', defaultMessage: '光伏上网电量' }), area: 'row2', subType: 3 },
        { name: formatMessage({ id: 'siteManage.set.pvPower', defaultMessage: '光伏发电功率' }), area: 'row3', subType: 4 },
      ],
    },
  ],
  [
    'energy',
    {
      type: 2,
      data: [
        { name: formatMessage({ id: 'siteManage.set.electricMonitor', defaultMessage: '电气监测' }), area: 'elec', subType: 1 },
        { name: formatMessage({ id: 'siteManage.set.energyStorageCharge', defaultMessage: '储能充电量' }), area: 'row1', subType: 2 },
        { name: formatMessage({ id: 'siteManage.set.energyStorageDischarge', defaultMessage: '储能放电量' }), area: 'row2', subType: 3 },
        { name: formatMessage({ id: 'siteManage.set.storageRealtimePower', defaultMessage: '储能实时功率' }), area: 'row3', subType: 4 },
      ],
    },
  ],
  [
    'charge',
    {
      type: 3,
      data: [
        { name: formatMessage({ id: 'siteManage.set.electricMonitor', defaultMessage: '电气监测' }), area: 'elec', subType: 1 },
        { name: formatMessage({ id: 'siteManage.set.chargeElectricConsumption', defaultMessage: '充电桩用电量' }), area: 'row1', subType: 2 },
        { name: formatMessage({ id: 'siteManage.set.chargeRealtimePower', defaultMessage: '充电桩实时功率' }), area: 'row2', subType: 4 },
      ],
    },
  ],
  [
    'load',
    {
      type: 4,
      data: [
        { name: formatMessage({ id: 'siteManage.set.electricMonitor', defaultMessage: '电气监测' }), area: 'elec', subType: 1 },
        { name: formatMessage({ id: 'siteManage.set.loadPowerConsumption', defaultMessage: '负载用电量' }), area: 'row1', subType: 2 },
        { name: formatMessage({ id: 'siteManage.set.loadRealtimePower', defaultMessage: '负载实时功率' }), area: 'row2', subType: 4 },
      ],
    },
  ],
]);
