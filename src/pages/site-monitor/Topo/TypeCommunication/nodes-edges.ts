import type { Edge } from 'reactflow';
import type { GraphNode } from '../type';
import IconSystemCloud from './svg-icon/云系统3.svg';
import Icon_MQTT from './svg-icon/icon_MQTT服务器.svg';
import { isEmpty, uniqueId } from 'lodash';
import type { TypeCommunicationData } from './type';
import { VirtualDeviceType } from './type';
import { buildEdges, flattenTree } from '../helper';
import { formatMessage } from '@/utils';

const position = { x: 0, y: 0 };
const genSystemCloud = () => ({
  id: uniqueId(),
  type: 'imageNode',
  position,
  data: {
    label: 'pcs',
    width: 110,
    height: 120,
    layout: 'center',
    title: formatMessage({
      id: 'siteMonitor.PV-ESS-EVManagementCloudPlatform',
      defaultMessage: '光储充及工商储运维管理云平台',
    }),
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
    case VirtualDeviceType.Energy:
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

const buildTreeByData = (data: TypeCommunicationData[], nodes: GraphNode[] = []) => {
  data?.forEach?.((item) => {
    let node;
    if (item.type === VirtualDeviceType.System) {
      node = genSystemCloud() as GraphNode;
    } else {
      node = getNodeByType(item.type, item) as GraphNode;
    }
    if (node) {
      if (
        item.children &&
        item.children.length &&
        [VirtualDeviceType.System, VirtualDeviceType.MQTT].includes(item.type)
      ) {
        node.children = [];
        buildTreeByData(item.children, node.children);
      }
      nodes.push(node);
    }
  });
  return nodes;
};

export const getNodesAndEdges = (data: TypeCommunicationData) => {
  if (isEmpty(data)) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const initialNodes = buildTreeByData([data]);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
