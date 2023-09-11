/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:27:32
 * @LastEditTime: 2023-09-11 14:27:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\BoxSubstation\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import RealTime from '@/components/Meter/RealTime';
import { DeviceRealTimeType } from '../config';
import Button from '@/components/CollectionModal/Button';
import Detail, { DetailItem } from '@/components/Detail';
import { OnlineStatusEnum } from '@/utils/dictionary';
import useDeviceModel from '../useDeviceModel';

const BoxSubstation: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData, loading } = props;

  const { modelMap } = useDeviceModel({ productId });
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

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
        label={<Detail.Label title="运行信息" />}
        open={openSubscribe}
        detailProps={{
          extral,
          colon: false,
          valueStyle: { flex: 1, textAlign: 'right' },
        }}
      />
    </>
  );
};

export default BoxSubstation;
