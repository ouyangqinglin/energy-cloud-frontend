import { getValue } from '@/utils';

export const communicateFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">失联</span>
  );
};
export const runFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">运行</span>
  ) : (
    <span className="cl-success">待机</span>
  );
};
export const modelFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">手动</span>
  ) : (
    <span className="cl-success">自动</span>
  );
};
export const closeFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">闭合</span>
  ) : (
    <span className="cl-success">断开</span>
  );
};
export const singleFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-success">断开</span>
  );
};
export const powerFormat = (value: string) => {
  return getValue(value, 'KW');
};
export const powerHourFormat = (value: string) => {
  return getValue(value, 'KWh');
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
export const hydrogenFormat = (value: string) => {
  return getValue(value, 'ppm');
};
export const electricModel = (value: number) => {
  const map = {
    0: '电池恒压',
    1: '并网恒流',
    2: '电池恒流',
  };
  return <span className="cl-success">{map[value]}</span>;
};
export const workFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-success">停机</span>
  );
};
export const faultFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">故障</span>
  );
};
export const doorFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">开门</span>
  ) : (
    <span className="cl-success">关门</span>
  );
};
export const chargeFormat = (status: number) => {
  const map = {
    0: '充电',
    1: '静置',
    2: '放电',
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
export const abnormalFormat = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-success">异常</span>
  );
};
export const fault1Format = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">一级故障</span>
  );
};
export const fault2Format = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">二级故障</span>
  );
};
export const fault3Format = (status: number) => {
  return status == 1 ? (
    <span className="cl-success">正常</span>
  ) : (
    <span className="cl-error">三级故障</span>
  );
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
