import React, { useState, useEffect, useCallback } from 'react';
import { Collapse, Switch, Modal, message, Divider, Table, Button } from 'antd';
import { useToggle } from 'ahooks';
import type { TableColumnProps } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { useRequest, useModel } from 'umi';
import { getConfig, editStatus, editConfig } from './service';
import styles from './index.less';
import { TableTreeModal, SelectTypeEnum } from '@/components/TableSelect';
import type { dealTreeDataType } from '@/components/TableSelect';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';
import type {
  TreeDataType,
  MonitorDataType,
  TableDataType,
  AllTableDataType,
  TableTreeDataType,
} from './data.d';
import { areaMap, monitorTypeMap } from './config';

const bingData = (data: MonitorDataType[], type: string, index: number) => {
  if (!data.length) {
    data.push({
      id: type + 'noData' + index,
      rowId: type + 'noData' + index,
      project: monitorTypeMap.get(type)?.data[index].name,
      deviceName: index ? '关联采集点' : '关联设备',
      area: monitorTypeMap.get(type)?.data[index].area || '',
      type: type,
      span: 1,
    });
  } else {
    data[0].project = monitorTypeMap.get(type)?.data[index].name;
    data[0].span = data.length;
  }
};

const Monitor: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [activeKeysSet, setActiveKeysSet] = useState<Set<string>>(new Set());
  const [allTableData, setAllTableData] = useState<AllTableDataType>({
    electric: { elec: [], row1: [], row2: [] },
    photovoltaic: { elec: [], row1: [], row2: [] },
    energy: { elec: [], row1: [], row2: [] },
    charge: { elec: [], row1: [], row2: [] },
    load: { elec: [], row1: [], row2: [] },
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

  const onEditStatus = useCallback(
    (type, flag) => {
      runEdit({ siteId, type: monitorTypeMap.get(type)?.type, flag: flag }).then((data) => {
        if (data) {
          message.success('保存成功');
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
        title: '关闭监测点确认',
        content: '是否关闭监测点，关闭后主监控页面将不在监测该回路',
        okText: '确认',
        cancelText: '取消',
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
      item.checkable = item.productId == 516;
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
      const rowData: MonitorDataType[] = selectedData.map((item: any) => {
        return {
          id: item[valueMap.valueId],
          rowId: selectedRow.type + item[valueMap.valueId],
          collection: selectedRow.area === 'elec' ? '全部采集点' : item?.node?.paramName,
          deviceName: item?.node?.deviceName,
          sn: item?.node?.deviceSN,
          area: selectedRow.area,
          type: selectedRow.type,
        };
      });
      bingData(rowData, selectedRow.type, areaMap.get(selectedRow.area) || 0);
      setAllTableData((prevData) => {
        return {
          ...prevData,
          [selectedRow.type]: {
            ...prevData[selectedRow.type],
            [selectedRow.area]: rowData,
          },
        };
      });
    },
    [selectedRow],
  );

  const onSaveClick = (type: string) => {
    const data: any = [];
    const tableData: TableDataType = allTableData[type];
    if (tableData.elec && tableData.elec.length) {
      [...(tableData.elec || [])].forEach((item) => {
        if ((item.id + '').indexOf('noData') === -1) {
          data.push({
            siteId: siteId,
            selectName: item.id,
            type: monitorTypeMap.get(item.type)?.type,
            subType: monitorTypeMap.get(item.type)?.data[areaMap.get(item.area) || 0].subType,
          });
        }
      });
    }
    [...(tableData.row1 || []), ...(tableData.row2 || []), ...(tableData.row3 || [])].forEach(
      (item) => {
        if ((item.id + '').indexOf('noData') === -1) {
          data.push({
            siteId: siteId,
            selectName: item.id,
            type: monitorTypeMap.get(item.type)?.type,
            subType: monitorTypeMap.get(item.type)?.data[areaMap.get(item.area) || 0].subType,
          });
        }
      },
    );
    runEditConfig(data).then((result) => {
      if (result) {
        message.success('保存成功');
      }
    });
  };

  useEffect(() => {
    if (siteId) {
      run({ siteId }).then((data) => {
        const keys = new Set<string>();
        const datas: AllTableDataType = {
          electric: { elec: [], row1: [], row2: [] },
          photovoltaic: { elec: [], row1: [], row2: [] },
          energy: { elec: [], row1: [], row2: [] },
          charge: { elec: [], row1: [], row2: [] },
          load: { elec: [], row1: [], row2: [] },
        };
        monitorTypeMap.forEach((item, type) => {
          if (data?.[item.type]?.flag) {
            // 绑定开关
            keys.add(type);
          }
          item.data.forEach((row, index) => {
            const rowData =
              data?.[item.type]?.valueMap?.[row.subType]?.map?.((record: any) => {
                return {
                  id: row.area == 'elec' ? record.deviceId : record?.selectName,
                  rowId: row.area == 'elec' ? record.deviceId : record?.selectName,
                  collection: row.area == 'elec' ? '全部采集点' : record?.paramName,
                  deviceName: record?.deviceName,
                  sn: record?.deviceSN,
                  area: row.area,
                  type: type,
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

  const columns: TableColumnProps<MonitorDataType>[] = [
    {
      title: '监测项目',
      dataIndex: 'project',
      onCell: (record) => {
        return {
          rowSpan: record.span || 0,
        };
      },
      width: 100,
      ellipsis: true,
    },
    {
      title: '设备名称',
      dataIndex: 'deviceName',
      render: (_, record) => {
        return (
          <Button type="link" size="small" key="device" onClick={() => onClick(record)}>
            {record.deviceName}
          </Button>
        );
      },
      width: 120,
      ellipsis: true,
    },
    {
      title: '设备sn',
      dataIndex: 'sn',
      width: 150,
      ellipsis: true,
    },
    {
      title: '采集点',
      dataIndex: 'collection',
      width: 150,
      ellipsis: true,
    },
  ];

  const panelData = [
    { key: 'electric', title: '市电监测' },
    { key: 'photovoltaic', title: '光伏监测' },
    { key: 'energy', title: '储能监测' },
    { key: 'charge', title: '充电桩监测' },
    { key: 'load', title: '其他负载' },
  ];

  const tableSelectColumns: ProColumns[] = [
    {
      title: '采集点ID',
      dataIndex: 'paramCode',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '采集点',
      dataIndex: 'paramName',
      width: 200,
      ellipsis: true,
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
            <Switch
              checked={activeKeysSet.has(item.key)}
              loading={loading || editStatusLoading || editConfigLoading}
              onChange={(checked) => onSwitchChange(item.key, checked)}
            />
          }
        >
          <Divider className="mt0" />
          <Table
            columns={columns}
            dataSource={[
              ...allTableData[item.key].elec,
              ...allTableData[item.key].row1,
              ...allTableData[item.key].row2,
              ...(allTableData[item.key].row3 || []),
            ]}
            size="small"
            bordered
            pagination={false}
            rowKey="rowId"
          />
          <div className="tx-right mt12 mb24">
            <Button
              type="primary"
              loading={loading || editStatusLoading || editConfigLoading}
              onClick={() => onSaveClick(item.key)}
            >
              保存
            </Button>
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
        title={selectedRow.area === 'elec' ? '选择设备' : '选择采集点'}
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
