export type PhysicalModelType = {
  id: number;
  name: string;
  editable: 0 | 1;
  remark: string | null;
  createTime: string;
  version: number;
};
export type ThingsConfigType = {
  properties: any[];
  services: any[];
  events: any[];
};

export type PhysicalModelFormType = {
  id?: number;
  name: string;
  remark: string | null;
  thingsConfig: ThingsConfigType;
  version: number;
};

export type FieldFormType = {
  name: string;
  id: string;
  oldId?: string | number;
  json: string;
};

export type FieldType = {
  name: string;
  id: string;
  json: string;
  source: string;
  type: 'property' | 'event' | 'service';
  json: object | string;
};
