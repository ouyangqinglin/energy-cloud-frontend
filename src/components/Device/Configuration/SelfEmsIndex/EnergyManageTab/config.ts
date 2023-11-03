import type { DetailItem } from '@/components/Detail';
import { powerFormat } from '@/utils/format';

export const manaulParamsItems: DetailItem[] = [
  { label: '充电功率', field: 'ChargePower', unit: 'KW', parentField: 'ManualModeSetting' },
  { label: '放电功率', field: 'DischargePower', unit: 'KW', parentField: 'ManualModeSetting' },
];
export const backupModeItems: DetailItem[] = [
  { label: '充电功率', field: 'BackupChargingPower', parentField: 'BackupPowerModeSetting' },
  { label: '放电功率', field: 'BackupDischargePower', parentField: 'BackupPowerModeSetting' },
  { label: '最高SOC', field: 'BackupHighestSOC', parentField: 'BackupPowerModeSetting' },
  { label: '最低SOC', field: 'BackupMinimumSOC', parentField: 'BackupPowerModeSetting' },
];
export const peakTimeItems: DetailItem[] = [
  {
    label: '尖电价',
    field: 'SharpElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '峰电价',
    field: 'PeakElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '平电价',
    field: 'FlatElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },
  {
    label: '谷电价',
    field: 'ValleyElectrovalence',
    unit: '元/kWh',
    parentField: 'PeakAndValleyTimeSettings',
  },

  { label: '尖时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
  { label: '峰时段', field: 'TimeFrame', parentField: 'ElectrovalenceTimeFrame' },
];
