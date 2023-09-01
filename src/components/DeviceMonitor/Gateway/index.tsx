/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-20 09:35:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\ElectricMeter\index.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Detail, { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import RealTime from '@/components/Meter/RealTime';
import Page from '@/layouts/Page';
import EmptyImg from '@/assets/image/device/empty.png';
import Community from '@/components/ScreenDialog/Community';
import { OnlineStatusEnum } from '@/utils/dictionary';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id, onChange } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: EmptyImg });
    onChange?.(value);
  }, []);

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
      onClick={onClick}
    />
  );

  return (
    <>
      <Page
        top={<Overview data={deviceData} />}
        bottom={<DeviceInfo id={id} onChange={onDataChange} setLoading={setLoading} />}
      >
        <RealTime
          id={id}
          loading={loading}
          open={openSubscribe}
          label={<Detail.Label title="运行信息" />}
          detailProps={{
            extral,
            colon: false,
            valueStyle: { flex: 1, textAlign: 'right' },
          }}
        />
      </Page>
    </>
  );
};

export default BoxSubstation;
