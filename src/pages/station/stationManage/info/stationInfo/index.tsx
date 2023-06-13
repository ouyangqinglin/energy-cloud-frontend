import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button, Image, Modal, message } from 'antd';
import { ProField } from '@ant-design/pro-components';
import { useRequest, useModel } from 'umi';
import { useBoolean } from 'ahooks';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { getStation } from '@/services/station';
import { setComplete, getDefaultPage } from './service';
import { buildStatus, FormTypeEnum } from '@/utils/dictionary';
import { kVoltageFormat, kVAFormat, kWpFormat, powerFormat } from '@/utils/format';
import StationForm from '@/pages/station/stationList/components/edit';
import CustomPageForm from './components/customPageForm';

const StationInfo: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [open, setOpen] = useState(false);
  const [openCustomPage, { set, setTrue }] = useBoolean(false);
  const {
    loading,
    data: detailData,
    run,
  } = useRequest(getStation, {
    manual: true,
  });
  const { data: pageData, run: runGetDefaultPage } = useRequest(getDefaultPage, {
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
  }, []);

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const onSuccess = useCallback(() => {
    run(siteId);
  }, []);

  useEffect(() => {
    if (siteId) {
      run(siteId);
      runGetDefaultPage(siteId);
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
    { label: '代理商', field: 'agentName' },
    { label: '电压等级', field: 'voltageClass', format: kVoltageFormat },
    { label: '变压器容量', field: 'transformerCapacity', format: kVAFormat },
    { label: '光伏装机量', field: 'photovoltaicInstalledCapacity', format: kWpFormat },
    { label: '储能总容量', field: 'energyStorageCapacity' },
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

  const pageDetailItems: DetailItem[] = [
    {
      label: '当前默认首页',
      field: 'homeType',
      format: () => (pageData?.homeType ? pageData?.customPageName : '默认首页'),
    },
  ];

  return (
    <>
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
        <Detail data={detailData} items={detailItems} labelStyle={{ width: '100px' }} column={3} />
      </Card>
      <Card
        className="my16"
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
      <Card
        title="默认首页"
        extra={
          <Button type="primary" loading={loading} onClick={setTrue}>
            编辑
          </Button>
        }
      >
        <Detail
          data={pageData}
          items={pageDetailItems}
          labelStyle={{ width: '100px' }}
          column={3}
        />
      </Card>
      <StationForm
        id={siteId}
        open={open}
        onOpenChange={setOpen}
        type={FormTypeEnum.Edit}
        onSuccess={onSuccess}
      />
      {openCustomPage && (
        <CustomPageForm open={openCustomPage} onOpenChange={set} siteId={siteId} />
      )}
    </>
  );
};

export default StationInfo;
