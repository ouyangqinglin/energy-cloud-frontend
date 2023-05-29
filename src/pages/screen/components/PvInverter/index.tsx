/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 18:59:32
 * @LastEditTime: 2023-05-26 15:14:36
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\PvInverter\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Tabs, Table, Row, Col, Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import { PvInverterType } from './data.d';
import Label from '@/components/Detail/label';
import Detail from '@/components/Detail';
import PvInverterImg from '@/assets/image/product/pvInverter.png';
import PvInverterIntroImg from '@/assets/image/product/pv-inverter-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import Empty from '@/components/Empty';
import {
  voltageFormat,
  currentFormat,
  powerFormat,
  noPowerFormat,
  powerHourFormat,
  frequencyFormat,
  tempFormat,
  mohmFormat,
  timeFormat,
} from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import { isEmpty } from '@/utils';

export type PvInverterProps = BusinessDialogProps & {
  loopNum: number;
};

const PvInverter: React.FC<PvInverterProps> = (props) => {
  const { id, open, onCancel, model, loopNum } = props;
  const [tableData, setTableData] = useState<PvInverterType[]>([]); //Upv15 Ipv1
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initTableData: PvInverterType[] = [];
    for (let i = 0; i < loopNum; i++) {
      initTableData.push({
        id: i + 1,
        loop: 'PV' + (i + 1),
        voltage: '',
        current: '',
      });
    }
    setTableData(initTableData);
  }, [loopNum]);

  const runItems: DetailItem[] = [
    { label: '电网A相电压', field: 'Ua', format: voltageFormat },
    { label: '电网A相电流', field: 'Ia', format: currentFormat },
    { label: '电网B相电压', field: 'Ub', format: voltageFormat },
    { label: '电网B相电流', field: 'Ib', format: currentFormat },
    { label: '电网C相电压', field: 'Uc', format: voltageFormat },
    { label: '电网C相电流', field: 'Ic', format: currentFormat },
    { label: '有功功率', field: 'P', format: powerFormat },
    { label: '当日发电量', field: 'dayCap', format: powerHourFormat },
    { label: '无功功率', field: 'Q', format: noPowerFormat },
    { label: '累计发电量', field: 'totalCap', format: powerHourFormat },
    { label: '功率因数', field: 'COS' },
    { label: '逆变器额定功率', field: 'ratedPowerOfInverter', format: powerFormat },
    { label: '输出方式', field: 'outputMethod' },
    { label: '电网频率', field: 'elecFreq', format: frequencyFormat },
    { label: '内部温度', field: 'temperature', format: tempFormat },
    { label: '逆变器开机时间', field: 'openTime', format: timeFormat },
    { label: '绝缘阻抗值', field: 'insulationImpedanceValue', format: mohmFormat },
    { label: '逆变器关机时间', field: 'closeTime', format: timeFormat },
  ];

  const columns: ColumnsType<PvInverterType> = [
    {
      title: '回路',
      dataIndex: 'loop',
      key: 'loop',
      align: 'center',
    },
    {
      title: '电压(V)',
      dataIndex: 'voltage',
      key: 'voltage',
      align: 'center',
      render: (_, record) =>
        isEmpty(equipmentData?.['Upv' + record.id]) ? '--' : equipmentData?.['Upv' + record.id],
    },
    {
      title: '电流(A)',
      dataIndex: 'current',
      key: 'current',
      align: 'center',
      render: (_, record) =>
        isEmpty(equipmentData?.['Ipv' + record.id]) ? '--' : equipmentData?.['Ipv' + record.id],
    },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: loading ? (
        <>
          <Row gutter={24}>
            <Col span={10}>
              <Skeleton paragraph={{ rows: loopNum }} />
            </Col>
            <Col span={13} offset={1}>
              <Skeleton paragraph={{ rows: 6 }} />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col span={9}>
              <Label title="直流输入" />
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                size="small"
                rowKey="id"
              />
            </Col>
            <Col span={14} offset={1}>
              <Label title="交流输出" />
              <Detail data={equipmentData} items={runItems} column={2} />
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <Empty />,
    },
    {
      label: '告警/故障',
      key: 'item-2',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '日志',
      key: 'item-3',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
  ];

  return (
    <>
      <Dialog
        model={model}
        title="设备详情"
        open={open}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          equipmentImg={PvInverterImg}
          productImg={PvInverterIntroImg}
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default PvInverter;
