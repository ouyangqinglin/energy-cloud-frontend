/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:08:46
 * @LastEditTime: 2023-06-20 14:33:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\HwChargeYt\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Modal, Tabs, Row, Col, Skeleton, Button } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getGuns, getLogs } from '@/services/equipment';
import HwChargeStackImg from '@/assets/image/product/hw-charge-yt.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { useFormat, powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import Community from '../Community';
import { arrayToMap } from '@/utils';

const HwChargeYt: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [aGunId, setAGunId] = useState('');
  const [bGunId, setBGunId] = useState('');
  const aGunData = useSubscribe(aGunId, open);
  const bGunData = useSubscribe(bGunId, open);
  const equipmentData = useSubscribe(id, open);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  useEffect(() => {
    if (open && id) {
      getGuns(id).then(({ data = [] }) => {
        const gunMap: Record<string, any> = arrayToMap(data || [], 'key', 'deviceId');
        setAGunId(gunMap.AGun);
        setBGunId(gunMap.BGun);
      });
    }
  }, [id, open]);

  const aStatusItems: DetailItem[] = [{ label: 'A枪状态', field: 'Status', format: useFormat }];
  const bStatusItems: DetailItem[] = [{ label: 'B枪状态', field: 'Status', format: useFormat }];
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
          <Skeleton.Button className="mb12" size="small" active />
          <Row>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
            <Col span={12}>
              <Skeleton.Button className="mb12" size="small" active />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Label title="状态信息" />
          <Row>
            <Col span={12}>
              <Detail data={aGunData} items={aStatusItems} column={2} />
            </Col>
            <Col span={12}>
              <Detail data={bGunData} items={bStatusItems} column={2} />
            </Col>
          </Row>
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
          equipmentImg={HwChargeStackImg}
          productImg={HwChargeStackIntroImg}
          setLoading={setLoading}
          buttons={
            <Community
              id={id}
              model={model}
              siteId={deviceData?.siteId}
              type={deviceData?.paramConfigType}
            />
          }
          onChange={onDataChange}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default HwChargeYt;
