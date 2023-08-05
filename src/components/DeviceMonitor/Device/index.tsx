/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-08-05 09:47:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\index.tsx
 */
import React, { useState, useCallback, useEffect } from 'react';
import { DeviceDetailType } from '../config';
import { Empty, Spin } from 'antd';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import EmptyImg from '@/assets/image/device/empty.png';
import Community from '@/components/ScreenDialog/Community';
import useDeviceModel from '../useDeviceModel';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { useSubscribe } from '@/hooks';
import Button from '@/components/CollectionModal/Button';
import { formatModelValue } from '@/utils';
import { deviceProductDataMap } from './config';

const Device: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const realTimeData = useSubscribe(id, true);
  const { data: deviceGroupData, loading, modelMap } = useDeviceModel({ productId, isGroup: true });
  const [detailGroup, setDetailGroup] = useState<GroupItem[]>([]);
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback(
    (value: DeviceDataType) => {
      setDeviceData({ ...(value || {}), productImg: deviceProductDataMap[productId]?.img });
      onChange?.(value);
    },
    [productId],
  );

  const onClick = useCallback((item: DetailItem) => {
    setCollectionInfo({
      title: item.label as any,
      collection: item.field,
    });
  }, []);

  useEffect(() => {
    const group: GroupItem[] = [];
    deviceGroupData?.properties?.forEach?.((item) => {
      const items: DetailItem[] = [];
      item?.properties?.forEach?.((property) => {
        items.push({
          label: property?.name,
          field: property?.id || Math.random() + '',
          format: (value: string) => formatModelValue(value, modelMap[property?.id || '']),
        });
      });
      group.push({
        label: <Detail.Label title={item?.groupName} />,
        items: items,
      });
    });
    setDetailGroup(group);
  }, [deviceGroupData, modelMap]);

  const extral = (
    <Button
      deviceId={id}
      title={collectionInfo.title}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  return (
    <>
      <Page
        top={<Overview data={deviceData} introImg={deviceProductDataMap[productId]?.introImg} />}
        bottom={
          <DeviceInfo
            id={id}
            onChange={onDataChange}
            buttons={
              <Community id={id} siteId={deviceData?.siteId} type={deviceData?.paramConfigType} />
            }
          />
        }
      >
        {loading ? (
          <div className="tx-center my24">
            <Spin />
          </div>
        ) : (
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
        )}
      </Page>
    </>
  );
};

export default Device;
