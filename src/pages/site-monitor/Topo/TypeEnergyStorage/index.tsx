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
import ACBus from './components/ACBus';
import BatterySystem from './components/BatterySystem';
import { BatteryCluster } from './components/BatteryCluster';
import { getTopo } from './service';
import { useRequest } from 'umi';

const nodeTypes = {
  imageNode: ImageNode,
  statisticCard: StatisticCard,
  statisticCardForME: StatisticCardForME,
  ACBus: ACBus,
  BatterySystem: BatterySystem,
  BatteryCluster: BatteryCluster,
};

const getNodeRealSize = (node: Node<ExtraNodeData>) => {
  const { data } = node;
  const size = {
    width: data.width ?? 0,
    height: data.height ?? 0,
  };
  return size;
};

const getLayoutedElements = (nodes: Node<ExtraNodeData>[], edges: Edge[], direction = 'TB') => {
  if (!nodes.length) {
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

    const size = getNodeRealSize(node);
    if (!node.parentNode) {
      node.position = {
        x: nodeWithPosition!.x - size.width / 2,
        y: nodeWithPosition!.y - size.height / 2,
      };
    }
    return node;
  });

  return { nodes, edges };
};

const TopoTypeEnergyStorage: FC<{ siteId: number }> = ({ siteId }) => {
  const [nodes, resetNodes] = useNodesState([]);
  const [edges, resetEdges] = useEdgesState([]);

  const { data, run } = useRequest(getTopo, {
    manual: true,
  });

  useEffect(() => {
    if (data) {
      const { initialNodes, initialEdges } = getNodesAndEdges(data);
      const { nodes: nodesLayout, edges: edgesLayout } = getLayoutedElements(
        initialNodes,
        initialEdges,
      );
      resetNodes([...nodesLayout]);
      resetEdges(edgesLayout);
      console.log(initialNodes);
    }
  }, [data, resetEdges, resetNodes]);

  useEffect(() => {
    if (siteId) {
      run({ siteId });
    }
  }, [siteId]);

  return (
    <ReactFlowReactivity
      nodes={nodes}
      edges={edges}
      // onNodesChange={onNodesChange}
      // onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
    />
  );
};

// export default LayoutFlow;
export default TopoTypeEnergyStorage;
