import { formatMessage } from '@/utils';

export interface AllTypeData {
  // pcs
  pcsVo: PcsVo;
  // 电池簇数据
  voltaicPileVos: VoltaicPileVo[];
}

export interface VoltaicPileVo {
  voltaicPileName: string;
  soc?: number;
  totalBatteryVoltage?: any;
  totalBatteryCurrent?: any;
  maximumIndividualTemperature?: any;
  lvomt?: any;
  mvvoasu?: any;
  mvvosu?: any;
}

// 工作状态 0停机，1故障，2运行
export const enum WorkStatus {
  SHUT_DOWN,
  FAILURE,
  RUNNING,
}
export const WorkStatusMap = new Map([
  [WorkStatus.SHUT_DOWN, formatMessage({ id: 'things.halt', defaultMessage: '停机' })],
  [WorkStatus.FAILURE, formatMessage({ id: 'things.fault', defaultMessage: '故障' })],
  [WorkStatus.RUNNING, formatMessage({ id: 'things.run', defaultMessage: '运行' })],
]);

export interface PcsVo {
  pcsName: string;
  workStatus: WorkStatus;
  p?: any;
  q?: any;
}
