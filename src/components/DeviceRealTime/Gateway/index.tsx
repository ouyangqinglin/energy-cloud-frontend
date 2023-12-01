/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:58:39
 * @LastEditTime: 2023-09-11 14:58:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Gateway\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import RealTime from '@/components/Meter/RealTime';
import { OnlineStatusEnum } from '@/utils/dict';
import Detail, { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import useDeviceModel from '../useDeviceModel';
import { formatMessage } from '@/utils';

const Index: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData, loading } = props;

  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
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
        label={<Detail.Label title={formatMessage({ id: 'siteMonitor.operationalInformation', defaultMessage: '运行信息'})} />}
        detailProps={{
          extral,
          colon: false,
          valueStyle: { flex: 1, textAlign: 'right' },
        }}
      />
    </>
  );
};

export default Index;
