export type MonitorDataType = {
  span?: number;
  groupName?: string;
  groupId: number;
  deviceId?: string;
  deviceName?: string;
  sn?: string;
  collection?: string;
  isAdd?: boolean;
  id?: string;
  rowId?: string;
  area: string;
  type: string;
  esDevices: any[];
  groupId?: string;
  maximumLoadOfTransformer: { name?: string; value?: strting; editable?: 0 | 1 };
  mainsSupplyMeters?: MonitorDataType[];
  masterSlaveMode?: number | string;
};
