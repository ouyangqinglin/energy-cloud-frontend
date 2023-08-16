import { uniqueId } from 'lodash';
import type { Edge, Node } from 'reactflow';
import type { ExtraNodeData, GraphNode } from './type';

const edgeType = 'smoothstep';

export const buildEdges = (nodes: GraphNode[] = [], edges: Edge[] = [], sourceId?: string) => {
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

export const flattenTree = (nodes: GraphNode[] = [], arr: Node<ExtraNodeData>[] = []) => {
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
