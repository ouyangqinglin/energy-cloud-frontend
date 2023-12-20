/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 15:01:46
 * @LastEditTime: 2023-09-11 15:01:50
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\HwCharge\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import RealTime from '@/components/ScreenDialog/HwCharge/RealTime';
import { OnlineStatusEnum } from '@/utils/dict';
import Detail, { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import useDeviceModel from '../useDeviceModel';
import { isEmpty, formatMessage } from '@/utils';

const HwCharge: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData, loading } = props;

  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });
  const { modelMap } = useDeviceModel({ productId });

  const onClick = useCallback((item: DetailItem) => {
    if (item.field) {
      setCollectionInfo({
        title: item.label as any,
        collection: item.field,
      });
    }
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
        label={
          <Detail.Label
            title={formatMessage({
              id: 'siteMonitor.operationalInformation',
              defaultMessage: '运行信息',
            })}
          />
        }
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

export default HwCharge;
