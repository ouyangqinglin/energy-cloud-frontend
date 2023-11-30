/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 15:25:00
 * @LastEditTime: 2023-09-20 11:45:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\YTCharge\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import RealTime from '@/components/ScreenDialog/YtCharge/RealTime';
import { LabelTypeEnum } from '@/components/ScreenDialog';
import useDeviceModel from '../useDeviceModel';
import { isEmpty } from '@/utils';

const YTCharge: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData, loading } = props;

  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const { modelMap } = useDeviceModel({ productId });

  const onClick = useCallback((item: DetailItem) => {
    setCollectionInfo({
      title: item.label as any,
      collection: item.field,
    });
  }, []);

  const extral = (
    <Button
      title={collectionInfo.title}
      deviceId={id}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  return (
    <>
      <RealTime
        id={id}
        loading={loading}
        open={openSubscribe}
        labelType={LabelTypeEnum.LineLabel}
        detailProps={{
          extral,
          colon: false,
          labelStyle: { width: 140 },
          valueStyle: { width: '40%' },
        }}
      />
    </>
  );
};

export default YTCharge;
