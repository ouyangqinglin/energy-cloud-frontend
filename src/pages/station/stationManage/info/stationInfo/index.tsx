import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Card, Button, Image, Modal, message } from 'antd';
import { ProField } from '@ant-design/pro-components';
import { useRequest, useModel, useLocation } from 'umi';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { getStation } from '@/services/station';
import { setComplete } from './service';
import { siteType } from '@/utils/dict';
import { buildStatus } from '@/utils/dict';
import { FormTypeEnum } from '@/components/SchemaForm';
import { LocationType } from '@/types';
import { kVoltageFormat, kVAFormat, kWpFormat, powerFormat, powerHourFormat } from '@/utils/format';
import StationForm from '@/pages/station/stationList/components/edit';
import PositionSelect from '@/components/PositionSelect';
import { formatMessage, getPlaceholder, getValue } from '@/utils';
import { useAuthority } from '@/hooks';
import { StationType } from '../../../stationList/data.d';

type StationInfoType = {
  onSiteChange?: (data: StationType) => void;
};

const StationInfo: React.FC<StationInfoType> = (props) => {
  const { onSiteChange } = props;

  const location = useLocation<LocationType>();
  const siteId = (location as LocationType).query?.id;
  const [open, setOpen] = useState(false);
  const { authorityMap } = useAuthority([
    'siteManage:siteConfig:baseInfo:siteDone',
    'oss:site:update',
  ]);
  const {
    loading,
    data: detailData,
    run,
  } = useRequest(getStation, {
    manual: true,
    onSuccess(data) {
      onSiteChange?.(data);
    },
  });

  const onCompleteClick = useCallback(() => {
    Modal.confirm({
      title: formatMessage({
        id: 'siteManage.set.confirmCompleteTitle',
        defaultMessage: '完工确认',
      }),
      content: formatMessage({
        id: 'siteManage.set.confirmCompleteContent',
        defaultMessage: '确认站点已经完工，点击确认站点变更为已完工状态',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () => {
        setComplete(siteId).then(({ data }) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.operateSuccess', defaultMessage: '操作成功' }),
            );
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
      label: formatMessage({ id: 'siteManage.set.siteStatus', defaultMessage: '站点状态' }),
      field: 'constructionStatus',
      span: 3,
      format: (value) => (
        <span className="pl4">
          <ProField text={value} mode="read" valueEnum={buildStatus} />
        </span>
      ),
    },
    {
      label: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
      field: 'createTime',
    },
    {
      label: formatMessage({ id: 'common.deliveryTime', defaultMessage: '投运日期' }),
      field: 'deliveryTime',
      span: 2,
    },
    {
      label: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
      field: 'createByName',
    },
    {
      label: formatMessage({ id: 'common.deliveryPerson', defaultMessage: '投运人' }),
      field: 'deliveryByName',
    },
  ];

  const baseDetailItems: DetailItem[] = [
    {
      label: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
      field: 'name',
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
      field: 'id',
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.siteType', defaultMessage: '站点类型' }),
      field: 'energyOptions',
      format: (value) => siteType[value]?.text,
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.installer', defaultMessage: '安装商' }),
      field: 'orgs',
      format: (value) =>
        getPlaceholder(value?.map?.((item) => item.orgName)?.join?.(',') || undefined),
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.voltageLevel', defaultMessage: '电压等级' }),
      field: 'voltageClass',
      format: kVoltageFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.siteList.transformerCapacity',
        defaultMessage: '变压器容量',
      }),
      field: 'transformerCapacity',
      format: kVAFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.siteList.totalPhotovoltaicCapacity',
        defaultMessage: '光伏总容量',
      }),
      field: 'photovoltaicInstalledCapacity',
      format: kWpFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.1015',
        defaultMessage: '风机额定功率',
      }),
      field: 'fanRatedPower',
      format: powerFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.1016',
        defaultMessage: '柴发额定功率',
      }),
      field: 'dieselRatedPower',
      format: powerFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.siteList.totalEnergyStorageCapacity',
        defaultMessage: '储能总容量',
      }),
      field: 'energyStorageCapacity',
      format: powerHourFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.siteList.energyStoragePower',
        defaultMessage: '储能额定功率',
      }),
      field: 'energyStoragePower',
      format: powerFormat,
    },
    {
      label: formatMessage({
        id: 'siteManage.siteList.chargingStationCapacity',
        defaultMessage: '充电桩总功率',
      }),
      field: 'chargingStationCapacity',
      format: powerFormat,
      span: 3,
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.siteAddress', defaultMessage: '站点地址' }),
      field: 'address',
      span: 3,
      valueStyle: { flex: 1 },
      format: (_, data) => {
        return (
          <PositionSelect
            value={{
              address: data?.address,
              point: {
                lng: data?.longitude,
                lat: data?.latitude,
              },
              adcode: data?.adcode,
            }}
            readonly
          />
        );
      },
    },
    {
      label: formatMessage({ id: 'common.remark', defaultMessage: '备注' }),
      field: 'remarks',
      span: 3,
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.siteLogo', defaultMessage: '站点图标' }),
      field: 'logo',
      format: (url) => (
        <Image style={{ objectFit: 'contain' }} width={200} height={200} src={url} />
      ),
    },
    {
      label: formatMessage({ id: 'siteManage.siteList.sitePhotos', defaultMessage: '站点照片' }),
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
          title={formatMessage({
            id: 'siteManage.set.statusInformation',
            defaultMessage: '状态信息',
          })}
          extra={
            detailData?.constructionStatus === 0 &&
            authorityMap.get('siteManage:siteConfig:baseInfo:siteDone') ? (
              <Button type="primary" loading={loading} onClick={onCompleteClick}>
                {formatMessage({ id: 'siteManage.set.siteComplete', defaultMessage: '站点完工' })}
              </Button>
            ) : (
              ''
            )
          }
        >
          <Detail
            data={detailData}
            items={detailItems}
            labelStyle={{ width: '115px' }}
            column={3}
          />
        </Card>
        <Card
          className="my16"
          title={formatMessage({ id: 'siteManage.set.baseInfo', defaultMessage: '基础信息' })}
          extra={
            authorityMap.get('oss:site:update') ? (
              <Button type="primary" loading={loading} onClick={switchOpen}>
                {formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
              </Button>
            ) : (
              ''
            )
          }
        >
          <Detail
            data={detailData}
            items={baseDetailItems}
            labelStyle={{ width: '115px' }}
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
