import React, { useState, useEffect, useCallback } from 'react';
import { Collapse, Switch, Modal, message, Divider, Table, Button } from 'antd';
import { useToggle } from 'ahooks';
import type { TableColumnProps } from 'antd';
import { useRequest, useModel } from 'umi';
import { getConfig, editStatus } from './service';
import styles from './index.less';
import TableTreeModal from '@/components/TableSelect/TableTreeModal';
import { getDeviceTree } from '@/services/equipment';

const monitorType = new Map([
  [
    'electric',
    {
      type: 5,
      data: [
        { name: '电气监测', area: 'elec' },
        { name: '市电用电量', area: 'row1' },
        { name: '市电馈电量', area: 'row2' },
      ],
    },
  ],
  [
    'photovoltaic',
    {
      type: 1,
      data: [
        { name: '电气监测', area: 'elec' },
        { name: '光伏发电量', area: 'row1' },
      ],
    },
  ],
  [
    'energy',
    {
      type: 2,
      data: [
        { name: '电气监测', area: 'elec' },
        { name: '储能充电量', area: 'row1' },
        { name: '储能放电量', area: 'row2' },
      ],
    },
  ],
  [
    'charge',
    {
      type: 3,
      data: [
        { name: '电气监测', area: 'elec' },
        { name: '充电桩充电量', area: 'row1' },
      ],
    },
  ],
  [
    'load',
    {
      type: 4,
      data: [
        { name: '电气监测', area: 'elec' },
        { name: '负载用电量', area: 'row1' },
      ],
    },
  ],
]);

type MonitorDataType = {
  span?: number;
  project?: string;
  deviceName?: string;
  sn?: string;
  collection?: string;
  id?: string;
  area?: string;
  type?: string;
};

type TableDataType = {
  elec: MonitorDataType[];
  row1: MonitorDataType[];
  row2?: MonitorDataType[];
};

const bingData = (data: MonitorDataType[], type: string, index: number) => {
  if (!data.length) {
    data.push({
      id: '0' + index,
      project: monitorType.get(type)?.data[index].name,
      deviceName: index ? '关联采集点' : '关联设备',
      area: monitorType.get(type)?.data[index].area,
      type: type,
    });
  } else {
    data[0].project = monitorType.get(type)?.data[index].name;
    data[0].span = data.length;
  }
};

const Monitor: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [electricData, setElectricData] = useState<TableDataType>({ elec: [], row1: [], row2: [] });
  const [photovoltaicData, setPhotovoltaicData] = useState<TableDataType>({
    elec: [],
    row1: [],
    row2: [],
  });
  const [energyData, setEnergyData] = useState<TableDataType>({ elec: [], row1: [], row2: [] });
  const [chargeData, setChargeData] = useState<TableDataType>({ elec: [], row1: [], row2: [] });
  const [loadData, setLoadData] = useState<TableDataType>({ elec: [], row1: [], row2: [] });
  const [openTableSelect, { setLeft, setRight }] = useToggle(false);
  const {
    data: monitorData,
    loading,
    run,
  } = useRequest(getConfig, {
    manual: true,
  });

  const onEditStatus = useCallback(
    (type, flag) => {
      editStatus({ siteId, type: monitorType.get(type)?.type, flag: flag }).then(() => {
        message.success('保存成功');
        setActiveKeys((stateData) => {
          stateData[flag ? 'add' : 'delete'](type);
          return new Set(stateData);
        });
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

  const onClick = useCallback((record: MonitorDataType) => {
    setRight();
  }, []);

  const requestTree = useCallback(() => {
    if (siteId) {
      return getDeviceTree({ siteId });
    }
  }, [siteId]);

  useEffect(() => {
    run({ siteId }).then((data) => {
      const electric0: MonitorDataType[] = [];
      bingData(electric0, 'electric', 0);
      const electric1: MonitorDataType[] = [];
      bingData(electric1, 'electric', 1);
      const electric2: MonitorDataType[] = [];
      bingData(electric2, 'electric', 2);
      setElectricData({ elec: electric0, row1: electric1, row2: electric2 });
      const photovoltaic0: MonitorDataType[] = [];
      bingData(photovoltaic0, 'photovoltaic', 0);
      const photovoltaic1: MonitorDataType[] = [];
      bingData(photovoltaic1, 'photovoltaic', 1);
      setPhotovoltaicData({ elec: photovoltaic0, row1: photovoltaic1 });
      const energy0: MonitorDataType[] = [];
      bingData(energy0, 'energy', 0);
      const energy1: MonitorDataType[] = [];
      bingData(energy1, 'energy', 1);
      const energy2: MonitorDataType[] = [];
      bingData(energy2, 'energy', 2);
      setEnergyData({ elec: energy0, row1: energy1, row2: energy2 });
      const charge0: MonitorDataType[] = [];
      bingData(charge0, 'charge', 0);
      const charge1: MonitorDataType[] = [];
      bingData(charge1, 'charge', 1);
      setChargeData({ elec: charge0, row1: charge1 });
      const load0: MonitorDataType[] = [];
      bingData(load0, 'load', 0);
      const load1: MonitorDataType[] = [];
      bingData(load1, 'load', 1);
      setLoadData({ elec: load0, row1: load1 });
    });
  }, [siteId]);

  const columns: TableColumnProps<MonitorDataType>[] = [
    {
      title: '监测项目',
      dataIndex: 'project',
      onCell: (record) => {
        return {
          colSpan: record.span,
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
    { key: 'electric', title: '市电监测', open: false, data: electricData },
    { key: 'photovoltaic', title: '光伏监测', open: false, data: photovoltaicData },
    { key: 'energy', title: '储能监测', open: false, data: energyData },
    { key: 'charge', title: '充电桩监测', open: false, data: chargeData },
    { key: 'load', title: '负载监测', open: false, data: loadData },
  ];

  const panels = panelData.map((item, index) => {
    return (
      <>
        {index && <Divider className="mx16" />}
        <Collapse.Panel
          header={item.title}
          key={item.key}
          extra={
            <Switch
              checked={activeKeys.has(item.key)}
              loading={loading}
              onChange={(checked) => onSwitchChange(item.key, checked)}
            />
          }
        >
          <Divider className="mt0" />
          <Table
            columns={columns}
            dataSource={[...item.data.elec, ...item.data.row1, ...(item.data?.row2 || [])]}
            size="small"
            bordered
            pagination={false}
            rowKey="id"
          />
          <div className="tx-right mt24">
            <Button type="primary">保存</Button>
          </div>
        </Collapse.Panel>
      </>
    );
  });

  return (
    <>
      <Collapse
        className={`mt16 bg-white ${styles.collapse}`}
        activeKey={[...activeKeys]}
        expandIcon={() => <></>}
        ghost
      >
        {panels}
      </Collapse>
      <TableTreeModal open={openTableSelect} onCancel={setLeft} request={requestTree} />
    </>
  );
};

export default Monitor;
