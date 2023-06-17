import type { PathConfigType } from './type';

export const otherPathConfig: PathConfigType[] = [
  // 光伏并网柜
  {
    id: 'other_pv_grid_connected_cabinet',
    duration: 4,
    delay: 0,
    repeat: 2,
    path: 'm421.331 36.289 22.477 12.795a4.75 4.75 0 0 1 .248 8.105l-.185.115-22.856 13.472-75.591 43.523',
  },
  // 光伏逆变器1
  {
    id: 'other_pv_inverter1',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'm427.223 17.929.758 1.294-31.96 18.614a3.25 3.25 0 0 0-.172 5.5l.161.102 11.717 6.926',
  },
  // 光伏逆变器2
  {
    id: 'other_pv_inverter2',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M443.182 27.483l.75 1.3-18.186 10.5',
  },
  // 市电输入
  {
    id: 'other_mains_input',
    duration: 4,
    delay: 0,
    repeat: 2,
    path: 'M389.86.166l18.306 10.673c2.271 1.324 3.053 4.259 1.75 6.559a4.785 4.785 0 0 1-1.508 1.624l-.237.149-60.967 35.645',
  },
  // 充电堆
  {
    id: 'left_charging_stack',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'm279.408 80.253 20.871 12.134',
  },
];
