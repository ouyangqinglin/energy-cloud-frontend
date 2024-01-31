import type { TreeDataNode, ReactNode } from 'antd';
export interface ModeTreeDataNode extends TreeDataNode {
  id?: string | number;
  name?: string | ReactNode;
  title?: string | ReactNode;
  sortOrder?: number;
  draggable?: boolean;
  type?: string;
  key: string;
  parentId?: string;
  disabled?: boolean;
  enable?: boolean;
  modelName?: string;
  children?: ModeTreeDataNode[];
}

export type PageTemplateType = {
  id: number;
  config: ModeTreeDataNode[] | undefined | null;
  editable: 0 | 1;
  name: string | null;
  remark: string | null;
  createTime: string;
  productIds: string[];
  platform: 0 | 1;
  productModels: string[];
};
