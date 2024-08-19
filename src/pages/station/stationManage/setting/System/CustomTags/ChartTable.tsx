import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Table, Button, Input, Select, message, Collapse, Space, Empty } from 'antd';
import { formatMessage } from '@/utils';
import type { DataType, TableDataType, CollectionDataType, DeviceDataType } from './helper';
import {
  getCycleOptions,
  wayOptions,
  defaultCurveData,
  defaultData,
  tableSelectColumns,
  defaultCollectionData,
  defaultDeviceData,
} from './helper';
import styles from './index.less';
import { cloneDeep } from 'lodash';
import type { TableProps } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Panel } = Collapse;
import { useToggle } from 'ahooks';
import { TableTreeModal } from '@/components/TableSelect';
import { useModel } from 'umi';
import type { DatePickerProps } from 'antd';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';

type ChartTableProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: DataType[];
  onChange?: (value: DataType[]) => void;
};
const ChartTable: React.FC<ChartTableProps> = (props) => {
  const { value, onChange } = props;
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [openTableSelect, { setLeft, setRight }] = useToggle(false);
  const [selectedRow, setSelectedRow] = useState<TableDataType>({} as TableDataType);
  const [tableTreeValue, setTableTreeValue] = useState<any[]>();
  const [dataId, setDataId] = useState<string | number>('0');

  useEffect(() => {
    if (value?.length) {
      setDataSource(value);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(dataSource);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);

  const requestTree = useCallback(() => {
    if (siteId) {
      return getDeviceTree({ siteId });
    } else {
      return Promise.resolve();
    }
  }, [siteId]);

  const addData = () => {
    const cloneData = cloneDeep(dataSource);
    const dataLength = cloneData.length;
    if (dataLength > 10) {
      message.info(
        formatMessage({ id: 'siteManage.1059', defaultMessage: '最多只能添加10个图表' }),
      );
      return;
    }
    cloneData.push(defaultData(dataLength));
    setDataSource(cloneData);
  };

  const deleteData = useCallback(
    (uuid: string | number) => {
      const cloneData = cloneDeep(dataSource);
      cloneData.splice(
        cloneData.findIndex((i) => i.uuid == uuid),
        1,
      );
      setDataSource(cloneData);
    },
    [dataSource],
  );

  const changeData = useCallback(
    (uuid: number | string, curValue: any, key: keyof DataType) => {
      const cloneData = cloneDeep(dataSource);
      const index = cloneData.findIndex((i) => i.uuid == uuid);
      cloneData[index][key] = curValue;
      setDataSource(cloneData);
    },
    [dataSource],
  );

  const changeTableData = useCallback(
    (panelId: number | string, rowId: number | string, changeObj: any) => {
      const cloneData = cloneDeep(dataSource);
      const panelIndex = cloneData.findIndex((i) => i.uuid == panelId);
      const rowIndex = cloneData[panelIndex].curves.findIndex((i) => i.uuid == rowId);
      Object.keys(changeObj).forEach((key) => {
        cloneData[panelIndex].curves[rowIndex][key] = changeObj[key];
      });
      setDataSource(cloneData);
    },
    [dataSource],
  );

  const onSelectRow = useCallback(
    (panelId: string | number, record: TableDataType) => {
      setRight();
      setDataId(panelId);
      setSelectedRow(record);
      if (record?.device?.length) {
        let treeValue: any = [];
        const isDefaultData = record.device.some((i) => i.deviceId == 'noData');
        if (!isDefaultData) {
          treeValue = record?.collection?.map((i, index) => {
            const curDevice = record?.device?.[index];
            return {
              selectName: `${curDevice?.deviceId}_${i.key}`,
              paramName: i.keyName,
              node: {
                deviceId: curDevice?.deviceId,
                deviceName: curDevice?.deviceName,
                selectName: i.key,
                paramName: i.keyName,
              },
            };
          });
        }
        setTableTreeValue(treeValue);
      }
    },
    [setRight],
  );

  const changeUnitDisable = (units: string[]) => {
    let disable = false;
    const changeObj: any = {};
    if (units.length) {
      const firstItem = units[0];
      //所有项单位一样且不为空
      disable = units.every((item) => item === firstItem) && Boolean(firstItem);
      if (disable) {
        changeObj.unit = firstItem;
      }
    } else {
      disable = false;
    }
    changeObj.unitDisable = disable;
    return changeObj;
  };

  const getSelectRow = useCallback(
    (selectedData) => {
      let deviceData: DeviceDataType[] = [];
      let collectionData: CollectionDataType[] = [];
      const units: string[] = [];
      if (selectedData.length) {
        if (selectedData.length > 15) {
          message.info(
            formatMessage({
              id: 'siteManage.1068',
              defaultMessage: '最多只能添加15个采集点',
            }),
          );
          return;
        }
        selectedData.forEach((i: any) => {
          let dataType: any = {};
          try {
            dataType = JSON.parse(i?.node?.dataType || '{}');
          } catch (err: any) {
            throw Error(err);
          }
          units.push(dataType?.specs?.unit || '');
          deviceData.push({ deviceId: i.node.deviceId, deviceName: i.node.deviceName });
          collectionData.push({ key: i.selectName.split('_')[1] || '', keyName: i.paramName });
        });
      } else {
        deviceData = defaultDeviceData();
        collectionData = defaultCollectionData();
      }
      changeTableData(dataId, selectedRow.uuid, {
        device: deviceData,
        collection: collectionData,
        ...changeUnitDisable(units),
      });
    },
    [changeTableData, dataId, selectedRow.uuid],
  );

  const tableColumns = useCallback(
    (panelId: number | string): TableProps<TableDataType>['columns'] => [
      {
        title: formatMessage({ id: 'siteManage.1052', defaultMessage: '曲线名称' }),
        dataIndex: 'name',
        width: 250,
        ellipsis: true,
        render: (_, record) => (
          <Space>
            <Input
              value={record.name}
              key="name"
              width={100}
              maxLength={6}
              onChange={({ target }) => {
                changeTableData(panelId, record.uuid, { name: target.value });
              }}
              placeholder={formatMessage({
                id: 'common.pleaseEnter',
                defaultMessage: '请输入',
              })}
            />
            <Button
              type="link"
              size="small"
              key="delete"
              icon={<DeleteOutlined />}
              onClick={() => {
                const panelIndex = dataSource.findIndex((i) => i.uuid == panelId);
                const curves = cloneDeep(dataSource[panelIndex].curves);
                const length = curves.length;
                if (length <= 1) {
                  message.info(
                    formatMessage({
                      id: 'siteManage.1062',
                      defaultMessage: '至少1条曲线',
                    }),
                  );
                  return;
                }
                const deleteIndex = curves.findIndex((i) => (i.uuid = record.uuid));
                curves.splice(deleteIndex, 1);
                changeData(panelId, curves, 'curves');
              }}
            />
            <Button
              type="link"
              size="small"
              key="add"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                const panelIndex = dataSource.findIndex((i) => i.uuid == panelId);
                const curves = cloneDeep(dataSource[panelIndex].curves);
                const length = curves.length;
                if (length > 10) {
                  message.info(
                    formatMessage({
                      id: 'siteManage.1061',
                      defaultMessage: '最多只能添加10个曲线',
                    }),
                  );
                  return;
                }
                curves.push(defaultCurveData(length));
                changeData(panelId, curves, 'curves');
              }}
            />
          </Space>
        ),
      },
      {
        title: formatMessage({ id: 'siteManage.1053', defaultMessage: '聚合方式' }),
        dataIndex: 'aggregationMethod',
        width: 150,
        ellipsis: true,
        render: (_, record) => (
          <Select
            value={record.aggregationMethod}
            options={wayOptions}
            onChange={(data) => changeTableData(panelId, record.uuid, { aggregationMethod: data })}
            placeholder={formatMessage({
              id: 'common.pleaseSelect',
              defaultMessage: '请选择',
            })}
          />
        ),
      },
      {
        title: formatMessage({ id: 'siteManage.1054', defaultMessage: '曲线颜色' }),
        dataIndex: 'color',
        width: 150,
        ellipsis: true,
        render: (_, record) => (
          <Input
            value={record.color}
            onChange={({ target }) =>
              changeTableData(panelId, record.uuid, { color: target.value })
            }
            type="color"
          />
        ),
      },
      {
        title: formatMessage({ id: 'siteManage.1055', defaultMessage: '单位' }),
        dataIndex: 'unit',
        width: 150,
        ellipsis: true,
        render: (_, record) => (
          <Input
            value={record.unit}
            disabled={record.unitDisable}
            onChange={({ target }) => changeTableData(panelId, record.uuid, { unit: target.value })}
            placeholder={formatMessage({
              id: 'common.pleaseEnter',
              defaultMessage: '请输入',
            })}
          />
        ),
      },
      {
        title: formatMessage({ id: 'siteManage.1056', defaultMessage: '设备名称' }),
        dataIndex: 'device',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          return (
            <div className={styles.child_table}>
              <Table
                showHeader={false}
                size="small"
                bordered={false}
                pagination={false}
                columns={[
                  {
                    dataIndex: 'deviceName',
                    render: (__, deviceRecord) => (
                      <Button
                        type="link"
                        size="small"
                        key="device"
                        onClick={() => onSelectRow(panelId, record)}
                      >
                        {deviceRecord.deviceName}
                      </Button>
                    ),
                  },
                ]}
                dataSource={record?.device || []}
              />
            </div>
          );
        },
      },
      {
        title: formatMessage({ id: 'siteManage.1057', defaultMessage: '数据采集点' }),
        dataIndex: 'collection',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          return (
            <div className={styles.child_table}>
              <Table
                showHeader={false}
                size="small"
                bordered={false}
                pagination={false}
                columns={[
                  {
                    dataIndex: 'keyName',
                  },
                ]}
                dataSource={record?.collection || []}
              />
            </div>
          );
        },
      },
    ],
    [changeData, changeTableData, dataSource, onSelectRow],
  );

  const collapse = useMemo(() => {
    return dataSource.length ? (
      <Collapse>
        {dataSource.map((item) => (
          <Panel
            header={
              <Input
                value={item.name}
                maxLength={6}
                key={item.uuid}
                onClick={(e) => e.stopPropagation()}
                style={{ width: '150px' }}
                onChange={({ target }) => changeData(item.uuid, target.value, 'name')}
                placeholder={formatMessage({
                  id: 'common.pleaseEnter',
                  defaultMessage: '请输入',
                })}
              />
            }
            key={item.uuid}
            extra={
              <Space>
                <span>{formatMessage({ id: 'siteManage.1051', defaultMessage: '聚合周期' })}</span>
                <Select
                  style={{ width: '150px' }}
                  onClick={(e) => e.stopPropagation()}
                  value={item.aggregationPeriod}
                  key={item.uuid}
                  options={getCycleOptions()}
                  onChange={(data) => changeData(item.uuid, data, 'aggregationPeriod')}
                  placeholder={formatMessage({
                    id: 'common.pleaseSelect',
                    defaultMessage: '请选择',
                  })}
                />
                <Button onClick={() => deleteData(item.uuid)} type="link" key={item.uuid}>
                  {formatMessage({ id: 'common.delete', defaultMessage: '删除' })}
                </Button>
              </Space>
            }
          >
            <Table
              key={item.uuid}
              bordered
              columns={tableColumns(item.uuid)}
              dataSource={item.curves}
            />
          </Panel>
        ))}
      </Collapse>
    ) : (
      <Empty />
    );
  }, [changeData, dataSource, deleteData, tableColumns]);

  return (
    <>
      <div className={styles.add_btn}>
        <Button onClick={addData} type="primary">
          {formatMessage({ id: 'common.add', defaultMessage: '新增' })}
        </Button>
      </div>
      {collapse}
      <TableTreeModal
        title={formatMessage({ id: 'common.selectDevice', defaultMessage: '选择设备' })}
        open={openTableSelect}
        onCancel={setLeft}
        treeProps={{
          fieldNames: {
            title: 'deviceName',
            key: 'id',
            children: 'children',
          },
          request: requestTree,
        }}
        proTableProps={{
          columns: tableSelectColumns,
          request: getDeviceCollection,
          pagination: false,
        }}
        valueId="selectName"
        valueName="paramName"
        value={tableTreeValue}
        onChange={getSelectRow}
      />
    </>
  );
};

export default ChartTable;
