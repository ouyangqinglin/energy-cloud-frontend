/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-27 09:17:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Pcs\index.tsx
 */
import React, { useState, useCallback, useMemo } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';
import ConverterImg from '@/assets/image/device/converter.png';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { runItems, exchargeItems, directCurrentItems, tempItems, versionItems } from './config';
import Button from '@/components/CollectionModal/Button';
import Page from '@/layouts/Page';
import Community from '@/components/ScreenDialog/Community';
import useDeviceModel from '../useDeviceModel';

const Pcs: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const { modelMap } = useDeviceModel({ productId });
  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const realTimeData = useSubscribe(id, true);
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: ConverterImg });
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
      <Page
        top={<Overview data={deviceData} />}
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
      </Page>
    </>
  );
};

export default Pcs;
