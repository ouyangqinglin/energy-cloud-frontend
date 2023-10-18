export type TreeDataType = {
  deviceName: string;
  deviceSN: string;
  id: string;
  parentId: string;
  children: TreeDataType[];
  selectFlag: boolean;
  productId: number;
  productTypeId: number;
};

export type MonitorDataType = {
  span?: number;
  project?: string;
  deviceName?: string;
  sn?: string;
  collection?: string;
  id?: string;
  rowId?: string;
  area: string;
  type: string;
};

export type TableDataType = {
  elec: MonitorDataType[];
  row1: MonitorDataType[];
  row2: MonitorDataType[];
  row3?: MonitorDataType[];
};

export type AllTableDataType = {
  electric: TableDataType;
  photovoltaic: TableDataType;
  energy: TableDataType;
  charge: TableDataType;
  load: TableDataType;
};

export type TableTreeDataType = {
  id?: string;
  name?: string;
  node: {
    paramName?: string;
    deviceName?: string;
    deviceSN?: string;
  };
};
