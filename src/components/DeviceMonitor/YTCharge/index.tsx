/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-08-04 17:56:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\YTCharge\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import RealTime from '@/components/ScreenDialog/YtCharge/RealTime';
import { LabelTypeEnum } from '@/components/ScreenDialog';
import Page from '@/layouts/Page';
import YtChargeImg from '@/assets/image/product/yt-charge.png';
import YtChargeIntroImg from '@/assets/image/product/yt-charge-intro.jpg';
import Community from '@/components/ScreenDialog/Community';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id, onChange } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: YtChargeImg });
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
        top={<Overview data={deviceData} introImg={YtChargeIntroImg} />}
        bottom={
          <DeviceInfo
            id={id}
            onChange={onDataChange}
            setLoading={setLoading}
            buttons={
              <Community id={id} siteId={deviceData?.siteId} type={deviceData?.paramConfigType} />
            }
          />
        }
      >
        <RealTime
          id={id}
          loading={loading}
          labelType={LabelTypeEnum.LineLabel}
          detailProps={{
            extral,
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
      </Page>
    </>
  );
};

export default BoxSubstation;
