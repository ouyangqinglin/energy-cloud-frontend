import { dealTreeDataType, SelectTypeEnum, TableTreeModal } from '@/components/TableSelect';
import { getDeviceCollection, getDeviceTree } from '@/services/equipment';
import { ProColumns } from '@ant-design/pro-table';
import { useBoolean } from 'ahooks';
import { useCallback } from 'react';
import { getSiteId } from '../../helper';
import { formatMessage } from '@/utils';

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
      title: formatMessage({ id: 'siteManage.set.dataCollectionPoints', defaultMessage: '数据采集点' }),
      dataIndex: 'paramName',
      width: 200,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'siteManage.set.dataCollectionPointIdIdentify', defaultMessage: '数据采集点标识' }),
      dataIndex: 'paramCode',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
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
      title={formatMessage({ id: 'screen.selectDevice', defaultMessage: '选择设备' })}
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
