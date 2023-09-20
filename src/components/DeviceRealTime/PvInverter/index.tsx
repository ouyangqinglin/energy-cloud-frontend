/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 15:13:33
 * @LastEditTime: 2023-09-11 15:13:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\PvInverter\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import { LabelTypeEnum } from '@/components/ScreenDialog';
import RealTime from '@/components/ScreenDialog/PvInverter/RealTime';
import useDeviceModel from '../useDeviceModel';

export type PvInverterProps = DeviceRealTimeType & {
  loopNum: number;
};

const PvInverter: React.FC<PvInverterProps> = (props) => {
  const { id, productId, deviceData, loading, loopNum } = props;

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
        labelType={LabelTypeEnum.LineLabel}
        loopNum={loopNum}
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

export default PvInverter;
