/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 14:04:21
 * @LastEditTime: 2023-09-11 14:04:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Air\Detail\index.tsx
 */
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { useSubscribe } from '@/hooks';
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import { OnlineStatusEnum } from '@/utils/dictionary';
import useDeviceModel from '../useDeviceModel';
import Button from '@/components/CollectionModal/Button';
import { controlItems, statusItems } from './config';
import { isEmpty } from '@/utils';

const Air: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData } = props;

  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );

  const realTimeData = useSubscribe(id, openSubscribe);
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
      deviceId={id}
      title={collectionInfo.title}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="控制信息" />,
        items: controlItems,
      },
      {
        label: <Detail.Label title="状态信息" />,
        items: statusItems,
      },
    ];
  }, []);

  return (
    <>
      <Detail.Group
        data={realTimeData}
        items={detailGroup}
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

export default Air;
