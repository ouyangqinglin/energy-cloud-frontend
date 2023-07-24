import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, Image, Modal, message } from 'antd';
import { ProField } from '@ant-design/pro-components';
import { useRequest, useModel } from 'umi';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { getStation } from '@/services/station';
import { setComplete } from './service';
import { buildStatus, FormTypeEnum } from '@/utils/dictionary';
import { kVoltageFormat, kVAFormat, kWpFormat, powerFormat, powerHourFormat } from '@/utils/format';
import StationForm from '@/pages/station/stationList/components/edit';

const StationInfo: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [open, setOpen] = useState(false);
  const {
    loading,
    data: detailData,
    run,
  } = useRequest(getStation, {
    manual: true,
  });

  const onCompleteClick = useCallback(() => {
    Modal.confirm({
      title: '完工确认',
      content: '确认站点已经完工，点击确认站点变更为已完工状态',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        setComplete(siteId).then(({ data }) => {
          if (data) {
            message.success('操作成功');
            run(siteId);
          }
        });
      },
    });
  }, [siteId]);

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const onSuccess = useCallback(() => {
    run(siteId);
  }, [siteId]);

  useEffect(() => {
    if (siteId) {
      run(siteId);
    }
  }, [siteId]);

  const detailItems: DetailItem[] = [
    {
      label: '站点状态',
      field: 'constructionStatus',
      span: 3,
      format: (value) => <ProField text={value} mode="read" valueEnum={buildStatus} />,
    },
    { label: '创建时间', field: 'createTime' },
    { label: '交付时间', field: 'deliveryTime', span: 2 },
    { label: '创建人', field: 'createByName' },
    { label: '交付人', field: 'deliveryByName' },
  ];

  const baseDetailItems: DetailItem[] = [
    { label: '站点名称', field: 'name' },
    { label: '站点ID', field: 'id' },
    { label: '安装商', field: 'agentName' },
    { label: '电压等级', field: 'voltageClass', format: kVoltageFormat },
    { label: '变压器容量', field: 'transformerCapacity', format: kVAFormat },
    { label: '光伏装机量', field: 'photovoltaicInstalledCapacity', format: kWpFormat },
    {
      label: '储能桩机量',
      field: 'energyStorageCapacity',
      format: (_, data) =>
        `${powerFormat(data.energyStoragePower)}/${powerHourFormat(data.energyStorageCapacity)}`,
    },
    { label: '充电桩装机量', field: 'chargingStationCapacity', format: powerFormat },
    { label: '站点地址', field: 'address' },
    { label: '备注', field: 'remarks', span: 3 },
    {
      label: 'logo',
      field: 'logo',
      format: (url) => (
        <Image style={{ objectFit: 'contain' }} width={200} height={200} src={url} />
      ),
    },
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
      <div className="px24">
        <Card
          className="mt16"
          title="状态信息"
          extra={
            detailData?.constructionStatus === 0 ? (
              <Button type="primary" loading={loading} onClick={onCompleteClick}>
                站点完工
              </Button>
            ) : (
              ''
            )
          }
        >
          <Detail
            data={detailData}
            items={detailItems}
            labelStyle={{ width: '100px' }}
            column={3}
          />
        </Card>
        <Card className="my16" title="基础信息">
          <Detail
            data={detailData}
            items={baseDetailItems}
            labelStyle={{ width: '100px' }}
            column={3}
          />
        </Card>
      </div>
      <StationForm
        id={siteId}
        open={open}
        onOpenChange={setOpen}
        type={FormTypeEnum.Edit}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default StationInfo;
