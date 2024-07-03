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
  esMap?: string;
  esMapData?: string[];
  esMapSpan?: number | undefined;
  deviceId?: string;
  deviceName?: string;
  sn?: string;
  collection?: string;
  id?: string;
  rowId?: string;
  area: string;
  type: string;
  maximumLoadOfTransformer: { name?: string; value?: strting; editable?: 0 | 1 };
  mainsSupplyMeters?: MonitorDataType[];
};

export type TableDataType = {
  row1: MonitorDataType[];
  row2: MonitorDataType[];
  row3?: MonitorDataType[];
  row4?: MonitorDataType[];
  row5?: MonitorDataType[];
  row6?: MonitorDataType[];
  row7?: MonitorDataType[];
};

export type AllTableDataType = {
  electric: TableDataType;
  photovoltaic: TableDataType;
  energy: TableDataType;
  charge: TableDataType;
  load: TableDataType;
  fanRatedPower: TableDataType;
  dieselRatedPower: TableDataType;
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
