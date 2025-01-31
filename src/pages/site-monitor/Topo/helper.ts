import { uniqueId } from 'lodash';
import type { Edge, Node } from 'reactflow';
import type { ExtraNodeData, GraphNode } from './type';

const edgeType = 'smoothstep';

export const buildEdges = (
  nodes: GraphNode[] = [],
  edges: Edge[] = [],
  sourceId?: string,
  sourceHandle?: string,
) => {
  if (!nodes.length) {
    return;
  }
  nodes.forEach((node) => {
    if (sourceId) {
      edges.push({
        id: uniqueId(),
        source: sourceId,
        target: node.id,
        targetHandle: node.targetHandle,
        sourceHandle,
        type: edgeType,
      });
    }
    if (node.children) {
      buildEdges(node.children, edges, node.id, node.sourceHandle);
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

export const toCenterTree = (nodes: GraphNode[]) => {
  let centerX: number = 0;
  nodes.forEach((node, index) => {
    if (node.children && node.children.length && node?.data?.toCenter) {
      const childrenCenterX = toCenterTree(node.children);
      node.position.x = childrenCenterX;
    }
    if (index === 0 || index === nodes.length - 1) {
      centerX += node.position.x;
    }
  });
  if (nodes.length > 1) {
    centerX = centerX / 2;
  }
  return centerX;
};
