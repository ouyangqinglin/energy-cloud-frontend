import { Edge, Node, Position } from 'reactflow';
import IconInverter from './svg-icon/icon_华为逆变器1.svg';
import { ExtraNodeData, GraphNode } from '../type';
import { isEmpty, uniqueId } from 'lodash';
import { PvInverterVoList, PvPanelVoList, TypePhotovoltaicData } from './type';
import { buildEdges, flattenTree } from '../helper';

const position = { x: 0, y: 0 };
// const edgeType = 'smoothstep';

// export const initialNodes: Node<ExtraNodeData>[] = [
//   {
//     id: '1',
//     type: 'EmptyRootNode',
//     data: {
//       label: '市电',
//       width: 120,
//       height: 40,
//       textContent: {
//         column: [
//           {
//             label: '当日发电(kWh)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//           {
//             label: '发电功率(kW)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//         ],
//         direction: 'vertical',
//       },
//     },
//     position,
//   },
//   {
//     id: '2',
//     type: 'imageNode',
//     data: {
//       label: 'input',
//       width: 77,
//       height: 90,
//       title: '逆变器01',
//       imageContent: {
//         icon: IconInverter,
//         width: 77,
//         height: 90,
//       },
//       textContent: {
//         column: [
//           {
//             label: '当日充电(kWh)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//           {
//             label: '发电功率(kW)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//         ],
//         direction: 'vertical',
//       },
//     },
//     sourcePosition: Position.Left,
//     position: {
//       x: 100,
//       y: 100,
//     },
//   },
//   {
//     id: '2-1',
//     type: 'PhotovoltaicPanelGroup',
//     parentNode: '2',
//     extent: 'parent',
//     data: {
//       label: 'input',
//       width: 200,
//       height: 100,
//       title: '光伏板',
//     },
//     targetPosition: Position.Left,
//     position: {
//       x: 250,
//       y: 0,
//     },
//   },
//   {
//     id: '3',
//     type: 'imageNode',
//     data: {
//       label: 'input',
//       width: 77,
//       height: 90,
//       title: '逆变器01',
//       imageContent: {
//         icon: IconInverter,
//         width: 77,
//         height: 90,
//       },
//       textContent: {
//         column: [
//           {
//             label: '当日充电(kWh)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//           {
//             label: '发电功率(kW)：',
//             value: 8329.14,
//             field: 'todayConsumption',
//           },
//         ],
//         direction: 'vertical',
//       },
//     },
//     sourcePosition: Position.Left,
//     position: {
//       x: -100 - 77,
//       y: 60,
//     },
//   },
//   {
//     id: '3-1',
//     type: 'PhotovoltaicPanelGroup',
//     parentNode: '2',
//     extent: 'parent',
//     data: {
//       label: 'input',
//       width: 400,
//       height: 100,
//       title: '光伏板',
//     },
//     targetPosition: Position.Left,
//     position: {
//       x: -250 - 400,
//       y: -40,
//     },
//   },
// ];

// export const initialEdges: Edge[] = [
//   {
//     id: '111',
//     source: '1',
//     target: '2',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'target-left',
//   },
//   {
//     id: '111',
//     source: '1',
//     target: '3',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'target-right',
//   },
//   {
//     id: '112',
//     source: '2',
//     target: '2-1',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'c',
//     sourceHandle: 'source-right',
//   },
//   {
//     id: '113',
//     source: '2',
//     target: '2-1',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'd',
//     sourceHandle: 'source-right',
//   },

//   {
//     id: '114',
//     source: '3',
//     target: '3-1',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'a',
//     sourceHandle: 'source-left',
//   },
//   {
//     id: '115',
//     source: '3',
//     target: '3-1',
//     type: edgeType,
//     animated: true,
//     targetHandle: 'b',
//     sourceHandle: 'source-left',
//   },
// ];

