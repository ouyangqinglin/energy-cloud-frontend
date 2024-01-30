export type ConfigType = {
  id: string;
  name: string | null;
  parentId: string;
  sortOrder: number;
  type: string;
};

export type PageTemplateType = {
  id: number;
  config: ConfigType | null;
  editable: 0 | 1;
  name: string | null;
  remark: string | null;
  createTime: string;
  productIds: string[];
  platform: 0 | 1;
  productModels: string[];
};
