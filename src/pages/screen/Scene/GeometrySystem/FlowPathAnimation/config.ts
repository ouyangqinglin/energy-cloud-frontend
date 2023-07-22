import { PathConfigType } from '../../Geometry/EnergyFlowAnimation/type';

export const pathsConfig: PathConfigType[] = [
  {
    id: '光伏',
    path: 'm408.93 199.88-31.094 17.544v8.066l-23.219 13.107.202 20.567-38.614 24.521',
    duration: 6,
    delay: 0,
    repeat: 2,
  },
  {
    id: '市电1',
    path: 'm2.447.419 57.286 32.776',
    duration: 6,
    delay: 0,
    repeat: 2,
    style: {
      transform: 'translateX(121.54px) translateY(302.511px)',
    },
  },
  {
    id: '储能',
    path: 'M2.447,0.419 L59.733,33.195',
    duration: 6,
    delay: 0,
    repeat: 2,
  },
  {
    id: '充电桩',
    path: 'm429.86 215.419 31.094 17.543v8.066l23.22 13.107-.202 20.567 43.697 26.229',
    duration: 6,
    delay: 0,
    repeat: 2,
  },
  {
    id: '负载',
    path: 'm487.808 181.34 31.094 17.544v8.065l23.219 13.107-.202 20.568 44 26.388',
    duration: 6,
    delay: 0,
    repeat: 2,
  },
  {
    id: '负载1',
    path: 'm460.86 200.419 31.094 17.543v8.066l23.22 13.107-.202 20.567 43.697 26.229',
    duration: 6,
    delay: 0,
    repeat: 2,
  },
  // {
  //   id: 'left-line-1-1',
  //   path: 'm383.93 199.88-31.094 17.544v8.066l-23.219 13.107.202 20.567-38.614 24.521',
  //   duration: 6,
  //   delay: 0,
  //   repeat: 2,
  // },
];