const genOverviewNode = (data: TypePhotovoltaicData) => ({
  id: uniqueId(),
  type: 'EmptyRootNode',
  data: {
    label: '市电',
    width: 120,
    height: 40,
    textContent: {
      column: [
        {
          label: '当日发电(kWh)：',
          value: data.totalGenerateElec,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.totalGeneratePower,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const genPVPanelGroup = (data: PvPanelVoList[]) => ({
  id: uniqueId(),
  type: 'PhotovoltaicPanelGroup',
  // 需要被赋值
  // parentNode: '2',
  extent: 'parent',
  data: {
    label: 'input',
    width: 400,
    height: 100,
    title: '光伏板',
    pvPanelData: data,
  },
  targetPosition: Position.Left,
  position: {
    x: -250 - 400,
    y: -40,
  },
});

const genPVInverter = (data: PvInverterVoList) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    width: 77,
    height: 90,
    title: '逆变器',
    imageContent: {
      icon: IconInverter,
      width: 77,
      height: 90,
    },
    textContent: {
      column: [
        {
          label: '当日充电(kWh)：',
          value: data.generateElecDay,
          field: 'todayConsumption',
        },
        {
          label: '发电功率(kW)：',
          value: data.generatePowerDay,
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
});

const buildTreeByData = (
  data: TypePhotovoltaicData | PvInverterVoList | PvPanelVoList[],
  nodes: GraphNode[] = [],
  level = 0,
) => {
  if ('totalGeneratePower' in data && level === 0) {
    const node = genOverviewNode(data) as GraphNode;
    node.children = [];
    nodes.push(node);
    const { pvInverterVoList } = data;
    if (pvInverterVoList?.length > 0) {
      pvInverterVoList.forEach((pvInverter) => {
        buildTreeByData(pvInverter, node.children, level + 1);
      });
    }
  }
  if ('generateElecDay' in data && level === 1) {
    const node = genPVInverter(data) as GraphNode;
    node.children = [];
    nodes.push(node);
    const { pvPanelVoList } = data;
    buildTreeByData(pvPanelVoList, node.children, level + 1);
  }
  if (Array.isArray(data) && level === 2) {
    const node = genPVPanelGroup(data) as GraphNode;
    nodes.push(node);
  }
  return nodes;
};

/**
 * 布局
 *    —
 *  - |
 *    | -
 *  - |
 *    | -
 * 逆变器：
 *  左侧： x: -170 y: 60 + 每增加一行加200px
 *  右侧： x: 170 y: 100 + 每增加一行加200px
 *
 * 光伏面板（TODO：可以考虑光伏内的数量来计算）
 *  左侧： x: -450 y: -12 + 每增加一行加200px
 *  右侧： x: 250 y: -12 + 每增加一行加200px
 *
 */
// let counter = 1
const calculateLayout = (nodes: GraphNode[] | undefined, level = 0) => {
  if (nodes && level === 0) {
    calculateLayout(nodes?.[0]?.children, level + 1);
  }

  // 逆变器
  if (nodes && level === 1) {
    nodes.forEach((inverterNode, index) => {
      const counter = index + 1;
      const isLeft = counter % 2 === 1;
      const columnNum = Math.ceil(counter / 2) - 1;
      inverterNode.position = {
        x: isLeft ? -170 : 170,
        y: (isLeft ? 60 : 100) + columnNum * 200,
      };
      inverterNode.targetPosition = isLeft ? Position.Right : Position.Left;
      inverterNode.targetHandle = isLeft ? 'target-right' : 'target-left';
      inverterNode.sourcePosition = isLeft ? Position.Left : Position.Right;
      inverterNode.sourceHandle = isLeft ? 'source-left' : 'source-right';

      // 光伏面板
      inverterNode.children?.forEach((pvPanel) => {
        pvPanel.position = {
          x: isLeft ? -450 : 250,
          y: (isLeft ? -12 : -12) + columnNum * 200,
        };
        pvPanel.targetPosition = isLeft ? Position.Right : Position.Left;
        pvPanel.targetHandle = isLeft ? 'right' : 'left';
        pvPanel.parentNode = inverterNode.id;
      });
    });
  }

  return nodes;
};

export const getNodesAndEdges = (data: TypePhotovoltaicData) => {
  if (isEmpty(data)) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const nodesTree = buildTreeByData(data);
  const initialNodes = calculateLayout(nodesTree);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  console.log(initialEdges);
  return {
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
