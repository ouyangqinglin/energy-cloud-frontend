/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 18:59:32
 * @LastEditTime: 2023-05-10 14:15:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\PvInverter\index.tsx
 */

import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Table, Row, Col } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRequest } from 'umi';
import ScreenDialog from '@/components/ScreenDialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import AlarmTable from '@/components/AlarmTable';
import { getDeviceInfo, getAlarms, getLogs } from '@/components/ScreenDialog/service';
import LogTable from '@/components/LogTable';
import { PvInverterType } from './data.d';
import Label from '@/components/Detail/label';
import { getDcIn } from './service';
import Detail from '@/components/Detail';
import type { fieldType } from '@/utils/dictionary';
import { valueFormat } from '@/utils';

const PvInverter: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [tableData, setTableData] = useState<PvInverterType[]>();
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  data.img = data.img || ImgCharge;

  const runItems = (data?.run?.ytCharge?.field || []).map((item: fieldType) => {
    return { ...item, format: valueFormat };
  });

  useEffect(() => {
    if (open) {
      run(id);
      getDcIn().then((res) => {
        setTableData(res.rows || []);
      });
    }
  }, [open]);

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
              <Table columns={columns} dataSource={tableData} pagination={false} size="middle" />
            </Col>
            <Col span={14} offset={1}>
              <Label title="交流输出" />
              <Detail data={data?.run?.ytCharge?.value || {}} items={runItems} column={2} />
            </Col>
          </Row>
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: <></>,
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

  return (
    <>
      <Component
        title="设备详情"
        open={open}
        onCancel={onCancel}
        loading={loading}
        width={model === 'screen' ? '62.5vw' : '1200px'}
        wrapClassName={model === 'screen' ? '' : 'dialog-equipment'}
        footer={null}
      >
        <EquipInfo data={data} product={data.product} model={model} />
        <Tabs items={tabItems} />
      </Component>
    </>
  );
};

export default PvInverter;
