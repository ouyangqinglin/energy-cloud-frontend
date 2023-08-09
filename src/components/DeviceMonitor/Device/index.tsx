/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-14 14:19:44
 * @LastEditTime: 2023-08-08 16:43:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceMonitor\Device\index.tsx
 */
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { DeviceDetailType } from '../config';
import { Spin, Tabs, TabsProps } from 'antd';
import Overview from '@/components/DeviceInfo/Overview';
import DeviceInfo from '@/components/DeviceInfo';
import { DeviceDataType } from '@/services/equipment';
import Page from '@/layouts/Page';
import Community from '@/components/ScreenDialog/Community';
import useDeviceModel from '../useDeviceModel';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import { useSubscribe } from '@/hooks';
import Button from '@/components/CollectionModal/Button';
import { formatModelValue, parseToArray } from '@/utils';
import { deviceProductDataMap } from './config';
import { DevicePropsType } from '@/types/device';
import { DeviceModelTypeEnum, OnlineStatusEnum } from '@/utils/dictionary';
import styles from './index.less';

const getShowExtral = (type?: DeviceModelTypeEnum) => {
  return !(
    [DeviceModelTypeEnum.Array, DeviceModelTypeEnum.Struct, DeviceModelTypeEnum.String] as any
  ).includes(type);
};

const Device: React.FC<DeviceDetailType> = (props) => {
  const { id, productId, onChange } = props;

  const [deviceData, setDeviceData] = useState<DeviceDataType>();
  const openSubscribe = useMemo(
    () => !!deviceData && deviceData?.status !== OnlineStatusEnum.Offline,
    [deviceData],
  );
  const realTimeData = useSubscribe(id, openSubscribe);
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

  const extral = (
    <Button
      deviceId={id}
      title={collectionInfo.title}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  const getDetailByProps = useCallback(
    (data: DevicePropsType[], parentField = '') => {
      const items: DetailItem[] = [];
      const tabItems: TabsProps['items'] = [];
      data?.forEach?.((item) => {
        const field = parentField ? parentField + '.' + item?.id : item?.id;
        if (item?.dataType?.type == DeviceModelTypeEnum.Struct) {
          const child = parseToArray(item?.dataType?.specs);
          const result = getDetailByProps(child, field);
          tabItems.push({
            key: field || Math.random() + '',
            label: item?.name,
            children: (
              <>
                {result.items?.length ? (
                  <Detail
                    items={result.items}
                    data={realTimeData}
                    extral={extral}
                    colon={false}
                    labelStyle={{ width: 140 }}
                    valueStyle={{ width: '40%' }}
                  />
                ) : (
                  <></>
                )}
                {result.tabItems?.length ? <Tabs items={result.tabItems} /> : <></>}
              </>
            ),
          });
        } else {
          items.push({
            label: item?.name,
            field: field || Math.random() + '',
            format: (value: string) => formatModelValue(value, modelMap[field || '']),
            showExtra: getShowExtral(modelMap[field || '']?.type),
          });
        }
      });
      return { items, tabItems };
    },
    [modelMap, realTimeData, extral],
  );

  useEffect(() => {
    const group: GroupItem[] = [];
    deviceGroupData?.properties?.forEach?.((item) => {
      const result = getDetailByProps(item?.properties || []);
      group.push({
        label: <Detail.Label title={item?.groupName} />,
        items: result.items,
        tabItems: result.tabItems,
      });
    });
    setDetailGroup(group);
  }, [deviceGroupData, modelMap, collectionInfo, realTimeData]);

  return (
    <>
      <Page
        className={styles.page}
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
