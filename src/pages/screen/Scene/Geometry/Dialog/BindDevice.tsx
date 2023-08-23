import { dealTreeDataType, SelectTypeEnum, TableTreeModal } from '@/components/TableSelect';
import { getDeviceCollection, getDeviceTree } from '@/services/equipment';
import { ProColumns } from '@ant-design/pro-table';
import { useBoolean } from 'ahooks';
import { useCallback } from 'react';
import { getSiteId } from '../../helper';

const BindDevice = <V = any,>(props: {
  value: V[];
  onChange: (value: V[]) => void;
  open: boolean;
  onCancel: () => void;
}) => {
  const requestTree = useCallback(() => {
    return getDeviceTree({ siteId: getSiteId() });
  }, []);

  const tableSelectColumns: ProColumns[] = [
    {
      title: '设备采集点ID',
      dataIndex: 'paramCode',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '设备采集点',
      dataIndex: 'paramName',
      width: 200,
      ellipsis: true,
    },
  ];
  const dealTreeData = useCallback<dealTreeDataType>((item) => {
    if (item.productId) {
      item.selectable = true;
    }
  }, []);

  return (
    <TableTreeModal
      model="screen"
      multiple={false}
      selectType={SelectTypeEnum.Device}
      title="选择设备"
      treeProps={{
        fieldNames: {
          title: 'deviceName',
          key: 'id',
          children: 'children',
        },
        request: requestTree,
      }}
      dealTreeData={dealTreeData}
      proTableProps={{
        columns: tableSelectColumns,
        request: getDeviceCollection,
        pagination: false,
      }}
      valueId="id"
      valueName="deviceName"
      {...props}
    />
  );
};

export default BindDevice;
