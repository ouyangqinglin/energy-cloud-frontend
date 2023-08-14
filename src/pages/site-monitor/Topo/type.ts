import type { Node } from 'reactflow';
import { BoxTextProp } from './components/BoxText';

export type GraphNode = ExtraNode & Node;

export type ExtraNode = {
  data: ExtraNodeData;
  pId?: string;
  // children 下的节点需要生成edges
  children?: GraphNode[];
  // relation 下的节点不需要生成edges
  relation?: GraphNode[];
};

export type ExtraNodeData = {
  label: string;
  title?: string;
  width?: number;
  height?: number;
  layout?: 'start' | 'center' | 'end';
  rawData?: any;
  handle?: {
    start?: {
      left?: number;
      top?: number;
    };
    end?: {
      left?: number;
      top?: number;
    };
  };

  // pv
  pvPanel?: {};
  // common
  textContent?: ExtraNodeTextContent;
  boxText?: BoxTextProp;
  imageContent?: {
    width?: number;
    icon?: string;
    height?: number;
    soc?: number;
  };
};

export type ExtraNodeTextContent = {
  column?: ExtraNodeColumn[];
  boxText?: BoxTextProp;
  direction?: string;
};

export type ExtraNodeColumn = {
  label: string;
  value?: number | string;
  field?: string;
};
