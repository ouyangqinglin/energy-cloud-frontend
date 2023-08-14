import { FC, useEffect } from 'react';
import type { Edge, Node } from 'reactflow';
import { Position } from 'reactflow';
import { useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';

import { getNodesAndEdges } from './nodes-edges';

import { ImageNode } from '../components/ImageNode/index';
import type { ExtraNodeData, GraphNode } from '../type';
import { StatisticCard } from '../components/StatisticCard';
import { StatisticCardForME } from '../components/StatisticCardForME';
import { ReactFlowReactivity } from '../components/ReactFlowReactivity';
import { useRequest } from 'umi';
import { getTypeAllTopo } from './service';

const nodeTypes = {
  imageNode: ImageNode,
  statisticCard: StatisticCard,
  statisticCardForME: StatisticCardForME,
};

const getNodeRealSize = (node: Node<ExtraNodeData>) => {
  const { data } = node;
  const size = {
    width: data.width,
    height: data.height,
  };
  if (data.textContent) {
    size.width = size.width + 180;
  }
  if (data.title) {
    size.height = size.height + 20;
  }
  return size;
};

const getLayoutedElements = (nodes: Node<ExtraNodeData>[], edges: Edge[], direction = 'TB') => {
  if (nodes.length <= 3) {
    return { nodes, edges };
  }
  const dagreGraph = new dagre.graphlib.Graph<Node<ExtraNodeData>, Edge>();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: direction, nodesep: 100, ranksep: 100 });

  nodes.forEach((node) => {
    const size = getNodeRealSize(node);
    dagreGraph.setNode(node.id, {
      width: size.width,
      height: size.height,
    } as GraphNode);
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = Position.Top;
    node.sourcePosition = Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    const size = getNodeRealSize(node);
    if (!node.parentNode) {
      node.position = {
        x: nodeWithPosition.x - size.width / 2,
        y: nodeWithPosition.y - size.height / 2,
      };
    }

    return node;
  });

  return { nodes, edges };
};

// const { nodes: defaultLayoutedNodes, edges: defaultLayoutedEdges } = getLayoutedElements(
//   initialNodes,
//   initialEdges,
// );

const TopoTypeAll: FC<{ siteId: number }> = ({ siteId }) => {
  const [nodes, resetNodes, onNodesChange] = useNodesState([]);
  const [edges, resetEdges, onEdgesChange] = useEdgesState([]);

  const { data, run } = useRequest(getTypeAllTopo, {
    manual: true,
  });

  useEffect(() => {
    if (data) {
      const { initialEdges, initialNodes, immutableNodes } = getNodesAndEdges(data);
      const { nodes: nodesLayout, edges: edgesLayout } = getLayoutedElements(
        initialNodes,
        initialEdges,
      );
      resetNodes([...immutableNodes, ...nodesLayout]);
      resetEdges(edgesLayout);
      console.log([...immutableNodes, ...nodesLayout]);
    }
  }, [data, resetEdges, resetNodes]);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  return (
    <ReactFlowReactivity
      nodes={[...nodes]}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    />
  );
};

// export default LayoutFlow;
export default TopoTypeAll;
