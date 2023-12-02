export type BtnParamType = {
  text: string;
  value: number;
};
export type ControlParamItem = {
  label: string;
  field: string;
  btnParam: any;
  disabled?: boolean;
};
export const controlItems: ControlParamItem[] = [
  {
    label: '系统工作状态控制',
    field: 'systemWorkingStatus',
    btnParam: [
      { text: '启动', value: 0 },
      { text: '待机', value: 1 },
      { text: '停止', value: 2 },
      { text: '急停', value: 3 },
    ],
  },
  {
    label: '系统工作模式切换',
    field: 'systemOperatingMode',
    btnParam: [
      { text: '削峰填谷', value: 0 },
      { text: '备电', value: 1 },
      { text: '手动控制', value: 2 },
    ],
  },
  // {
  //   label: '变流器工作模式切换',
  //   field: 'converterOperatingMode',
  //   disabled: true,
  //   btnParam: [
  //     { text: '离网工作', value: 0 },
  //     { text: '并网工作', value: 1 },
  //     { text: '市电充电', value: 2 },
  //   ],
  // },
  // {
  //   label: '变流器工作状态切换',
  //   field: 'converterWorkingStatus',
  //   disabled: true,
  //   btnParam: [
  //     { text: '启动', value: 0 },
  //     { text: '待机', value: 1 },
  //     { text: '停止', value: 2 },
  //     { text: '复位', value: 3 },
  //   ],
  // },
  {
    label: '电池组工作模式切换',
    field: 'batteryPackOperatingMode',
    disabled: true,
    btnParam: [
      // { text: '正常', value: 0 },
      // { text: '核容', value: 1 },
      // { text: '均衡', value: 2 },
      { text: '充电', value: 3 },
      { text: '放电', value: 4 },
    ],
  },
  // {
  //   label: '电池组工作状态控制',
  //   field: 'batteryPackWorkingStatus',
  //   disabled: true,
  //   btnParam: [
  //     { text: '启动', value: 0 },
  //     { text: '待机', value: 1 },
  //     { text: '停止', value: 2 },
  //   ],
  // },
  {
    label: 'BMS主接触器控制',
    field: 'bmsOpenAndClose',
    disabled: true,
    btnParam: [
      { text: '闭合', value: 0 },
      { text: '断开', value: 1 },
    ],
  },
  {
    label: '系统复位',
    field: 'systemReset',
    btnParam: [{ text: '执行', value: 1 }],
  },
];
