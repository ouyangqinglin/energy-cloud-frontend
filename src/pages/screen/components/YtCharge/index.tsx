import React, { useEffect, useState } from 'react';
import { Tabs, Row, Col, Skeleton } from 'antd';
import Dialog from '@/components/Dialog';
import type { BusinessDialogProps } from '@/components/Dialog';
import EquipInfo from '@/components/EquipInfo';
import Detail from '@/components/Detail';
import Meter, { MeterSkeleton } from '@/components/Meter';
import Label from '@/components/Detail/label';
import Empty from '@/components/Empty';
import AlarmTable from '@/components/AlarmTable';
import LogTable from '@/components/LogTable';
import { getAlarms, getLogs } from '@/services/equipment';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import type { DetailItem } from '@/components/Detail';
import { useFormat, powerHourFormat } from '@/utils/format';
import useSubscribe from '@/pages/screen/useSubscribe';
import { getRelatedDevice, getGuns } from '@/services/equipment';
import { arrayToMap } from '@/utils';
import { AnyMapType } from '@/utils/dictionary';

const YtCharge: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel, model } = props;
  const [relatedIds, setRelatedIds] = useState([]);
  const [aGunId, setAGunId] = useState('');
  const [bGunId, setBGunId] = useState('');
  const aGunData = useSubscribe(aGunId, open);
  const bGunData = useSubscribe(bGunId, open);
  const meterData = useSubscribe(relatedIds, open);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && id) {
      getRelatedDevice(id).then((res) => {
        if (res?.data?.associatedIds) {
          setRelatedIds(res.data.associatedIds);
        }
      });
      getGuns(id).then(({ data = [] }) => {
        const gunMap: AnyMapType = arrayToMap(data || [], 'key', 'deviceId');
        setAGunId(gunMap.AGun);
        setAGunId(gunMap.BGun);
      });
    }
  }, [id, open]);

  const statusItems: DetailItem[] = [
    { label: 'A枪状态', field: 'status', format: useFormat },
    { label: 'B枪状态', field: 'status', format: useFormat },
  ];

  const runItems: DetailItem[] = [
    { label: '今日充电量', field: 'todaycharge', format: powerHourFormat },
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
          <MeterSkeleton />
        </>
      ) : (
        <>
          <Label title="状态信息" />
          <Detail data={{ ...aGunData, ...bGunData }} items={statusItems} column={4} />
          <Label title="运行信息" />
          <Detail data={{ ...meterData }} items={runItems} column={4} />
          <Meter data={meterData} />
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
          equipmentImg={YtChargeImg}
          productImg={YtChargeIntroImg}
          setLoading={setLoading}
        />
        <Tabs items={tabItems} />
      </Dialog>
    </>
  );
};

export default YtCharge;
