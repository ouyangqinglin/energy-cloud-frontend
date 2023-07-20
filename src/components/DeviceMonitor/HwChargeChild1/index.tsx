/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-18 17:54:58
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\BoxSubstation\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Detail, { DetailItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import RealTime from '@/components/ScreenDialog/HwCharge/RealTime';
import Page from '@/layouts/Page';
import HwChargeStackImg from '@/assets/image/product/hw-charge-child.png';
import HwChargeStackIntroImg from '@/assets/image/product/hw-charge-stack-intro.jpg';

const BoxSubstation: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [loading, setLoading] = useState(false);
  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: HwChargeStackImg });
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
        top={<Overview data={deviceData} introImg={HwChargeStackIntroImg} />}
        bottom={<DeviceInfo id={id} onChange={onDataChange} setLoading={setLoading} />}
      >
        <RealTime
          id={id}
          loading={loading}
          label={<Detail.Label title="运行信息" />}
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
