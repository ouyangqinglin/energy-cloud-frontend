/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-11 15:10:11
 * @LastEditTime: 2023-09-11 15:10:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Pcs\index.tsx
 */
import React, { useCallback, useMemo, useState } from 'react';
import { DeviceRealTimeType } from '../config';
import useDeviceModel from '../useDeviceModel';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { useSubscribe } from '@/hooks';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import { directCurrentItems, exchargeItems, runItems, tempItems, versionItems } from './config';
import { isEmpty } from '@/utils';

const Pcs: React.FC<DeviceRealTimeType> = (props) => {
  const { id, productId, deviceData } = props;

  const { modelMap } = useDeviceModel({ productId });
  const openSubscribe = useMemo(
    () => !isEmpty(deviceData?.status) && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, true);
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

  const detailGroup = useMemo<GroupItem[]>(() => {
    return [
      {
        label: <Detail.Label title="运行状态" />,
        items: runItems,
      },
      {
        label: <Detail.Label title="交流侧信息" />,
        items: exchargeItems,
      },
      {
        label: <Detail.Label title="直流侧信息" />,
        items: directCurrentItems,
      },
      {
        label: <Detail.Label title="温度信息" />,
        items: tempItems,
      },
      {
        label: <Detail.Label title="版本信息" />,
        items: versionItems,
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

export default Pcs;
