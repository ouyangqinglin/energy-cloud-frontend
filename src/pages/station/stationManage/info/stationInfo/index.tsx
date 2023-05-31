import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Button, Image, Modal, message } from 'antd';
import { ProField } from '@ant-design/pro-components';
import { useRequest, useLocation } from 'umi';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { getData } from '../../../stationList/service';
import { setComplete } from './service';
import { LocationType, buildStatus, FormTypeEnum } from '@/utils/dictionary';
import { kVoltageFormat, kVAFormat, kWpFormat, powerFormat } from '@/utils/format';
import StationForm from '@/pages/station/stationList/components/edit';

const StationInfo: React.FC = () => {
  const location = useLocation();
  const id = useMemo(
    () => (location as LocationType)?.query?.id,
    [(location as LocationType)?.query?.id],
  );
  const [open, setOpen] = useState(false);
  const {
    loading,
    data: detailData,
    run,
  } = useRequest(getData, {
    manual: true,
  });

  const onCompleteClick = useCallback(() => {
    Modal.confirm({
      title: '完工确认',
      content: '确认站点已经完工，点击确认站点变更为已完工状态',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setComplete(id).then(({ data }) => {
          if (data) {
            message.success('操作成功');
            run(id);
          }
        });
      },
    });
  }, []);

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const onSuccess = useCallback(() => {
    run(id);
  }, []);

  useEffect(() => {
    run(id);
  }, [id]);

  const detailItems: DetailItem[] = [
    {
      label: '站点状态',
      field: 'status',
      span: 3,
      format: (value) => <ProField text={value} mode="read" valueEnum={buildStatus} />,
    },
    { label: '创建时间', field: 'createTime' },
    { label: '交付时间', field: 'deliveryTime', span: 2 },
    { label: '创建人', field: 'creator' },
    { label: '交付人', field: 'deliveryUser' },
  ];

  const baseDetailItems: DetailItem[] = [
    { label: '站点名称', field: 'name' },
    { label: '站点ID', field: 'id' },
    { label: '代理商', field: 'agent' },
    { label: '电压等级', field: 'voltageClass', format: kVoltageFormat },
    { label: '变压器容量', field: 'transformerCapacity', format: kVAFormat },
    { label: '光伏装机量', field: 'photovoltaicInstalledCapacity', format: kWpFormat },
    { label: '储能总容量', field: 'energyStorageCapacityStorage' },
    { label: '充电桩装机量', field: 'chargingStationCapacity', format: powerFormat },
    { label: '站点地址', field: 'address' },
    { label: 'logo', field: 'logo', format: (url) => <Image width={200} src={url} /> },
    {
      label: '站点照片',
      field: 'photos',
      span: 2,
      format: (url) =>
        url?.split?.(',')?.map?.((item: string) => (
          <span className="mr12">
            <Image width={200} src={item} />
          </span>
        )),
    },
  ];

  return (
    <>
      <Card
        title="状态信息"
        extra={
          <Button type="primary" loading={loading} onClick={onCompleteClick}>
            站点完工
          </Button>
        }
      >
        <Detail data={detailData} items={detailItems} labelStyle={{ width: '100px' }} column={3} />
      </Card>
      <Card
        className="mt16"
        title="基础信息"
        extra={
          <Button type="primary" loading={loading} onClick={switchOpen}>
            编辑
          </Button>
        }
      >
        <Detail
          data={detailData}
          items={baseDetailItems}
          labelStyle={{ width: '100px' }}
          column={3}
        />
      </Card>
      <StationForm
        id={id}
        open={open}
        onOpenChange={setOpen}
        type={FormTypeEnum.Edit}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default StationInfo;
