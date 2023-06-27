/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 14:50:00
 * @LastEditTime: 2023-06-27 14:50:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\PvInverter\RealTime.tsx
 */

import React, { useState, useEffect } from 'react';
import { Skeleton, Row, Col, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { RealTimeProps } from '@/components/ScreenDialog';
import Label from '@/components/Detail/label';
import useSubscribe from '@/pages/screen/useSubscribe';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
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
import type { PvInverterType } from './data';
import { isEmpty } from '@/utils';

const RealTime: React.FC<
  RealTimeProps & {
    loopNum: number;
  }
> = (props) => {
  const { id, loading, open = true, loopNum } = props;

  const [tableData, setTableData] = useState<PvInverterType[]>([]); //Upv15 Ipv1
  const equipmentData = useSubscribe(id, open);

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
    { label: '无功功率', field: 'reactivePower', format: noPowerFormat },
    { label: '累计发电量', field: 'totalCap', format: powerHourFormat },
    { label: '功率因数', field: 'powerFactor' },
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

  return (
    <>
      {loading ? (
        <>
          <Row gutter={24}>
            <Col span={10}>
              <Skeleton paragraph={{ rows: loopNum }} active />
            </Col>
            <Col span={13} offset={1}>
              <Skeleton paragraph={{ rows: 6 }} active />
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
      )}
    </>
  );
};

export default RealTime;
