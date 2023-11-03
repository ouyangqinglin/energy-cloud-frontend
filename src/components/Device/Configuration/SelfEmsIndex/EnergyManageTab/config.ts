import type { DetailItem } from '@/components/Detail';
import { powerFormat } from '@/utils/format';

export const manaulParamsItems: DetailItem[] = [
  { label: '充电功率', field: 'ChargePower', unit: 'KW', parentField: 'ManualModeSetting' },
  { label: '放电功率', field: 'DischargePower', parentField: 'ManualModeSetting' },
];
export const backupModeItems: DetailItem[] = [
  { label: '充电功率', field: 'antiBackflowThreshold', format: powerFormat },
  { label: '放电功率', field: 'maximumLoadOfTransformer', format: powerFormat },
];
export const peakTimeItems: DetailItem[] = [
  { label: '充电功率', field: 'antiBackflowThreshold', format: powerFormat },
  { label: '放电功率', field: 'maximumLoadOfTransformer', format: powerFormat },
];
