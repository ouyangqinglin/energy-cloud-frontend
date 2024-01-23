import { getValue, strToArray } from '@/utils';
import dayjs from 'dayjs';
import { onlineStatus, deviceAlarmStatus } from './dict';
import Field from '@/components/Field';
import { ProField } from '@ant-design/pro-components';

type MapType = {
  [k: number]: string;
};

type MapDataType = {
  [k: number]: {
    text: string;
    color: string;
  };
};

export const timeFormat = (value: string) => {
  return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '';
};
export const onlineFormat = (value: number) => {
  const map: MapType = {
    0: '离线',
    1: '在线',
  };
  return <span className={value == 0 ? 'cl-error' : ''}>{map[value]}</span>;
};
export const communicateFormat = (value: number) => {
  const map: MapType = {
    0: '正常',
    1: '失联',
  };
  return <span className={value == 0 ? '' : 'cl-error'}>{map[value]}</span>;
};
export const runFormat = (value: number) => {
  const map: MapType = {
    0: '待机',
    1: '运行',
  };
  return <span className={''}>{map[value]}</span>;
};
export const systemRunFormat = (value: number) => {
  const map: MapType = {
    0: '启动',
    1: '待机',
    2: '停止',
    3: '急停',
  };
  return <span className={''}>{map[value]}</span>;
};
export const workStatusFormat = (value: number) => {
  const map: MapType = {
    0: '启动',
    1: '停止',
  };
  return <span className={''}>{map[value]}</span>;
};
export const enableFormat = (status: number) => {
  const map: MapType = {
    0: '使能',
    1: '禁用',
  };
  return <span className="">{map[status]}</span>;
};
export const airRunFormat = (value: number) => {
  const map: MapType = {
    0: '运行',
    1: '待机',
  };
  return <span className={''}>{map[value]}</span>;
};
export const modelFormat = (value: number) => {
  const map: MapType = {
    0: '手动',
    1: '自动',
    2: '手动',
  };
  return <span className={''}>{map[value]}</span>;
};
export const converterFormat = (value: number) => {
  const map: MapType = {
    0: '离网工作',
    1: '并网工作',
    2: '市电充电',
  };
  return <span className={''}>{map[value]}</span>;
};
export const converterStauesFormat = (value: number) => {
  const map: MapType = {
    0: '启动',
    1: '待机',
    2: '停止',
    3: '复位',
  };
  return <span className={''}>{map[value]}</span>;
};
export const runStateFormat = (value: number) => {
  const map: MapType = {
    0: '正常',
    1: '禁充',
    2: '禁放',
    3: '待机',
    4: '停机',
  };
  return <span className={''}>{map[value]}</span>;
};
export const batteryWorkFormat = (value: number) => {
  const map: MapType = {
    0: '正常',
    1: '核容',
    2: '均衡',
    3: '充电',
    4: '放电',
  };
  return <span className={''}>{map[value]}</span>;
};
export const batteryWorkingStatusFormat = (value: number) => {
  const map: MapType = {
    0: '启动',
    1: '待机',
    2: '停止',
  };
  return <span className={''}>{map[value]}</span>;
};
export const closeFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '断开', color: '' },
    1: { text: '闭合', color: '' },
  };
  return (
    <span className={`${map[valueArr.includes(0) ? 0 : 1]?.color} mr8`}>
      {map[valueArr.includes(0) ? 0 : 1]?.text}
    </span>
  );
};
export const contactorFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapType = {
    0: '断开',
    1: '主接触器闭合',
    2: '预充接触器闭合',
    5: '直流断路器闭合',
    6: '交流断路器闭合',
    7: '门禁闭合',
  };
  const result = valueArr?.map?.((item) => <span className={' mr8'}>{map[item]}</span>) || '';
  return result;
};
export const singleBFormat = (value: number) => {
  const map: MapType = {
    0: '正常',
    1: '断开',
  };
  return <span className={''}>{map[value]}</span>;
};
export const singleFormat = (value: number) => {
  const map: MapType = {
    0: '断开',
    1: '正常',
  };
  return <span className={''}>{map[value]}</span>;
};
export const singleEffectFormat = (value: number) => {
  const map: MapType = {
    0: '有效',
    1: '断开',
  };
  return <span className={''}>{map[value]}</span>;
};
export const mvFormat = (value: string | number) => {
  return getValue(value, 'mV');
};
export const clusterFormat = (value: number) => {
  return value === 0 ? '断开' : '闭合';
};
export const powerFormat = (value: string | number) => {
  return getValue(value, 'kW');
};
export const kWpFormat = (value: string | number) => {
  return getValue(value, 'kWp');
};
export const noPowerFormat = (value: string | number) => {
  return getValue(value, 'kvar');
};
export const powerHourFormat = (value: string | number) => {
  return getValue(value, 'kWh');
};
export const noPowerHourFormat = (value: string | number) => {
  return getValue(value, 'kvar·h');
};
export const voltageFormat = (value: string | number) => {
  return getValue(value, 'V');
};
export const kVoltageFormat = (value: string | number) => {
  return getValue(value, 'kV');
};
export const kVAFormat = (value: string | number) => {
  return getValue(value, 'kVA');
};
export const currentFormat = (value: string | number) => {
  return getValue(value, 'A');
};
export const frequencyFormat = (value: string | number) => {
  return getValue(value, 'HZ');
};
export const tempFormat = (value: string | number) => {
  return getValue(value, '℃');
};
export const wetFormat = (value: string | number) => {
  return getValue(value, '%rh');
};
export const percentageFormat = (value: string | number) => {
  return getValue(value, '%');
};
export const kohmFormat = (value: string | number) => {
  return getValue(value, 'kΩ');
};
export const mohmFormat = (value: string | number) => {
  return getValue(value, 'MΩ');
};
export const hydrogenFormat = (value: string | number) => {
  return getValue(value, 'ppm');
};
export const moneyFormat = (value: string | number) => {
  return getValue(value, '元');
};
export const moneyPowerFormat = (value: string | number) => {
  return getValue(value, '元/kWh');
};
export const electricModelFormat = (value: number) => {
  const map: MapType = {
    0: '电池恒压',
    1: '并网恒流',
    2: '电池恒流',
  };
  return <span className={''}>{map[value]}</span>;
};
export const workFormat = (value: number) => {
  const map: MapType = {
    0: '停机',
    1: '故障',
    2: '运行',
  };
  return <span className={''}>{map[value]}</span>;
};
export const emsConnectMethodFormat = (value: number) => {
  const map: MapType = {
    0: '485',
    1: '未知',
  };
  return <span className={''}>{map[value]}</span>;
};
export const liquidWorkFormat = (value: number) => {
  const map: MapType = {
    0: '停机',
    1: '故障',
    2: '运行',
  };
  return <span className={''}>{map[value]}</span>;
};
export const doorFormat = (value: number) => {
  const map: MapType = {
    0: '关门',
    1: '开门',
  };
  return <span className={''}>{map[value]}</span>;
};
export const chargeFormat = (status: number) => {
  const map: MapType = {
    0: '静置',
    1: '放电',
    2: '充电',
  };
  const result = <span className={''}>{map[status]}</span>;
  return result;
};
export const chargePutFormat = (status: number) => {
  const map: MapType = {
    0: '充电',
    1: '放电',
  };
  return <span className={''}>{map[status]}</span>;
};
export const openFormat = (status: number) => {
  const map: MapType = {
    0: '关闭',
    1: '开启',
  };
  return <span className={''}>{map[status]}</span>;
};
export const faultFormat = (value: number) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '正常', color: '' },
    1: { text: '故障', color: 'cl-error' },
  };
  return (
    <span className={`${map[valueArr.includes(0) ? 0 : 1]?.color} mr8`}>
      {map[valueArr.includes(0) ? 0 : 1]?.text}
    </span>
  );
};
export const externalFaultFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '正常', color: '' },
    1: { text: '故障', color: 'cl-error' },
  };
  return (
    <span className={`${map[valueArr.includes(0) ? 0 : 1]?.color} mr8`}>
      {map[valueArr.includes(0) ? 0 : 1]?.text}
    </span>
  );
};
export const alarmArrFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '正常', color: '' },
    1: { text: '告警', color: 'cl-error' },
  };
  return (
    <span className={`${map[valueArr.includes(0) ? 0 : 1]?.color} mr8`}>
      {map[valueArr.includes(0) ? 0 : 1]?.text}
    </span>
  );
};
export const outputFormat = (status: number) => {
  const map: MapType = {
    0: '停止',
    1: '输出',
  };
  return <span className="">{map[status]}</span>;
};
export const openCloseFormat = (status: number) => {
  const map: MapType = {
    0: '关闭',
    1: '打开',
  };
  return <span className="">{map[status]}</span>;
};
export const liquidSensorFormat = (status: number) => {
  const map: MapType = {
    0: '正在自检',
    1: '工作正常',
    2: '设备故障',
    3: '探测到报警信息',
  };
  return <span className="">{map[status]}</span>;
};
export const liquidSystemModeFormat = (status: number) => {
  const map: MapType = {
    0: '停止',
    1: '内循环',
    2: '制冷',
    3: '加热',
    4: '全自动(根据水温)',
  };
  return <span className="">{map[status]}</span>;
};
export const dehumidifierWorkModeFormat = (status: number) => {
  const map: MapType = {
    0: '升温型',
    1: '降温型',
  };
  return <span className="">{map[status]}</span>;
};
export const systemOperatingModeFormat = (status: number) => {
  const map: MapType = {
    0: '削峰填谷',
    1: '备电',
    2: '手动控制',
  };
  return <span className="">{map[status]}</span>;
};
export const booleanFormat = (status: number) => {
  const map: MapType = {
    0: '否',
    1: '是',
  };
  return <span className="">{map[status]}</span>;
};
export const airsetFormat = (status: number) => {
  const map: MapType = {
    0: '机组关闭',
    1: '机组开启',
    2: '机组待机',
    3: '机组锁定',
    4: '远程关闭',
  };
  return <span className={status == 3 ? 'cl-error' : ''}>{map[status]}</span>;
};
export const useFormat = (value: number) => {
  const map: MapType = {
    // 0：离网1：空闲2：占用（未充电）3：占用（充电中）4：占用（预约锁定）255：故障
    0: '离网',
    1: '空闲',
    2: '占用（未充电）',
    3: '占用（充电中）',
    4: '占用（预约锁定）',
    5: '充电完成',
    255: '故障',
  };
  return <span className={''}>{map[value]}</span>;
};
export const alarmFormat = (status: number) => {
  const map: MapType = {
    0: '正常',
    1: '告警',
  };
  return <span className="">{map[status]}</span>;
};
export const startFormat = (status: number) => {
  const map: MapType = {
    0: '正常',
    1: '启动',
  };
  return <span className="">{map[status]}</span>;
};
export const pankFanFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '关', color: '' },
    1: { text: 'BMU1风扇开', color: '' },
    2: { text: 'BMU2风扇开', color: '' },
    3: { text: 'BMU3风扇开', color: '' },
    4: { text: 'BMU4风扇开', color: '' },
    5: { text: 'BMU5风扇开', color: '' },
    6: { text: 'BMU6风扇开', color: '' },
    7: { text: 'BMU7风扇开', color: '' },
    8: { text: 'BMU8风扇开', color: '' },
    9: { text: 'BMU9风扇开', color: '' },
    10: { text: 'BMU10风扇开', color: '' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const pankFanAlarmFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '正常', color: '' },
    1: { text: 'BMU1风扇故障', color: 'cl-error' },
    2: { text: 'BMU2风扇故障', color: 'cl-error' },
    3: { text: 'BMU3风扇故障', color: 'cl-error' },
    4: { text: 'BMU4风扇故障', color: 'cl-error' },
    5: { text: 'BMU5风扇故障', color: 'cl-error' },
    6: { text: 'BMU6风扇故障', color: 'cl-error' },
    7: { text: 'BMU7风扇故障', color: 'cl-error' },
    8: { text: 'BMU8风扇故障', color: 'cl-error' },
    9: { text: 'BMU9风扇故障', color: 'cl-error' },
    10: { text: 'BMU10风扇故障', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const airWorkFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '否', color: '' },
    1: { text: '制冷', color: '' },
    2: { text: '制热', color: '' },
    3: { text: '除湿', color: '' },
    4: { text: '送风', color: '' },
    5: { text: '待机', color: '' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const bwattAirWorkFormat = (value: number) => {
  const map: MapDataType = {
    0: { text: '机组关闭', color: '' },
    1: { text: '机组开启', color: '' },
    2: { text: '机组待机', color: '' },
    3: { text: '机组锁定', color: '' },
    4: { text: '远程关闭', color: '' },
  };
  return <span>{map[value]?.text}</span>;
};
export const airSwitchFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map: MapDataType = {
    0: { text: '停止', color: '' },
    1: { text: '室内风机开关输出', color: 'cl-error' },
    2: { text: '压缩机开关输出', color: 'cl-error' },
    3: { text: '电加热开关输出', color: 'cl-error' },
    4: { text: '公告告警开关输出', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const airAlarmFormat = (value: string) => {
  const valueArr = strToArray(value);
  const isRight = valueArr.includes(0);
  return <span className={`${isRight ? '' : 'cl-error'} mr8`}>{isRight ? '正常' : '故障'}</span>;
};
export const onlineStatusFormat = (value: string) => {
  return <ProField mode="read" text={value} valueEnum={onlineStatus} />;
};
export const deviceAlarmStatusFormat = (value: string) => {
  return <Field text={value} valueEnum={deviceAlarmStatus} />;
};

export const earlyWarningFormat = (value: number) => {
  const map: MapDataType = {
    0: { text: '系统正常', color: '' },
    3: { text: '一级预警', color: 'cl-error' },
    4: { text: '二级预警', color: 'cl-error' },
  };
  return <span className={`${map[value]?.color}`}>{map[value]?.text}</span>;
};

export const faultFireFightFormat = (value: number) => {
  const map: MapDataType = {
    0: { text: '无故障', color: '' },
    1: { text: 'BIES已启动（灭火器启动）', color: 'cl-error' },
    2: { text: 'CAN1通讯故障', color: 'cl-error' },
    3: { text: '抑制装置故障', color: 'cl-error' },
    4: { text: '探测器故障（包括单箱离线故障和探测器本身故障）', color: 'cl-error' },
  };
  return <span className={`${map[value]?.color}`}>{map[value]?.text}</span>;
};
