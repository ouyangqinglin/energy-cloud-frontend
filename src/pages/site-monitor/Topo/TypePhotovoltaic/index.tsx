import type { FC } from 'react';
import type { Edge, Node } from 'reactflow';
import { Position } from 'reactflow';
import { useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';

import { initialNodes, initialEdges } from './nodes-edges';

import { ImageNode } from '../components/ImageNode/index';
import type { ExtraNodeData, GraphNode } from '../type';
import { ReactFlowReactivity } from '../components/ReactFlowReactivity';
import EmptyRootNode from './components/EmptyRootNode';
import PhotovoltaicPanelGroup from './components/PhotovoltaicPanelGroup';

const nodeTypes = {
  imageNode: ImageNode,
  EmptyRootNode: EmptyRootNode,
  PhotovoltaicPanelGroup: PhotovoltaicPanelGroup,
};

const dagreGraph = new dagre.graphlib.Graph<Node<ExtraNodeData>, Edge>();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getNodeRealSize = (node: Node<ExtraNodeData>) => {
  const { data } = node;
  const size = {
    width: data.width ?? 0,
    height: data.height ?? 0,
  };
  return size;
};

const getLayoutedElements = (nodes: Node<ExtraNodeData>[], edges: Edge[], direction = 'BT') => {
  return { nodes, edges };
};

const { nodes: defaultLayoutedNodes, edges: defaultLayoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges,
);

const TopoTypePhotovoltaic: FC = () => {
  const [nodes] = useNodesState(defaultLayoutedNodes);
  const [edges] = useEdgesState(defaultLayoutedEdges);

  return (
    <ReactFlowReactivity nodes={[...initialNodes]} edges={initialEdges} nodeTypes={nodeTypes} />
  );
};

// export default LayoutFlow;
export default TopoTypePhotovoltaic;
