/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:08:46
 * @LastEditTime: 2023-05-12 14:08:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\HwCharge\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Skeleton } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import { getAlarms, getLogs } from '@/services/equipment';
import LogTable from '@/components/LogTable';
import HwChargeStackImg from '@/assets/image/product/hw-charge-child.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { useFormat, powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';

const HwChargeChild: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'a', format: useFormat },
    { label: 'B枪状态', field: 'b', format: useFormat },
  ];
  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'todayCharge', format: powerHourFormat },
    { label: '累计充电量', field: 'Pimp', format: powerHourFormat },
  ];

  const tabItems = [
    {
      label: '运行监测',
      key: 'item-0',
      children: loading ? (
        <>
          <Skeleton.Button className="mb12" size="small" />
          <Row>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" />
            </Col>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" />
            </Col>
          </Row>
          <Skeleton.Button className="mb12" size="small" />
          <Row>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" />
            </Col>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Label title="状态信息" />
          <Detail data={equipmentData || {}} items={statusItems} column={4} />
          <Label title="运行信息" />
          <Detail data={equipmentData || {}} items={runItems} column={4} />
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
          equipmentImg={HwChargeStackImg}
          productImg={HwChargeStackIntroImg}
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default HwChargeChild;
