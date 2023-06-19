import type { PathConfigType } from './type';

export const dynamicalPathsConfig: PathConfigType[] = [
  // 华为储能箱 - 放电
  {
    id: 'energy_store_hw_discharging',
    duration: 5,
    delay: 0,
    repeat: 1,
    path: 'M500.455 92.337l.768 1.289-16.453-9.8a11.25 11.25 0 0 0-11.159-.203l-.28.159-53.374 29.237',
  },
  // 储能并网柜 - 放电
  {
    id: 'energy_store_discharging',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M419.196 113.908l0 0-35.63 22.485',
  },
  // 储能并网柜 - 充电
  // {
  //   id: 'right_2_yt_DC_terminal',
  //   duration: 2,
  //   delay: 0,
  //   repeat: 1,
  //   path: 'M383.566 136.393l35.63 -22.485 0 0',
  // },
  // 永泰储能箱 - 冲电
  // {
  //   id: 'right_2_yt_DC_terminal',
  //   duration: 2,
  //   delay: 0,
  //   repeat: 1,
  //   path: 'M440.81 100.102l35.59 20.548',
  // },
  // 永泰储能箱 - 放电
  {
    id: 'energy_store_yt_discharging',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M475.4 120.65l-35.59-20.548',
  },
];
