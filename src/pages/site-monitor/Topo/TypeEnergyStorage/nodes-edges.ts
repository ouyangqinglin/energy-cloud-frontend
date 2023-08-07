import { Edge, Node } from 'reactflow';
import { ExtraNodeData } from '../type';
import IconPCS from './svg-icon/icon_储能pcs.svg';
import IconSubControlBox from './svg-icon/icon_分控箱.svg';
import IconBatteryPack from './svg-icon/icon_batteryPack.svg';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const immutableNodes: Node<ExtraNodeData>[] = [
  {
    id: '1-1-1-a',
    type: 'imageNode',
    parentNode: '1-1-1',
    extent: 'parent',
    position: {
      x: 271,
      y: 36,
    },
    zIndex: 1,
    data: {
      label: '分控箱',
      width: 90,
      height: 90,
      handle: {
        start: {
          left: 744 / 2 - 271,
        },
        end: {
          left: 744 / 2 - 271,
        },
      },
      imageContent: {
        width: 90,
        height: 90,
        icon: IconSubControlBox,
      },
      textContent: {
        boxText: {
          width: 74,
          height: 42,
          label: '分控箱',
        },
        direction: 'horizontal',
      },
    },
  },
  {
    id: '1-1-1-b',
    type: 'BatteryCluster',
    parentNode: '1-1-1',
    extent: 'parent',
    position: {
      x: 281,
      y: 198,
    },
    zIndex: 1,
    data: {
      label: 'soc',
      width: 90,
      height: 102,
      imageContent: {
        width: 40,
        height: 40,
        soc: 12,
      },
      handle: {
        start: {
          left: 744 / 2 - 281,
        },
        end: {
          left: 744 / 2 - 281,
        },
      },
      textContent: {
        boxText: {
          width: 146,
          height: 36,
          label: '01#电池簇',
        },
        column: [
          {
            label: '簇电压(V):',
            value: '756.30',
            field: 'todayConsumption',
          },
          {
            label: '簇电流(A):',
            value: '0.00',
            field: 'todayConsumption',
          },
        ],
        direction: 'horizontal',
      },
    },
  },
  {
    id: '1-1-1-c',
    type: 'imageNode',
    parentNode: '1-1-1',
    extent: 'parent',
    position: {
      x: 238,
      y: 328,
    },
    zIndex: 1,
    data: {
      label: '电池',
      width: 160,
      height: 160,
      handle: {
        start: {
          left: 744 / 2 - 238,
        },
        end: {
          left: 744 / 2 - 238,
        },
      },
      imageContent: {
        width: 160,
        height: 160,
        icon: IconBatteryPack,
      },
      textContent: {
        column: [
          {
            label: '单体最高温度(℃):',
            value: '38.50',
            field: 'todayConsumption',
          },
          {
            label: '单体最低温度(℃):',
            value: '0.00',
            field: 'todayConsumption',
          },
          {
            label: '单体最高电压(V):',
            value: '38.50',
            field: 'todayConsumption',
          },
          {
            label: '单体最低电压(V):',
            value: '0.00',
            field: 'todayConsumption',
          },
        ],
        direction: 'horizontal',
      },
    },
  },
];

export const initialNodes: Node<ExtraNodeData>[] = [
  {
    id: '1',
    type: 'ACBus',
    position,
    data: {
      label: '交流母线',
      width: 744,
      // height: 540,
    },
  },
  {
    id: '1-1',
    type: 'imageNode',
    position,
    data: {
      label: 'pcs',
      width: 744,
      height: 100,
      layout: 'center',
      boxText: {
        width: 136,
        height: 42,
        label: '1#储能变流器PCS',
      },
      imageContent: {
        width: 100,
        height: 100,
        icon: IconPCS,
      },
      textContent: {
        column: [
          {
            label: '运行状态：',
            value: '停机',
            field: 'todayConsumption',
          },
          {
            label: '有功功率(kW)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '无功功率(kW)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
        ],
        direction: 'horizontal',
      },
    },
  },
  {
    id: '1-1-1',
    type: 'BatterySystem',
    position,
    data: {
      label: '电池系统',
      width: 744,
      height: 540,
    },
  },
];

export const initialEdges: Edge[] = [
  { id: '111', source: '1', target: '1-1', type: edgeType, animated: true },
  { id: '112', source: '1-1', target: '1-1-1', type: edgeType, animated: true },
  { id: '112', source: '1-1-1-a', target: '1-1-1-b', type: edgeType, animated: true },
  { id: '112', source: '1-1-1-b', target: '1-1-1-c', type: edgeType, animated: true },
  // { id: '113', source: '1-1-1', target: '1-1-1-a', type: edgeType, animated: true },
];
