import Detail from '@/components/Detail';
import { Button, Modal, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { formatMessage } from '@/utils';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ConfigDataType } from './data';
import { columns } from './config';
import { getChargeTerm, addTerminal, termBindMainServer, delTerm } from '@/services/equipment';
import AddForm from './AddForm/index';
import { cloneDeep } from 'lodash';

export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const EVChargerOrderInfo: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const [addVisible, setAddVisible] = useState<boolean>(false);
  const [bindMainServer, setBindMainServer] = useState([]);

  const actionRef = useRef<ActionType>();
  const handleRequest = () => {
    return getChargeTerm({
      deviceId,
    }).then((res) => {
      const result: any = [];
      res.data.forEach((i) => {
        result.push(i.id);
      });
      setBindMainServer(result);
      return {
        data: {
          list: res.data,
          total: res.data.length,
        },
      };
    });
  };

  const handleRemoveOne = async (rowData: ConfigDataType) => {
    try {
      await delTerm({ deviceId: rowData.id });
      return true;
    } catch {
      return false;
    }
  };

  const handleOpenAssociate = async (rowData: ConfigDataType) => {
    const bindTermId = rowData.id;
    const notBindTermId = cloneDeep(bindMainServer);
    const index = notBindTermId.findIndex((i) => i === bindTermId);
    notBindTermId.splice(index, 1);
    try {
      await termBindMainServer({ bindTermId, notBindTermId });
      return true;
    } catch {
      return false;
    }
  };
  const handleAdd = async (rowData: ConfigDataType) => {
    try {
      await addTerminal({ ...rowData, chargingId: deviceId });
      return true;
    } catch {
      return false;
    }
  };
  const actionColumn: ProColumns[] = [
    {
      title: formatMessage({ id: 'device.associatedHosts', defaultMessage: '关联主机' }),
      dataIndex: 'isBindMainServer',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        const rowData = record as ConfigDataType;
        return [
          <Switch
            checked={record.isBindMainServer == 0} //0--关联 1-未关联
            key="Checke"
            onClick={async (value) => {
              console.log('value>>', value);
              if (value) {
                Modal.confirm({
                  title: formatMessage({
                    id: 'device.associatedHosts',
                    defaultMessage: '关联主机',
                  }),
                  content: `${rowData.deviceName} ${formatMessage({
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
              } else {
                Modal.confirm({
                  title: formatMessage({
                    id: 'device.associatedHosts',
                    defaultMessage: '关联主机',
                  }),
                  content: formatMessage({
                    id: 'device.keepOne',
                    defaultMessage: '请至少保留一个终端关联主机！',
                  }),
                  okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
                  cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
                });
              }
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
                })}${rowData.deviceName}？`,
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
        actionRef={actionRef}
        columns={[...columns, ...actionColumn]}
        request={handleRequest}
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
