import { getValue, isEmpty, strToArray } from '@/utils';
import dayjs from 'dayjs';
import { onlineStatus, deviceAlarmStatus } from './dictionary';
import Field from '@/components/Field';

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
export const closeFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: '断开',
    1: '闭合',
  };
  const result =
    valueArr?.map?.((item) => <span className={'cl-success mr8'}>{map[item]}</span>) || '';
  return result;
};
export const contactorFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: '断开',
    1: '主接触器闭合',
    2: '预充接触器闭合',
    5: '直流断路器闭合',
    6: '交流断路器闭合',
    7: '门禁闭合',
  };
  const result =
    valueArr?.map?.((item) => <span className={'cl-success mr8'}>{map[item]}</span>) || '';
  return result;
};
export const singleFormat = (value: number) => {
  const map = {
    0: '断开',
    1: '正常',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
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
  return getValue(value, 'KWh');
};
export const noPowerHourFormat = (value: string | number) => {
  return getValue(value, 'kvar·h');
};
export const voltageFormat = (value: string | number) => {
  return getValue(value, 'V');
};
export const kVoltageFormat = (value: string | number) => {
  return getValue(value, 'KV');
};
export const kVAFormat = (value: string | number) => {
  return getValue(value, 'KVA');
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
export const electricModelFormat = (value: number) => {
  const map = {
    0: '电池恒压',
    1: '并网恒流',
    2: '电池恒流',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const workFormat = (value: number) => {
  const map = {
    0: '停机',
    1: '故障',
    2: '运行',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
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
  return <span className={'cl-success'}>{map[status]}</span>;
};
export const openFormat = (status: number) => {
  const map = {
    0: '关闭',
    1: '开启',
  };
  return <span className={'cl-success'}>{map[status]}</span>;
};
export const abnormalFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
    1: { text: 'BMU1通信故障', color: 'cl-error' },
    2: { text: 'BMU2通信故障', color: 'cl-error' },
    3: { text: 'BMU3通信故障', color: 'cl-error' },
    4: { text: 'BMU4通信故障', color: 'cl-error' },
    5: { text: 'BMU5通信故障', color: 'cl-error' },
    6: { text: 'BMU6通信故障', color: 'cl-error' },
    7: { text: 'BMU7通信故障', color: 'cl-error' },
    8: { text: 'BMU8通信故障', color: 'cl-error' },
    9: { text: 'BMU9通信故障', color: 'cl-error' },
    10: { text: 'BMU10通信故障', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const faultFormat = (value: number) => {
  const map = {
    0: '正常',
  };
  return (
    <span className={value == 0 ? 'cl-success' : 'cl-error'}>
      {isEmpty(value) ? '' : map[value] || '故障'}
    </span>
  );
};
export const externalFaultFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
    1: { text: 'BMU硬件故障', color: 'cl-error' },
    2: { text: 'BCU硬件故障', color: 'cl-error' },
    3: { text: '熔断器故障', color: 'cl-error' },
    4: { text: '接触器粘连故障', color: 'cl-error' },
    5: { text: 'BMU通信故障', color: 'cl-error' },
    6: { text: 'BAU通信故障', color: 'cl-error' },
    7: { text: '电流传感器故障', color: 'cl-error' },
    8: { text: '绝缘监测设备故障', color: 'cl-error' },
    9: { text: '隔开开关异常断开', color: 'cl-error' },
    10: { text: 'NTC故障', color: 'cl-error' },
    11: { text: 'PCS通信故障', color: 'cl-error' },
    12: { text: '急停信号', color: 'cl-error' },
    13: { text: '水浸信号', color: 'cl-error' },
    14: { text: '气溶胶信号', color: 'cl-error' },
    15: { text: '交流防雷器故障', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const fault1Format = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
    1: { text: '总电压过压一级报警', color: 'cl-error' },
    2: { text: '总电压欠压一级报警', color: 'cl-error' },
    3: { text: '单体过压一级报警', color: 'cl-error' },
    4: { text: '单体欠压一级报警', color: 'cl-error' },
    5: { text: '放电电流过大一级报警', color: 'cl-error' },
    6: { text: '充电电流过大一级报警', color: 'cl-error' },
    7: { text: '放电电池过温一级报警', color: 'cl-error' },
    8: { text: '放电电池欠温一级报警', color: 'cl-error' },
    9: { text: '充电电池过温一级报警', color: 'cl-error' },
    10: { text: '充电电池欠温一级报警', color: 'cl-error' },
    11: { text: '绝缘阻值过低一级报警', color: 'cl-error' },
    12: { text: '极柱温度过高一级报警', color: 'cl-error' },
    13: { text: '高压箱连接器温度过高一级报警', color: 'cl-error' },
    14: { text: '单体压差一级报警', color: 'cl-error' },
    15: { text: '单体温差一级报警', color: 'cl-error' },
    16: { text: 'SOC低一级报警', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const fault2Format = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
    1: { text: '总电压过压二级报警', color: 'cl-error' },
    2: { text: '总电压欠压二级报警', color: 'cl-error' },
    3: { text: '单体过压二级报警', color: 'cl-error' },
    4: { text: '单体欠压二级报警', color: 'cl-error' },
    5: { text: '放电电流过大二级报警', color: 'cl-error' },
    6: { text: '充电电流过大二级报警', color: 'cl-error' },
    7: { text: '放电电池过温二级报警', color: 'cl-error' },
    8: { text: '放电电池欠温二级报警', color: 'cl-error' },
    9: { text: '充电电池过温二级报警', color: 'cl-error' },
    10: { text: '充电电池欠温二级报警', color: 'cl-error' },
    11: { text: '绝缘阻值过低二级报警', color: 'cl-error' },
    12: { text: '极柱温度过高二级报警', color: 'cl-error' },
    13: { text: '高压箱连接器温度过高二级报警', color: 'cl-error' },
    14: { text: '单体压差二级报警', color: 'cl-error' },
    15: { text: '单体温差二级报警', color: 'cl-error' },
    16: { text: 'SOC低二级报警', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const fault3Format = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
    1: { text: '总电压过压三级报警', color: 'cl-error' },
    2: { text: '总电压欠压三级报警', color: 'cl-error' },
    3: { text: '单体过压三级报警', color: 'cl-error' },
    4: { text: '单体欠压三级报警', color: 'cl-error' },
    5: { text: '放电电流过大三级报警', color: 'cl-error' },
    6: { text: '充电电流过大三级报警', color: 'cl-error' },
    7: { text: '放电电池过温三级报警', color: 'cl-error' },
    8: { text: '放电电池欠温三级报警', color: 'cl-error' },
    9: { text: '充电电池过温三级报警', color: 'cl-error' },
    10: { text: '充电电池欠温三级报警', color: 'cl-error' },
    11: { text: '绝缘阻值过低三级报警', color: 'cl-error' },
    12: { text: '极柱温度过高三级报警', color: 'cl-error' },
    13: { text: '高压箱连接器温度过高三级报警', color: 'cl-error' },
    14: { text: '单体压差三级报警', color: 'cl-error' },
    15: { text: '单体温差三级报警', color: 'cl-error' },
    16: { text: 'SOC低三级报警', color: 'cl-error' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
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
    5: '充电完成',
    255: '故障',
  };
  return <span className={'cl-success'}>{map[value]}</span>;
};
export const alarmFormat = (status: number) => {
  const map = {
    0: '正常',
    1: '告警',
  };
  return <span className="cl-success">{map[status]}</span>;
};
export const pankFanFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '关', color: 'cl-success' },
    1: { text: 'BMU1风扇开', color: 'cl-success' },
    2: { text: 'BMU2风扇开', color: 'cl-success' },
    3: { text: 'BMU3风扇开', color: 'cl-success' },
    4: { text: 'BMU4风扇开', color: 'cl-success' },
    5: { text: 'BMU5风扇开', color: 'cl-success' },
    6: { text: 'BMU6风扇开', color: 'cl-success' },
    7: { text: 'BMU7风扇开', color: 'cl-success' },
    8: { text: 'BMU8风扇开', color: 'cl-success' },
    9: { text: 'BMU9风扇开', color: 'cl-success' },
    10: { text: 'BMU10风扇开', color: 'cl-success' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const pankFanAlarmFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '正常', color: 'cl-success' },
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
  const map = {
    0: { text: '否', color: 'cl-success' },
    1: { text: '制冷', color: 'cl-success' },
    2: { text: '制热', color: 'cl-success' },
    3: { text: '除湿', color: 'cl-success' },
    4: { text: '送风', color: 'cl-success' },
    5: { text: '待机', color: 'cl-success' },
  };
  const result =
    valueArr?.map?.((item) => (
      <span className={`${map[item]?.color} mr8`}>{map[item]?.text}</span>
    )) || '';
  return result;
};
export const airSwitchFormat = (value: string) => {
  const valueArr = strToArray(value);
  const map = {
    0: { text: '停止', color: 'cl-success' },
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
  return (
    <span className={`${isRight ? 'cl-success' : 'cl-error'} mr8`}>
      {isRight ? '正常' : '故障'}
    </span>
  );
};
export const onlineStatusFormat = (value: string) => {
  return <Field text={value} valueEnum={onlineStatus} />;
};
export const deviceAlarmStatusFormat = (value: string) => {
  return <Field text={value} valueEnum={deviceAlarmStatus} />;
};
