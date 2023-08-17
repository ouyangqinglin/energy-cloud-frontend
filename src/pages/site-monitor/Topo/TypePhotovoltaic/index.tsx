import { FC, useEffect } from 'react';
import type { Edge, Node } from 'reactflow';
import { Position } from 'reactflow';
import { useNodesState, useEdgesState } from 'reactflow';
import dagre from 'dagre';

import { getNodesAndEdges } from './nodes-edges';

import { ImageNode } from '../components/ImageNode/index';
import type { ExtraNodeData, GraphNode } from '../type';
import { ReactFlowReactivity } from '../components/ReactFlowReactivity';
import EmptyRootNode from './components/EmptyRootNode';
import PhotovoltaicPanelGroup from './components/PhotovoltaicPanelGroup';
import { useRequest } from 'umi';
import { getTopo } from './service';

const nodeTypes = {
  imageNode: ImageNode,
  EmptyRootNode: EmptyRootNode,
  PhotovoltaicPanelGroup: PhotovoltaicPanelGroup,
};

const TopoTypePhotovoltaic: FC<{ siteId: number }> = ({ siteId }) => {
  const [nodes, resetNodes] = useNodesState([]);
  const [edges, resetEdges] = useEdgesState([]);

  const { data, run } = useRequest(getTopo, {
    manual: true,
  });

  useEffect(() => {
    if (data) {
      const { initialEdges, initialNodes } = getNodesAndEdges(data);
      console.log(initialNodes);
      resetNodes(initialNodes);
      resetEdges(initialEdges);
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
      nodeTypes={nodeTypes}
      // attributionPosition="left-right"
    />
  );
};

// export default LayoutFlow;
export default TopoTypePhotovoltaic;
