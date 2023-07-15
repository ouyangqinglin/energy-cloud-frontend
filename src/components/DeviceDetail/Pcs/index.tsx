/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-07-15 17:43:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\Pcs\index.tsx
 */
import React, { useState, useCallback } from 'react';
import { DeviceDetailType } from '../config';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import { getChildEquipment } from '@/services/equipment';
import useSubscribe from '@/pages/screen/useSubscribe';
import ConverterImg from '@/assets/image/device/converter.png';
import Detail, { DetailItem } from '@/components/Detail';
import Label from '@/components/DeviceInfo/Label';
import { runItems, exchargeItems, directCurrentItems, tempItems, versionItems } from './config';
import Button from '@/components/CollectionModal/Button';

const Pcs: React.FC<DeviceDetailType> = (props) => {
  const { id } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const realTimeData = useSubscribe(id, true);
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onDataChange = useCallback((value: DeviceDataType) => {
    setDeviceData({ ...(value || {}), productImg: ConverterImg });
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
      <div className="card-wrap">
        <Overview data={deviceData} />
      </div>
      <div className="card-wrap p24 my24">
        <Label title="运行状态" />
        <Detail items={runItems} data={realTimeData} extral={extral} />
        <Label title="交流侧信息" />
        <Detail items={exchargeItems} data={realTimeData} extral={extral} />
        <Label title="直流侧信息" />
        <Detail items={directCurrentItems} data={realTimeData} extral={extral} />
        <Label title="温度信息" />
        <Detail items={tempItems} data={realTimeData} extral={extral} />
        <Label title="版本信息" />
        <Detail items={versionItems} data={realTimeData} extral={extral} />
      </div>
      <div className="card-wrap p24">
        <DeviceInfo id={id} onChange={onDataChange} />
      </div>
    </>
  );
};

export default Pcs;
