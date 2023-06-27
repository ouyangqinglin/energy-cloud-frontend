/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-08 19:08:46
 * @LastEditTime: 2023-06-01 14:52:40
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\HwCharge\index.tsx
 */
import React, { useEffect, useState, useCallback } from 'react';
import { Tabs, Row, Col, Skeleton, Empty as AntEmpty } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/ScreenDialog';
import EquipInfo from '@/components/EquipInfo';
import type { DeviceType } from '@/components/EquipInfo/type';
import Detail from '@/components/Detail';
import Empty from '@/components/Empty';
import Label from '@/components/Detail/label';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import HwChargeStackImg from '@/assets/image/product/hw-charge-stack.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import { getRelatedDevice } from '@/services/equipment';
import Community from '../Community';

const HwCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [relatedIds, setRelatedIds] = useState([]);
  const equipmentData = useSubscribe(relatedIds, open);
  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceType>();

  const onDataChange = useCallback((data) => {
    setDeviceData(data);
  }, []);

  useEffect(() => {
    if (open && id) {
      getRelatedDevice(id).then((res) => {
        if (res?.data?.associatedIds) {
          setRelatedIds(res.data.associatedIds);
        }
      });
    }
  }, [id, open]);

  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'todayCharge', format: powerHourFormat },
    { label: '累计充电量', field: 'cumulativeCharge', format: powerHourFormat },
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
          <Label title="运行信息" />
          <Detail data={equipmentData || {}} items={runItems} column={4} />
        </>
      ),
    },
    {
      label: '远程设置',
      key: 'item-1',
      children: model == 'screen' ? <Empty /> : <AntEmpty />,
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

export default HwCharge;
