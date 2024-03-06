import Detail from '@/components/Detail';
import { Button, Modal, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useRef, useContext, useState } from 'react';
import { formatMessage } from '@/utils';
import DeviceContext from '@/components/Device/Context/DeviceContext';
import { useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ConfigDataType } from './data';
import { columns } from './config';
import { getEmsAssociationDevice } from '@/services/equipment';
import AddForm from './AddForm/index';

export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const EVChargerOrderInfo: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const { data: deviceData } = useContext(DeviceContext);
  const [addVisible, setAddVisible] = useState<boolean>(false);

  console.log('deviceData>>', deviceData);
  console.log('props>>', props);
  const actionRef = useRef<ActionType>();
  const {
    data: associationData,
    run,
    loading,
  } = useRequest(getEmsAssociationDevice, {
    manual: true,
  });
  const mockData = [
    {
      serialNumber: '1',
      ConfigName: '1',
      networkStatus: '1',
      ratedCurrent: '1',
      associatedHosts: '1',
    },
  ];
  useEffect(() => {
    if (deviceId) {
      run({ deviceId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId]);

  const handleRemoveOne = (rowData: ConfigDataType) => {
    console.log('rowData>>', rowData);
    return true;
  };

  const handleOpenAssociate = (rowData: ConfigDataType) => {
    console.log('rowData>>', rowData);
    return true;
  };
  const handleAdd = (rowData: ConfigDataType) => {
    console.log('rowData>>', rowData);
    return true;
  };
  const actionColumn: ProColumns[] = [
    {
      title: formatMessage({ id: 'device.associatedHosts', defaultMessage: '关联主机' }),
      dataIndex: 'associatedHosts',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        const rowData = record as ConfigDataType;
        return [
          <Switch
            checked={Boolean(record.associatedHosts)}
            key="Checke"
            onClick={async () => {
              Modal.confirm({
                title: formatMessage({ id: 'device.associatedHosts', defaultMessage: '关联主机' }),
                content: `${rowData.ConfigName}${formatMessage({
                  id: 'device.openTerminal',
                  defaultMessage: '开启关联',
                })}`,
                okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
                cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
                onOk: async () => {
                  const success = await handleOpenAssociate(rowData);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                },
              });
            }}
          />,
        ];
      },
    },
    {
      title: formatMessage({ id: 'alarmManage.operate', defaultMessage: '操作' }),
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        const rowData = record as ConfigDataType;
        return [
          <Button
            type="link"
            size="small"
            danger
            key="batchRemove"
            onClick={async () => {
              Modal.confirm({
                title: formatMessage({ id: 'pages.searchTable.delete', defaultMessage: '删除' }),
                content: `${formatMessage({
                  id: 'device.deleteTerminal',
                  defaultMessage: '确定删除终端',
                })}${rowData.ConfigName}？`,
                okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
                cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
                onOk: async () => {
                  const success = await handleRemoveOne(rowData);
                  if (success) {
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  }
                },
              });
            }}
          >
            {formatMessage({ id: 'pages.searchTable.delete', defaultMessage: '删除' })}
          </Button>,
        ];
      },
    },
  ];
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.terminalConfig', defaultMessage: '终端配置' })}
        className="mt16"
      />
      <YTProTable<ConfigDataType>
        loading={loading}
        actionRef={actionRef}
        columns={[...columns, ...actionColumn]}
        dataSource={mockData}
        search={false}
        scroll={{ y: 'auto' }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={async () => {
              setAddVisible(true);
            }}
          >
            <PlusOutlined />{' '}
            {formatMessage({ id: 'pages.searchTable.new', defaultMessage: '新建' })}
          </Button>,
        ]}
      />
      <AddForm
        onSubmit={async (values) => {
          let success = false;
          success = await handleAdd({ ...values });
          if (success) {
            setAddVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          setAddVisible(false);
        }}
        visible={addVisible}
      />
    </div>
  );
};
export default EVChargerOrderInfo;
