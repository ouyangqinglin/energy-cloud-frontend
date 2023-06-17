import type { PathConfigType } from './type';

export const rightPathsConfig: PathConfigType[] = [
  // 右一永泰快充充电桩
  {
    id: 'right_1_yt_terminal',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M524.406 199.881 L547.813 186.252',
  },
  // 右二永泰120kw直流桩
  {
    id: 'right_2_yt_DC_terminal',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M572.444 252.344l-0-0 38.788-22.814',
  },
  // 右三永泰快充充电桩
  {
    id: 'right_3_yt_terminal',
    duration: 2,
    delay: 0,
    repeat: 1,
    path: 'M653.476 275.244l0 0 22.434-13.356',
  },
  // 右四永泰快充充电桩
  {
    id: 'right_4_yt_terminal',
    duration: 8,
    delay: 0,
    repeat: 4,
    path: 'm566.461 114.999.756 1.296-87.8 51.183a3.25 3.25 0 0 0-.17 5.509l.163.101 227.096 133.287a9.25 9.25 0 0 0 9.04.182l.263-.146 19.085-11.004.75 1.3',
  },
  // 右五永泰交流桩
  {
    id: 'right_5_yt_ac_terminal',
    duration: 12,
    delay: 0,
    repeat: 6,
    path: 'm349.867 62.37.757 1.296-49.736 29.082 432.62 254.028a15.25 15.25 0 0 0 15.1.196l.326-.186 108.399-63.458.758 1.294',
  },
];
