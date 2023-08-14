import { Edge, Node } from 'reactflow';
import IconME from './svg-icon/icon市电3.svg';
import IconDistributionCabinet from './svg-icon/icon_配电柜.svg';
import IconPowerGenerationUnit from './svg-icon/icon_发电单元.svg';
import IconES from './svg-icon/icon_储能.svg';
import IconPV from './svg-icon/icon_光伏.svg';
import IconLoadCS from './svg-icon/icon_负载_充电桩.svg';
import IconLoadOther from './svg-icon/icon_负载.svg';
import { ExtraNodeData, GraphNode, TreeNode } from '../type';
import { AllTypeData, MainsSupply, SubsystemTypeForNode } from './type';
import { isEmpty, uniqueId } from 'lodash';
import { SiteDataType } from '@/services/station';
import { SiteType, SiteTypeEnum } from '@/components/SiteTypeSwitch';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const hasPVInSiteType = (energyOptions: SiteTypeEnum) =>
  [SiteTypeEnum.PV, SiteTypeEnum.PV_ES, SiteTypeEnum.PV_ES_CS].includes(energyOptions);

// 获取概览统计
const genOverViewStatistic = (data: AllTypeData) => {
  const column = [
    {
      label: '园区总用电（kWh）',
      value: data.siteTotal,
      field: 'todayConsumption',
    },
  ];
  if (hasPVInSiteType(data.energyOptions)) {
    column.push({
      label: '光伏总发电（kWh）',
      value: data.photovoltaicTotal,
      field: 'todayConsumption',
    });
  }
  return {
    id: uniqueId(),
    type: 'statisticCard',
    position: {
      x: 31,
      y: 0,
    },
    data: {
      label: '市电',
      width: 260,
      height: 76,
      textContent: {
        column,
        direction: 'horizontal',
      },
    },
  };
};

const genElectricSupplyNode = (data: MainsSupply) => {
  const parentId = uniqueId();
  return [
    {
      id: parentId,
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
      position: {
        x: 280,
        y: 0,
      },
    },
    {
      id: uniqueId(),
      type: 'statisticCardForME',
      position: {
        x: 160,
        y: 0,
      },
      parentNode: parentId,
      extent: 'parent' as 'parent',
      data: {
        label: '市电数据卡片',
        width: 234,
        height: 106,
        textContent: {
          column: [
            {
              label: '当日购电(kWh)：',
              value: data.todayConsumption,
              field: 'todayConsumption',
            },
            {
              label: '当日售电(kWh)：',
              value: data.todayProduction,
              field: 'todayConsumption',
            },
            {
              label: '电网功率(kW)：',
              value: data.power,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
    },
  ];
};

const genDistributionCabinetNode = (data: MainsSupply) => ({
  id: uniqueId(),
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
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'horizontal',
    },
  },
  position,
});

const genPVNode = (data: MainsSupply) => {
  const pId = uniqueId();
  return [
    {
      id: pId,
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
              value: data.todayConsumption,
              field: 'todayConsumption',
            },
            {
              label: '发电功率(kW)：',
              value: data.power,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
      position,
    },
    {
      id: uniqueId(),
      type: 'imageNode',
      parent: pId,
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
              value: data.pvNum,
              field: 'todayConsumption',
            },
          ],
          direction: 'vertical',
        },
      },
      position,
    },
  ];
};

const genESNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 70,
      height: 80,
      icon: IconES,
    },
    width: 180,
    height: 80,
    title: `储能（剩余电量:${data.dischargeableCapacity}%）`,
    textContent: {
      column: [
        {
          label: '当日充电(kWh)：',
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: '当日放电(kWh)：',
          value: data.todayProduction,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const genLoadCSNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 80,
      height: 78,
      icon: IconLoadCS,
    },
    width: 180,
    height: 78,
    title: '充电桩',
    textContent: {
      column: [
        {
          label: '当日充电(kWh)：',
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const genLoadOtherNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 80,
      height: 78,
      icon: IconLoadOther,
    },
    width: 180,
    height: 78,
    title: '其他用电设备',
    textContent: {
      column: [
        {
          label: '当日充电(kWh)：',
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const buildTreeByData = (data: MainsSupply, nodes: GraphNode[] = []) => {
  if (data) {
    let node: GraphNode | undefined;
    switch (data.type) {
      case SubsystemTypeForNode.PV:
        // 特殊处理，这里实际上数据应该给出俩个子节点的，现在融合成一个了，前端稍微处理一下
        const [pNode, child] = genPVNode(data);
        (pNode as GraphNode).children = [child as GraphNode];
        node = pNode;
        break;
      case SubsystemTypeForNode.CS:
        node = genLoadCSNode(data);
        break;
      case SubsystemTypeForNode.ES:
        node = genESNode(data);
        break;
      case SubsystemTypeForNode.OTHER:
        node = genLoadOtherNode(data);
        break;
      case SubsystemTypeForNode.SUPPLY:
        const [pSNode, sChild] = genElectricSupplyNode(data);
        (pSNode as GraphNode).relation = [sChild as GraphNode];
        node = pSNode;
        break;
      case SubsystemTypeForNode.DC:
        node = genDistributionCabinetNode(data);
        break;
      default:
        break;
    }

    if (data.children && node) {
      (node as GraphNode).children = [];
      data.children.forEach((d) => {
        buildTreeByData(d, node?.children);
      });
    }

    if (node) {
      nodes.push(node);
    }
  }
  return nodes;
};

const buildEdges = (nodes: GraphNode[] = [], edges: Edge[] = [], sourceId?: string) => {
  if (!nodes.length) {
    return;
  }
  nodes.forEach((node) => {
    if (sourceId) {
      edges.push({
        id: uniqueId(),
        source: sourceId,
        target: node.id,
        type: edgeType,
        animated: true,
      });
    }
    if (node.children) {
      buildEdges(node.children, edges, node.id);
    }
  });
  return edges;
};

const flattenTree = (nodes: GraphNode[] = [], arr: Node<ExtraNodeData>[] = []) => {
  if (nodes?.length) {
    nodes.forEach((node) => {
      arr.push(node);
      if (node.relation) {
        arr.push(...node.relation);
      }

      if (node?.children) {
        flattenTree(node.children, arr);
      }
    });
  }
  return arr;
};

export const getNodesAndEdges = (data: AllTypeData) => {
  if (isEmpty(data)) {
    return {
      immutableNodes: [],
      initialNodes: [],
      initialEdges: [],
    };
  }
  const immutableNodes = [genOverViewStatistic(data)] as Node<ExtraNodeData>[];
  const initialNodes = buildTreeByData(data?.mainsSupply);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    immutableNodes,
    initialNodes: flattenTree(initialNodes) as Node<ExtraNodeData>[],
    initialEdges,
  };
};

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
    id: '1-1',
    type: 'statisticCardForME',
    position: {
      x: 160,
      y: 0,
    },
    parentNode: '1',
    extent: 'parent',
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
      width: 180,
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
      width: 180,
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
      width: 180,
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
