import { Edge, Node } from 'reactflow';
import { ExtraNodeData, GraphNode } from '../type';
import IconPCS from './svg-icon/icon_储能pcs.svg';
import IconSystemCloud from './svg-icon/云系统3.svg';
import Icon_MQTT from './svg-icon/icon_MQTT服务器.svg';
import { isEmpty, uniqueId } from 'lodash';
import { TypeCommunicationData, VirtualDeviceType } from './type';
import { buildEdges, flattenTree } from '../helper';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const genSystemCloud = () => ({
  id: uniqueId(),
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
});

const genMQTT = (data: TypeCommunicationData) => ({
  id: uniqueId(),
  type: 'imageNode',
  position,
  data: {
    label: 'pcs',
    width: 110,
    height: 120,
    layout: 'center',
    title: data.name,
    imageContent: {
      width: 110,
      height: 120,
      icon: Icon_MQTT,
    },
  },
});

const genBoxText = (data: TypeCommunicationData) => ({
  id: uniqueId(),
  type: 'BoxTextNode',
  position,
  data: {
    label: data.name,
    width: 136,
    height: 42,
    boxText: {
      label: data.name,
      width: 136,
      height: 42,
    },
  },
});

const genBox = (data: TypeCommunicationData) => ({
  id: uniqueId(),
  type: 'BatterySystem',
  position,
  data: {
    title: data.name,
    width: 500,
    height: 240,
    boxData: data.children,
  },
});

const getNodeByType = (type: VirtualDeviceType, data: TypeCommunicationData) => {
  switch (type) {
    case VirtualDeviceType.MQTT:
      return genMQTT(data);
    case VirtualDeviceType.HW:
    case VirtualDeviceType.EM:
    case VirtualDeviceType.XJ:
      const node = genBoxText(data) as GraphNode;
      node.children = [genBox(data) as GraphNode];
      return node;
    default:
      break;
  }
};

const buildTreeByData = (
  data: TypeCommunicationData | TypeCommunicationData[],
  nodes: GraphNode[] = [],
) => {
  // 二级
  if (!Array.isArray(data) && data.type === VirtualDeviceType.MQTT) {
    const root = genSystemCloud() as GraphNode;
    root.children = [];
    nodes.push(root);

    const node = getNodeByType(data.type, data) as GraphNode;
    node.children = [];
    root.children.push(node);
    buildTreeByData(data.children as TypeCommunicationData[], node.children);
  }

  if (Array.isArray(data)) {
    data?.forEach((it) => {
      const node = getNodeByType(it.type, it) as GraphNode;
      if (node) {
        nodes.push(node);
      }
    });
  }

  return nodes;
};

export const getNodesAndEdges = (data: TypeCommunicationData) => {
  if (isEmpty(data)) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const initialNodes = buildTreeByData(data);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
