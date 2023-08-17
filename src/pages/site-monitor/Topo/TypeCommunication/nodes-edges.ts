import { Edge, Node } from 'reactflow';
import { ExtraNodeData } from '../type';
import IconPCS from './svg-icon/icon_储能pcs.svg';
import IconSystemCloud from './svg-icon/云系统3.svg';
import IconBatteryPack from './svg-icon/icon_batteryPack.svg';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes: Node<ExtraNodeData>[] = [
  {
    id: '1',
    type: 'imageNode',
    position,
    data: {
      label: 'pcs',
      width: 110,
      height: 120,
      layout: 'center',
      title: '光储充及工商储运维管理云平台',
      imageContent: {
        width: 110,
        height: 120,
        icon: IconSystemCloud,
      },
    },
  },
  {
    id: '1-1',
    type: 'BoxTextNode',
    position,
    data: {
      label: '1#储能EMS',
      width: 136,
      height: 42,
      boxText: {
        label: '1#储能EMS',
        width: 136,
        height: 42,
      },
    },
  },
  {
    id: '1-1-1',
    type: 'BatterySystem',
    position,
    data: {
      label: '储能',
      width: 310,
      height: 240,
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
