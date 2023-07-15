import { TimeType } from '@/components/TimeButtonGroup';
import { SubSystemType } from '../..';
export const config = new Map([
  [SubSystemType.PV, new Map([[TimeType.DAY, '日发电量/kWh:']])],
  [
    SubSystemType.ES,
    new Map([[TimeType.DAY, { charge: '日发电量/kWh:', disCharge: '日放电量/kWh:' }]]),
  ],
]);
