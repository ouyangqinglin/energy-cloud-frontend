import { Edge, Node, Position } from 'reactflow';
import IconInverter from './svg-icon/icon_华为逆变器1.svg';
import { ExtraNodeData } from '../type';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes: Node<ExtraNodeData>[] = [
  {
    id: '1',
    type: 'EmptyRootNode',
    data: {
      label: '市电',
    },
    position,
  },
  {
    id: '2',
    type: 'imageNode',
    data: {
      label: 'input',
      width: 77,
      height: 90,
      title: '逆变器01',
      imageContent: {
        icon: IconInverter,
        width: 77,
        height: 90,
      },
      textContent: {
        column: [
          {
            label: '当日充电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '发电功率(kW)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
        ],
        direction: 'vertical',
      },
    },
    sourcePosition: Position.Left,
    position: {
      x: 100,
      y: 100,
    },
  },
  {
    id: '2-1',
    type: 'PhotovoltaicPanelGroup',
    parentNode: '2',
    extent: 'parent',
    data: {
      label: 'input',
      width: 200,
      height: 100,
      title: '光伏板',
    },
    targetPosition: Position.Left,
    position: {
      x: 250,
      y: 0,
    },
  },
  {
    id: '3',
    type: 'imageNode',
    data: {
      label: 'input',
      width: 77,
      height: 90,
      title: '逆变器01',
      imageContent: {
        icon: IconInverter,
        width: 77,
        height: 90,
      },
      textContent: {
        column: [
          {
            label: '当日充电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '发电功率(kW)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
        ],
        direction: 'vertical',
      },
    },
    sourcePosition: Position.Left,
    position: {
      x: -100 - 77,
      y: 60,
    },
  },
  {
    id: '3-1',
    type: 'PhotovoltaicPanelGroup',
    parentNode: '2',
    extent: 'parent',
    data: {
      label: 'input',
      width: 200,
      height: 100,
      title: '光伏板',
    },
    targetPosition: Position.Left,
    position: {
      x: -250 - 400,
      y: -40,
    },
  },
];

export const initialEdges: Edge[] = [
  {
    id: '111',
    source: '1',
    target: '2',
    type: edgeType,
    animated: true,
    targetHandle: 'target-left',
  },
  {
    id: '111',
    source: '1',
    target: '3',
    type: edgeType,
    animated: true,
    targetHandle: 'target-right',
  },
  {
    id: '112',
    source: '2',
    target: '2-1',
    type: edgeType,
    animated: true,
    targetHandle: 'c',
    sourceHandle: 'source-right',
  },
  {
    id: '113',
    source: '2',
    target: '2-1',
    type: edgeType,
    animated: true,
    targetHandle: 'd',
    sourceHandle: 'source-right',
  },

  {
    id: '114',
    source: '3',
    target: '3-1',
    type: edgeType,
    animated: true,
    targetHandle: 'a',
    sourceHandle: 'source-left',
  },
  {
    id: '115',
    source: '3',
    target: '3-1',
    type: edgeType,
    animated: true,
    targetHandle: 'b',
    sourceHandle: 'source-left',
  },
];
