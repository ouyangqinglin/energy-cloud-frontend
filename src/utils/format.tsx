import { getValue } from '@/utils';
import dayjs from 'dayjs';

export const timeFormat = (value: string) => {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
};
export const onlineFormat = (value: number) => {
  const map = {
    0: '离线',
    1: '在线',
  };
  return <span className={value == 0 ? 'cl-error' : 'cl-success'}>{map[value]}</span>;
};
export const communicateFormat = (value: number) => {
  const map = {
    0: '正常',
    1: '失联',
  };
  return <span className={value == 0 ? 'cl-success' : 'cl-error'}>{map[value]}</span>;
};
export const runFormat = (value: number) => {
  const map = {
    0: '待机',
    1: '运行',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const modelFormat = (value: number) => {
  const map = {
    0: '手动',
    1: '自动',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const closeFormat = (value: number) => {
  const map = {
    0: '断开',
    1: '闭合',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const singleFormat = (value: number) => {
  const map = {
    0: '断开',
    1: '正常',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const powerFormat = (value: string) => {
  return getValue(value, 'KW');
};
export const noPowerFormat = (value: string) => {
  return getValue(value, 'kvar');
};
export const powerHourFormat = (value: string) => {
  return getValue(value, 'KWh');
};
export const noPowerHourFormat = (value: string) => {
  return getValue(value, 'kvar·h');
};
export const voltageFormat = (value: string) => {
  return getValue(value, 'V');
};
export const currentFormat = (value: string) => {
  return getValue(value, 'A');
};
export const frequencyFormat = (value: string) => {
  return getValue(value, 'HZ');
};
export const tempFormat = (value: string) => {
  return getValue(value, '℃');
};
export const percentageFormat = (value: string) => {
  return getValue(value, '%');
};
export const kohmFormat = (value: string) => {
  return getValue(value, 'kΩ');
};
export const mohmFormat = (value: string) => {
  return getValue(value, 'MΩ');
};
export const hydrogenFormat = (value: string) => {
  return getValue(value, 'ppm');
};
export const moneyFormat = (value: string) => {
  return getValue(value, '元');
};
export const electricModel = (value: number) => {
  const map = {
    0: '电池恒压',
    1: '并网恒流',
    2: '电池恒流',
  };
  return <span className="cl-success">{map[value]}</span>;
};
export const workFormat = (value: number) => {
  const map = {
    0: '停机',
    1: '正常',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const faultFormat = (value: number) => {
  const map = {
    0: '正常',
    1: '故障',
  };
  return <span className={value == 0 ? 'cl-success' : 'cl-error'}>{map[value]}</span>;
};
export const doorFormat = (value: number) => {
  const map = {
    0: '关门',
    1: '开门',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const chargeFormat = (status: number) => {
  const map = {
    0: '静置',
    1: '放电',
    2: '充电',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const openFormat = (status: number) => {
  const map = {
    0: '关闭',
    1: '开启',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const abnormalFormat = (value: number) => {
  const map = {
    0: '正常',
    1: '异常',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const fault1Format = (value: number) => {
  const map = {
    0: '正常',
    1: '一级故障',
  };
  return <span className={value == 0 ? 'cl-success' : 'cl-error'}>{map[value]}</span>;
};
export const fault2Format = (value: number) => {
  const map = {
    0: '正常',
    1: '二级故障',
  };
  return <span className={value == 0 ? 'cl-success' : 'cl-error'}>{map[value]}</span>;
};
export const fault3Format = (value: number) => {
  const map = {
    0: '正常',
    1: '三级故障',
  };
  return <span className={value == 0 ? 'cl-success' : 'cl-error'}>{map[value]}</span>;
};
export const outputFormat = (status: number) => {
  const map = {
    0: '停止',
    1: '输出',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const openCloseFormat = (status: number) => {
  const map = {
    0: '关闭',
    1: '打开',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const booleanFormat = (status: number) => {
  const map = {
    0: '否',
    1: '是',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const airsetFormat = (status: number) => {
  const map = {
    0: '机组关闭',
    1: '机组开启',
    2: '机组待机',
    3: '机组锁定',
    4: '远程关闭',
  };
  return <span className={status == 3 ? 'cl-error' : 'cl-success'}>{map[status]}</span>;
};
export const useFormat = (value: number) => {
  const map = {
    // 0：离网1：空闲2：占用（未充电）3：占用（充电中）4：占用（预约锁定）255：故障
    0: '离网',
    1: '空闲',
    2: '占用（未充电）',
    3: '占用（充电中）',
    4: '占用（预约锁定）',
    255: '故障',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
