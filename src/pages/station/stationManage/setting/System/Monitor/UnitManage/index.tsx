import React, { useState, useRef, useEffect } from 'react';
import styles from './index.less';
import { formatMessage, getUniqueNumber } from '@/utils';
import { Table, Button, Input, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { cloneDeep } from 'lodash';
import { useModel, useRequest } from 'umi';
import YTProTable from '@/components/YTProTable';
import type { MonitorDataType } from './data.d';
import type { TableColumnProps } from 'antd';
import { useAuthority } from '@/hooks';
import { optionalDeviceList, unitDeviceList, updataUnitDeviceList } from '@/services/equipment';
import type { ProColumns, ActionType } from '@ant-design/pro-components';

type UnitManagePropsType = {
  deviceTree?: boolean;
};
const EnergyUnitManage: React.FC<UnitManagePropsType> = (props) => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const actionRef = useRef<ActionType>();
  const { authorityMap } = useAuthority([
    'iot:siteConfig:monitoringSave', //保存
    'iot:siteConfig:monitoringOnOff', //开启、关闭监测点按钮
    'iot:siteConfig:deviceTree', //关联设备/采集点
  ]);
  const [energyData, setEnergyData] = useState<any[]>([]);
  const [deviceData, setDeviceData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<MonitorDataType>();
  const [selectedRowsState, setSelectedRows] = useState<MonitorDataType[]>([]);

  const { loading, run } = useRequest(updataUnitDeviceList, {
    manual: true,
  });

  const getUnitDeviceList = (id: any) => {
    unitDeviceList({ siteId: id }).then((res) => {
      setEnergyData(res.data || []);
    });
  };

  useEffect(() => {
    getUnitDeviceList(siteId);
  }, [siteId]);

  const getDeviceList = (row: MonitorDataType, params = {}) => {
    optionalDeviceList({
      siteId,
      groupId: row?.isAdd ? '' : row?.groupId,
      ...params,
    }).then((res) => {
      setDeviceData(res.data || []);
    });
  };
  const onClick = (row: MonitorDataType) => {
    setCurrentRow(row);
    getDeviceList(row);
    setIsModalOpen(true);
  };

  const addEnergyData = () => {
    const cloneEnergyData = cloneDeep(energyData);
    const dataLength = cloneEnergyData.length;
    cloneEnergyData.push({
      groupId: `${getUniqueNumber(5)}`,
      isAdd: true,
      groupName: `${dataLength}#储能单元`,
      esDevices: [
        {
          deviceName: '关联数据采集点',
          sn: '--',
        },
      ],
      mainsSupplyMeters: [
        {
          deviceName: '--',
          maximumLoadOfTransformer: {
            value: '--',
          },
        },
      ],
    });
    setEnergyData(cloneEnergyData);
  };

  const deleteData = (record: MonitorDataType) => {
    const cloneEnergyData = cloneDeep(energyData);
    const groupId = record.groupId;
    const index = cloneEnergyData.findIndex((i) => i.groupId == groupId);
    cloneEnergyData.splice(index, 1);
    setEnergyData(cloneEnergyData);
    message.success(formatMessage({ id: 'common.del', defaultMessage: '删除成功' }));
  };

  const changeTableData = (record: MonitorDataType, value: any, key: string) => {
    const cloneEnergyData = cloneDeep(energyData);
    const groupId = record.groupId;
    const index = cloneEnergyData.findIndex((i) => i.groupId == groupId);
    cloneEnergyData[index][key] = value;
    if (key == 'esDevices') {
      cloneEnergyData[index].mainsSupplyMeters = value[0].mainsSupplyMeters || [
        {
          deviceName: '--',
          maximumLoadOfTransformer: {
            value: '--',
          },
        },
      ];
    }
    setEnergyData(cloneEnergyData);
  };

  const onSaveClick = () => {
    const groups = energyData.map((item) => {
      const deviceIds = item.esDevices.filter((i: any) => i.deviceId).map((i: any) => i.deviceId);
      return {
        groupId: item.isAdd ? '' : item.groupId,
        groupName: item.groupName,
        deviceIds,
      };
    });
    const params = { siteId, groups };
    run(params).then((data) => {
      if (data) {
        message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
        getUnitDeviceList(siteId);
      }
    });
  };

  const handleOk = () => {
    if (selectedRowsState.length) {
      changeTableData(currentRow as MonitorDataType, selectedRowsState, 'esDevices');
    } else {
      changeTableData(
        currentRow as MonitorDataType,
        [
          {
            deviceName: '关联数据采集点',
            sn: '--',
          },
        ],
        'esDevices',
      );
    }
    setIsModalOpen(false);
    message.success(formatMessage({ id: 'common.editSuccess', defaultMessage: '修改成功' }));
  };
  const energyColumns: TableColumnProps<MonitorDataType>[] = [
    {
      title: formatMessage({ id: 'siteManage.unitName', defaultMessage: '单元名称' }),
      dataIndex: 'groupName',
      width: 100,
      ellipsis: true,
      render: (_, record) => (
        <Input
          value={record.groupName}
          onChange={({ target: { value } }) => changeTableData(record, value, 'groupName')}
          placeholder={formatMessage({
            id: 'common.pleaseEnter',
            defaultMessage: '请输入',
          })}
        />
      ),
    },
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'esDevices',
      render: (_, record) => {
        return (
          <div className={styles.child_table}>
            <Table
              showHeader={false}
              size="small"
              pagination={false}
              columns={[
                {
                  dataIndex: 'deviceName',
                  render: (_s, esDevices) => {
                    return authorityMap.get('iot:siteConfig:deviceTree') ? (
                      <Button type="link" size="small" key="device" onClick={() => onClick(record)}>
                        {esDevices.deviceName}
                      </Button>
                    ) : (
                      esDevices.deviceName
                    );
                  },
                },
              ]}
              dataSource={record?.esDevices || []}
            />
          </div>
        );
      },
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.deviceSn', defaultMessage: '设备序列号' }),
      dataIndex: 'esDevices',
      width: 150,
      render: (_, record) => {
        return (
          <div className={styles.child_table}>
            <Table
              showHeader={false}
              size="small"
              pagination={false}
              columns={[{ dataIndex: 'sn' }]}
              dataSource={record?.esDevices || []}
            />
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'siteManage.electricityMeter', defaultMessage: '市电电表' }),
      dataIndex: 'mainsSupplyMeters',
      width: 150,
      render: (_, record) => {
        return (
          <>
            <Table
              showHeader={false}
              size="small"
              pagination={false}
              columns={[{ dataIndex: 'deviceName' }]}
              dataSource={record?.mainsSupplyMeters || []}
            />
          </>
        );
      },
      ellipsis: true,
    },
    {
      title: `${formatMessage({
        id: 'device.maximumLoadOfTransformer',
        defaultMessage: '变压器最大功率',
      })}（kW）`,
      dataIndex: 'mainsSupplyMeters',
      width: 150,
      render: (_, record) => {
        return (
          <>
            <Table
              showHeader={false}
              size="small"
              pagination={false}
              columns={[
                {
                  dataIndex: 'maximumLoadOfTransformer',
                  render: (_s, row) => row.maximumLoadOfTransformer?.value,
                },
              ]}
              dataSource={record?.mainsSupplyMeters || []}
            />
          </>
        );
      },
      ellipsis: true,
    },
    ...(authorityMap.get('iot:siteConfig:deviceTree')
      ? ([
          {
            title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
            fixed: 'right',
            width: 80,
            render: (_, record: MonitorDataType) => (
              <Button onClick={() => deleteData(record)} type="link">
                {formatMessage({ id: 'common.delete', defaultMessage: '删除' })}
              </Button>
            ),
          },
        ] as any)
      : []),
  ];

  const deviceColumns: ProColumns<MonitorDataType>[] = [
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      width: 100,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备序列号' }),
      dataIndex: 'sn',
      width: 100,
      ellipsis: true,
    },
  ];

  return (
    <div style={{ marginBottom: '20px' }}>
      <div className={styles.unit_manage}>
        <span className="ant-collapse-header-text">
          {formatMessage({ id: 'siteManage.unitManage', defaultMessage: '储能单元管理' })}
        </span>
        {authorityMap.get('iot:siteConfig:deviceTree') ? (
          <Button type="primary" icon={<PlusOutlined />} onClick={addEnergyData}>
            {formatMessage({ id: 'common.add', defaultMessage: '新增' })}
          </Button>
        ) : (
          ''
        )}
      </div>
      <Table
        columns={energyColumns}
        dataSource={energyData}
        size="small"
        bordered
        pagination={false}
        rowKey={(row) => row.groupId}
      />
      <Modal
        title={formatMessage({ id: 'device.selectDevice', defaultMessage: '选择设备' })}
        open={isModalOpen}
        onOk={handleOk}
        width={800}
        onCancel={() => setIsModalOpen(false)}
      >
        <YTProTable<MonitorDataType>
          actionRef={actionRef}
          columns={deviceColumns}
          dataSource={deviceData}
          rowKey="deviceId"
          onSubmit={(params) => getDeviceList(currentRow as MonitorDataType, params)}
          toolBarRender={false}
          resizable={true}
          pagination={false}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
              const cloneCurrentRow = cloneDeep(currentRow) || ({} as MonitorDataType);
              cloneCurrentRow.esDevices = selectedRows;
              setCurrentRow(cloneCurrentRow);
            },
            selectedRowKeys:
              currentRow?.esDevices.filter((i) => i.deviceId).map((i) => i.deviceId) || [],
          }}
        />
      </Modal>
      <div className="tx-right mt12 mb24">
        {authorityMap.get('iot:siteConfig:monitoringSave') ? (
          <Button type="primary" loading={loading} onClick={() => onSaveClick()}>
            {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default EnergyUnitManage;
