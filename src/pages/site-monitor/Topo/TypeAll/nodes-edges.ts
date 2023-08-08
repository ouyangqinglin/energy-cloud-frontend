import { Edge, Node } from 'reactflow';
import IconME from './svg-icon/icon市电3.svg';
import IconDistributionCabinet from './svg-icon/icon_配电柜.svg';
import IconPowerGenerationUnit from './svg-icon/icon_发电单元.svg';
import IconES from './svg-icon/icon_储能.svg';
import IconPV from './svg-icon/icon_光伏.svg';
import IconLoadCS from './svg-icon/icon_负载_充电桩.svg';
import IconLoadOther from './svg-icon/icon_负载.svg';
import { ExtraNodeData } from '../type';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const immutableNodes: Node<ExtraNodeData>[] = [
  {
    id: '0',
    type: 'statisticCard',
    position: {
      x: 31,
      y: 0,
    },
    data: {
      label: '市电',
      width: 220,
      height: 76,
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
        direction: 'horizontal',
      },
    },
  },
  {
    id: '1-1',
    type: 'statisticCardForME',
    position: {
      x: 190,
      y: 0,
    },
    parentNode: '1',
    data: {
      label: '市电数据卡片',
      width: 234,
      height: 106,
      textContent: {
        column: [
          {
            label: '当日购电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '当日售电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '电网功率(kW)：',
            value: 8329.14,
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
    type: 'imageNode',
    data: {
      label: '市电',
      width: 96,
      height: 120,
      imageContent: {
        icon: IconME,
        width: 96,
        height: 120,
      },
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
      title: '1#配电柜',
      imageContent: {
        icon: IconDistributionCabinet,
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
        direction: 'horizontal',
      },
    },
    position,
  },
  {
    id: '2-1',
    type: 'imageNode',
    data: {
      label: 'input',
      width: 65,
      height: 62,
      imageContent: {
        icon: IconPowerGenerationUnit,
        width: 65,
        height: 62,
      },
      title: '1#发电单元',
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
        direction: 'horizontal',
      },
    },
    position,
  },
  {
    id: '2-1-1',
    type: 'imageNode',
    data: {
      label: 'input',
      imageContent: {
        width: 65,
        height: 62,
        icon: IconPV,
      },
      width: 65,
      height: 62,
      textContent: {
        column: [
          {
            label: '组串数：',
            value: 18,
            field: 'todayConsumption',
          },
        ],
        direction: 'vertical',
      },
    },
    position,
  },
  {
    id: '2a',
    type: 'imageNode',
    data: {
      label: 'input',
      imageContent: {
        width: 77,
        height: 90,
        icon: IconDistributionCabinet,
      },
      width: 77,
      height: 90,
      title: '2#配电柜',
      textContent: {
        column: [
          {
            label: '当日充电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '当日放电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '发电功率(kW)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
        ],
        direction: 'horizontal',
      },
    },
    position,
  },
  {
    id: '2a1',
    type: 'imageNode',
    data: {
      label: 'input',
      imageContent: {
        width: 70,
        height: 80,
        icon: IconES,
      },
      width: 70,
      height: 80,
      title: '储能（剩余电量:92%）',
      textContent: {
        column: [
          {
            label: '当日充电(kWh)：',
            value: 8329.14,
            field: 'todayConsumption',
          },
          {
            label: '当日放电(kWh)：',
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
    position,
  },
  {
    id: '2b',
    type: 'imageNode',
    data: {
      label: 'input',
      width: 77,
      height: 90,
      imageContent: {
        width: 77,
        height: 90,
        icon: IconDistributionCabinet,
      },
      title: '3#配电柜',
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
        direction: 'horizontal',
      },
    },
    position,
  },
  {
    id: '2b1',
    type: 'imageNode',
    data: {
      label: 'input',
      imageContent: {
        width: 80,
        height: 78,
        icon: IconLoadCS,
      },
      width: 80,
      height: 78,
      title: '充电桩',
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
    position,
  },
  {
    id: '2b2',
    type: 'imageNode',
    data: {
      label: 'input',
      imageContent: {
        width: 80,
        height: 78,
        icon: IconLoadOther,
      },
      width: 80,
      height: 78,
      title: '其他用电设备',
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
    position,
  },
];

export const initialEdges: Edge[] = [
  { id: '111', source: '1', target: '2', type: edgeType, animated: true },
  { id: '222', source: '1', target: '2a', type: edgeType, animated: true },
  { id: '333', source: '2a', target: '2a1', type: edgeType, animated: true },
  { id: '444', source: '1', target: '2b', type: edgeType, animated: true },
  { id: '555', source: '2b', target: '2b1', type: edgeType, animated: true },
  { id: '666', source: '2b', target: '2b2', type: edgeType, animated: true },
  { id: '777', source: '2', target: '2-1', type: edgeType, animated: true },
  { id: '888', source: '2-1', target: '2-1-1', type: edgeType, animated: true },
];
