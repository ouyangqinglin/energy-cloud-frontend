/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:40:23
 * @LastEditTime: 2023-11-13 19:11:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\ElectricMeter\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import RealTime from '@/components/Meter/RealTime';
import Detail, { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import { OnlineStatusEnum } from '@/utils/dict';
import useDeviceModel from '../useDeviceModel';
import styles from './index.less';
import { formatMessage } from '@/utils';

export type ElectricMeterType = DeviceRealTimeType & {
  label?: string;
  hideLineVoltage?: boolean;
};

const ElectricMeter: React.FC<ElectricMeterType> = (props) => {
  const { id, productId, deviceData, loading, label = formatMessage({ id: 'device.mainsLoad', defaultMessage: '市电负载' }), hideLineVoltage = false } = props;

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
      <div className={hideLineVoltage ? styles.contain : ''}>
        <RealTime
          id={id}
          loading={loading}
          open={openSubscribe}
          label={<Detail.Label title={label} />}
          detailProps={{
            extral,
            colon: false,
            valueStyle: { flex: 1, textAlign: 'right' },
          }}
        />
      </div>
    </>
  );
};

export default ElectricMeter;
