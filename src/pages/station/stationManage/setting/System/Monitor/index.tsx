import React, { useState, useEffect, useCallback } from 'react';
import { Collapse, Switch, Modal, message, Divider, Table, Button, Input } from 'antd';
import { useToggle } from 'ahooks';
import type { TableColumnProps } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { useRequest, useModel } from 'umi';
import { getConfig, editStatus, editConfig } from './service';
import styles from './index.less';
import { TableTreeModal, SelectTypeEnum } from '@/components/TableSelect';
import type { dealTreeDataType } from '@/components/TableSelect';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';
import EnergyUnitManage from './UnitManage';
import type {
  TreeDataType,
  MonitorDataType,
  TableDataType,
  AllTableDataType,
  TableTreeDataType,
} from './data.d';
import { useAuthority } from '@/hooks';
import { areaMap, defaultOpenKeys, monitorTypeMap } from './config';
import { formatMessage } from '@/utils';
import { cloneDeep } from 'lodash';
type CollectionChartType = {
  deviceTree: boolean;
};

const Monitor: React.FC<CollectionChartType> = (props) => {
  const { deviceTree } = props;
  const { authorityMap } = useAuthority([
    'iot:siteConfig:monitoringSave', //保存
    'iot:siteConfig:monitoringOnOff', //开启、关闭监测点按钮
    'iot:siteConfig:deviceTree', //关联设备/采集点
  ]);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [activeKeysSet, setActiveKeysSet] = useState<Set<string>>(new Set());
  const [allTableData, setAllTableData] = useState<AllTableDataType>({
    electric: { row1: [], row2: [], row3: [] },
    photovoltaic: { row1: [], row2: [] },
    energy: { row1: [], row2: [], row3: [], row4: [], row5: [], row6: [], row7: [] },
    charge: { row1: [], row2: [] },
    load: { row1: [], row2: [] },
  });
  const [openTableSelect, { setLeft, setRight }] = useToggle(false);
  const [selectedRow, setSelectedRow] = useState<MonitorDataType>({ area: '', type: '' });
  const [tableTreeValue, setTableTreeValue] = useState<TableTreeDataType[]>();
  const [valueMap, setValueMap] = useState({
    valueId: '',
    valueName: '',
  });
  const { loading, run } = useRequest(getConfig, {
    manual: true,
  });
  const { loading: editStatusLoading, run: runEdit } = useRequest(editStatus, {
    manual: true,
  });
  const { loading: editConfigLoading, run: runEditConfig } = useRequest(editConfig, {
    manual: true,
  });

  const bingData = (data: MonitorDataType[], type: string, index: number) => {
    if (!data.length) {
      data.push({
        id: type + 'noData' + index,
        rowId: type + 'noData' + index,
        project: monitorTypeMap.get(type)?.data[index].name,
        deviceName: deviceTree
          ? formatMessage({
              id: 'siteManage.set.associateDataCollectionPoints',
              defaultMessage: '关联数据采集点',
            })
          : '',
        area: monitorTypeMap.get(type)?.data[index].area || '',
        type: type,
        span: 1,
        maximumLoadOfTransformer: {},
        esMap: '--',
        esMapData: [],
      });
    } else {
      data[0].project = monitorTypeMap.get(type)?.data[index].name;
      data[0].span = data.length;
    }
  };

  const onEditStatus = useCallback(
    (type, flag) => {
      runEdit({ siteId, type: monitorTypeMap.get(type)?.type, flag: flag }).then((data) => {
        if (data) {
          if (!flag) {
            message.success(
              formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }),
            );
          }
          setActiveKeysSet((stateData) => {
            stateData[flag ? 'add' : 'delete'](type);
            return new Set(stateData);
          });
        }
      });
    },
    [siteId],
  );

  const onSwitchChange = useCallback((type: string, checked: boolean) => {
    if (checked) {
      onEditStatus(type, checked);
    } else {
      Modal.confirm({
        title: formatMessage({
          id: 'siteManage.set.closeMonitorSiteConfirm',
          defaultMessage: '关闭监测点确认',
        }),
        content: formatMessage({
          id: 'siteManage.set.closeMonitorSiteConfirmContent',
          defaultMessage: '是否关闭监测点，关闭后主监控页面将不在监测该回路',
        }),
        okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
        cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
        onOk: () => {
          onEditStatus(type, checked);
        },
      });
    }
  }, []);

  const onClick = useCallback(
    (record: MonitorDataType) => {
      const data: TableTreeDataType[] = [];
      const valueId = record.area == 'elec' ? 'id' : 'selectName';
      const valueName = record.area == 'elec' ? 'deviceName' : 'paramName';
      allTableData[record.type][record.area].forEach((item: MonitorDataType) => {
        if ((item.id + '').indexOf('noData') === -1) {
          data.push({
            [valueId]: item.id,
            [valueName]: item.area == 'elec' ? item.deviceName : item.collection,
            node: {
              ...(item.area !== 'elec'
                ? {
                    paramName: item.collection,
                  }
                : {}),
              deviceName: item.deviceName,
              deviceSN: item.sn,
            },
          });
        }
      });
      setValueMap({
        valueId,
        valueName,
      });
      setSelectedRow(record);
      setTableTreeValue(data);
      setRight();
    },
    [allTableData],
  );

  const dealTreeData = useCallback<dealTreeDataType<TreeDataType>>(
    (item) => {
      if (selectedRow.area === 'elec') {
        if (item.productId) {
          item.selectable = true;
        }
      }
      item.checkable = item.productTypeId == 539;
    },
    [selectedRow.area],
  );

  const requestTree = useCallback(() => {
    if (siteId) {
      return getDeviceTree({ siteId });
    }
  }, [siteId]);

  const onChange = useCallback(
    (selectedData) => {
      const rowData: MonitorDataType[] = selectedData.map((item: any, t: number) => {
        return {
          id: item[valueMap.valueId],
          rowId: selectedRow.type + item[valueMap.valueId],
          collection:
            selectedRow.area === 'elec'
              ? formatMessage({
                  id: 'siteManage.set.allDataCollectionPoints',
                  defaultMessage: '全部数据采集点',
                })
              : item?.node?.paramName,
          deviceName: item?.node?.deviceName,
          sn: item?.node?.deviceSN,
          area: selectedRow.area,
          type: selectedRow.type,
          esMap: selectedRow.esMapData?.[t] || '--',
        };
      });
      bingData(rowData, selectedRow.type, areaMap.get(selectedRow.area) || 0);
      setAllTableData((prevData) => {
        const newData = {
          ...prevData,
          [selectedRow.type]: {
            ...prevData[selectedRow.type],
            [selectedRow.area]: rowData,
          },
        };
        return newData;
      });
    },
    [selectedRow, valueMap],
  );

  const onSaveClick = (type: string) => {
    const data: any = [];
    const tableData: TableDataType = allTableData[type];
    if (tableData.elec && tableData.elec.length) {
      [...(tableData.elec || [])].forEach((item) => {
        data.push({
          siteId: siteId,
          selectName: (item.id + '').indexOf('noData') === -1 ? item.id : '',
          type: monitorTypeMap.get(item.type)?.type,
          subType: monitorTypeMap.get(item.type)?.data[areaMap.get(item.area) || 0].subType,
        });
      });
    }
    [
      ...(tableData.row1 || []),
      ...(tableData.row2 || []),
      ...(tableData.row3 || []),
      ...(tableData.row4 || []),
      ...(tableData.row5 || []),
      ...(tableData.row6 || []),
      ...(tableData.row7 || []),
    ].forEach((item) => {
      data.push({
        siteId: siteId,
        selectName: (item.id + '').indexOf('noData') === -1 ? item.id : '',
        type: monitorTypeMap.get(item.type)?.type,
        subType: monitorTypeMap.get(item.type)?.data[areaMap.get(item.area) || 0].subType,
        maximumLoadOfTransformer: item.maximumLoadOfTransformer,
      });
    });
    runEditConfig(data).then((result) => {
      if (result) {
        message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
      }
    });
  };

  const requestDeviceCollection = useCallback(
    (params) => {
      let paramName = '';
      if (selectedRow?.area?.startsWith?.('row')) {
        switch (selectedRow?.area) {
          case 'row1':
            paramName = '电量';
            break;
          case 'row2':
            if (selectedRow?.type == 'photovoltaic' || selectedRow?.type == 'energy') {
              paramName = '电量';
            } else {
              paramName = '功率';
            }
            break;
          case 'row3':
            if (['electric'].includes(selectedRow?.type)) {
              paramName = '电量';
            } else {
              paramName = '功率';
            }
            break;
          case 'row4':
          case 'row5':
          case 'row6':
            if (['energy'].includes(selectedRow?.type)) {
              paramName = '电量';
            } else {
              paramName = '功率';
            }
            break;
          default:
            paramName = '功率';
        }
      }
      return getDeviceCollection({ ...params, paramName });
    },
    [selectedRow],
  );

  useEffect(() => {
    if (siteId) {
      run({ siteId }).then((data) => {
        const keys = new Set<string>([...defaultOpenKeys]);
        const datas: AllTableDataType = {
          electric: { row1: [], row2: [], row3: [] },
          photovoltaic: { row1: [], row2: [] },
          energy: { row1: [], row2: [], row3: [], row4: [], row5: [], row6: [], row7: [] },
          charge: { row1: [], row2: [] },
          load: { row1: [], row2: [] },
        };
        monitorTypeMap.forEach((item, type) => {
          if (data?.[item.type]?.flag) {
            // 绑定开关
            keys.add(type);
          }
          item.data.forEach((row, index) => {
            const rowData =
              data?.[item.type]?.valueMap?.[row.subType]?.map?.((record: any, t: number) => {
                return {
                  id: row.area == 'elec' ? record.deviceId : record?.selectName,
                  rowId: row.area == 'elec' ? record.deviceId : record?.selectName,
                  collection:
                    row.area == 'elec'
                      ? formatMessage({
                          id: 'siteManage.set.allDataCollectionPoints',
                          defaultMessage: '全部数据采集点',
                        })
                      : record?.paramName,
                  deviceName: record?.deviceName,
                  sn: record?.deviceSN,
                  area: row.area,
                  type: type,
                  maximumLoadOfTransformer: record?.maximumLoadOfTransformer || {},
                  esMap: data?.[item.type]?.esMap?.[row.subType]?.[t]?.groupName || '--',
                  esMapData: data?.[item.type]?.esMap?.[row.subType]?.map(
                    (es: any) => es.groupName,
                  ),
                };
              }) || [];
            bingData(rowData, type, index);
            datas[type][row.area] = rowData;
          });
        });
        setActiveKeysSet(keys);
        setAllTableData({ ...datas });
      });
    }
  }, [siteId]);

  const setMaximumLoadOfTransformer = (
    record: MonitorDataType,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const cloneAllData = cloneDeep(allTableData);
    const index = cloneAllData[record.type][record.area].findIndex(
      (i: any) => i.rowId == record.id,
    );
    cloneAllData[record.type][record.area][index].maximumLoadOfTransformer.value = e.target.value;
    setAllTableData(cloneAllData);
  };

  const columns = (key: string): TableColumnProps<MonitorDataType>[] => [
    {
      title: formatMessage({ id: 'siteManage.set.monitorItem', defaultMessage: '监测项目' }),
      dataIndex: 'project',
      onCell: (record) => {
        return {
          rowSpan: record.span || 0,
        };
      },
      width: 100,
      ellipsis: true,
    },
    //储能监测加储能单元
    ...(key == 'energy'
      ? [
          {
            title: formatMessage({
              id: 'siteMonitor.energyStorageUnit',
              defaultMessage: '储能单元',
            }),
            dataIndex: 'esMap',
            width: 150,
            ellipsis: true,
          },
        ]
      : []),
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      render: (_, record) => {
        return authorityMap.get('iot:siteConfig:deviceTree') ? (
          <Button type="link" size="small" key="device" onClick={() => onClick(record)}>
            {record.deviceName}
          </Button>
        ) : (
          record.deviceName
        );
      },
      width: 120,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.deviceSn', defaultMessage: '设备序列号' }),
      dataIndex: 'sn',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPoints',
        defaultMessage: '数据采集点',
      }),
      dataIndex: 'collection',
      width: 150,
      ellipsis: true,
    },
    ...(key == 'electric'
      ? [
          {
            title: `${formatMessage({
              id: 'device.maximumLoadOfTransformer',
              defaultMessage: '变压器最大功率',
            })}（kW）`,
            dataIndex: 'maximumLoadOfTransformer',
            width: 150,
            render: (_, record: MonitorDataType) => {
              const value = record.maximumLoadOfTransformer?.value || '';
              return authorityMap.get('iot:siteConfig:deviceTree') &&
                record.maximumLoadOfTransformer?.editable ? (
                <Input
                  value={value}
                  onChange={(e) => setMaximumLoadOfTransformer(record, e)}
                  placeholder={formatMessage({
                    id: 'common.pleaseEnter',
                    defaultMessage: '请输入',
                  })}
                />
              ) : (
                value
              );
            },
            ellipsis: true,
          },
        ]
      : []),
  ];

  const panelData = [
    {
      key: 'electric',
      title: formatMessage({ id: 'siteManage.set.mainsMonitor', defaultMessage: '市电监测' }),
    },

    {
      key: 'photovoltaic',
      title: formatMessage({ id: 'siteManage.set.pvMonitor', defaultMessage: '光伏监测' }),
    },
    {
      key: 'energy',
      title: formatMessage({
        id: 'siteManage.set.energyStorageMonitor',
        defaultMessage: '储能监测',
      }),
    },
    {
      key: 'charge',
      title: formatMessage({
        id: 'siteManage.set.chargePileMonitor',
        defaultMessage: '充电桩监测',
      }),
    },
    {
      key: 'load',
      title: formatMessage({ id: 'siteManage.set.otherLoad', defaultMessage: '其他负载' }),
    },
  ];

  const tableSelectColumns: ProColumns[] = [
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPoints',
        defaultMessage: '数据采集点',
      }),
      dataIndex: 'paramName',
      width: 200,
      ellipsis: true,
    },
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPointIdIdentify',
        defaultMessage: '数据采集点标识',
      }),
      dataIndex: 'paramCode',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  const panels = panelData.map((item, index) => {
    return (
      <>
        {index && <Divider className="mx16" key={'divider' + item.key} />}
        <Collapse.Panel
          header={item.title}
          key={item.key}
          extra={
            defaultOpenKeys.includes(item.key) ? (
              <></>
            ) : (
              <Switch
                checked={activeKeysSet.has(item.key)}
                loading={loading || editStatusLoading || editConfigLoading}
                onChange={(checked) => onSwitchChange(item.key, checked)}
                disabled={!authorityMap.get('iot:siteConfig:monitoringOnOff')}
              />
            )
          }
        >
          <Divider className="mt0" />
          {item.key == 'energy' ? <EnergyUnitManage /> : ''}
          <Table
            columns={columns(item.key)}
            dataSource={[
              ...allTableData[item.key].row1,
              ...allTableData[item.key].row2,
              ...(allTableData[item.key].row3 || []),
              ...(allTableData[item.key].row4 || []),
              ...(allTableData[item.key].row5 || []),
              ...(allTableData[item.key].row6 || []),
              ...(allTableData[item.key].row7 || []),
            ]}
            size="small"
            bordered
            pagination={false}
            rowKey={(row) => `${row.rowId}-${row.id}`}
          />
          <div className="tx-right mt12 mb24">
            {authorityMap.get('iot:siteConfig:monitoringSave') ? (
              <Button
                type="primary"
                loading={loading || editStatusLoading || editConfigLoading}
                onClick={() => onSaveClick(item.key)}
              >
                {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
              </Button>
            ) : (
              <></>
            )}
          </div>
        </Collapse.Panel>
      </>
    );
  });

  return (
    <>
      <Collapse
        className={`mt16 bg-white px8 ${styles.collapse}`}
        activeKey={[...activeKeysSet]}
        expandIcon={() => <></>}
        ghost
      >
        {panels}
      </Collapse>
      <TableTreeModal
        selectType={selectedRow.area === 'elec' ? SelectTypeEnum.Device : SelectTypeEnum.Collect}
        title={
          selectedRow.area === 'elec'
            ? formatMessage({ id: 'common.selectDevice', defaultMessage: '选择设备' })
            : formatMessage({
                id: 'common.selectDataCollectionPoints',
                defaultMessage: '选择数据采集点',
              })
        }
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
          request: requestDeviceCollection,
          pagination: false,
        }}
        valueId={valueMap.valueId}
        valueName={valueMap.valueName}
        dealTreeData={dealTreeData}
        value={tableTreeValue}
        onChange={onChange}
      />
    </>
  );
};

export default Monitor;
