/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 18:59:32
 * @LastEditTime: 2023-05-12 11:43:45
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\PvInverter\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Table, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/components/ScreenDialog/service';
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
} from '@/utils/format';

export type PvInverterProps = BusinessDialogProps & {
  loopNum: number;
};

const PvInverter: React.FC<PvInverterProps> = (props) => {
  const { id, open, onCancel, model, loopNum } = props;
  const [tableData, setTableData] = useState<PvInverterType[]>([]); //UUpv15 Ipv1
  const [data, setData] = useState({});

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
    { label: '逆变器额定功率', field: '', format: powerFormat },
    { label: '输出方式', field: '' },
    { label: '电网频率', field: 'elecFreq', format: frequencyFormat },
    { label: '内部温度', field: 'temperature', format: tempFormat },
    { label: '逆变器开机时间', field: 'openTime' },
    { label: '绝缘阻抗值', field: '', format: mohmFormat },
    { label: '逆变器关机时间', field: 'closeTime' },
  ];

  const Component = model === 'screen' ? ScreenDialog : Modal;

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
    },
    {
      title: '电流(A)',
      dataIndex: 'current',
      key: 'current',
      align: 'center',
    },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: (
        <>
          <Row>
            <Col span={9}>
              <Label title="直流输入" />
              <Table columns={columns} dataSource={tableData} pagination={false} size="small" />
            </Col>
            <Col span={14} offset={1}>
              <Label title="交流输出" />
              <Detail data={data} items={runItems} column={2} />
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
      label: '报警/故障',
      key: 'item-2',
      children: <AlarmTable params={{ id }} request={getAlarms} />,
    },
    {
      label: '设备日志',
      key: 'item-3',
      children: <LogTable params={{ id }} request={getLogs} />,
    },
  ];

  useEffect(() => {
    const initTableData: PvInverterType[] = [];
    for (let i = 0; i < loopNum; i++) {
      initTableData.push({
        loop: 'PV' + (i + 1),
        voltage: '',
        current: '',
      });
    }
    setTableData(initTableData);
  }, [loopNum]);

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
        destroyOnClose
      >
        <EquipInfo
          id={id}
          model={model}
          equipmentImg={PvInverterImg}
          productImg={PvInverterIntroImg}
        />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default PvInverter;
