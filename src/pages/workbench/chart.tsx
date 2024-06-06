/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-18 08:51:28
 * @LastEditTime: 2024-06-06 14:50:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\chart.tsx
 */

import SchemaForm from '@/components/SchemaForm';
import { ProFormInstance } from '@ant-design/pro-components';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { searchColumns } from './helper';
import CollectionChart from '@/components/CollectionModal/CollectionChart';
import { DeviceModelType } from '@/types/device';
import { CollectionDataType } from './typing';
import { getDeviceModel } from '@/services/equipment';
import { getModelByProps } from '@/utils';
import { useSubscribe } from '@/hooks';
import styles from './index.less';

export type ChartType = {
  date?: string[];
  siteId?: string;
  siteName?: string;
  deviceId?: string;
  deviceName?: string;
  collection?: string;
  collectionName?: string;
  productId?: string;
  onChange?: (value: CollectionDataType) => void;
};

const Chart: React.FC<ChartType> = (props) => {
  const {
    date,
    siteId,
    siteName,
    deviceId,
    deviceName,
    productId,
    collection,
    collectionName,
    onChange,
  } = props;
  const [collectionData, setCollectionData] = useState<CollectionDataType[]>([]);
  const formRef = useRef<ProFormInstance>(null);
  const [model, setModel] = useState<DeviceModelType>();
  const [chartDate, setChartDate] = useState<string[]>();
  const realTimeData = useSubscribe(deviceId, true);

  const onValuesChange = useCallback((_, values) => {
    setCollectionData(values['collection']);
    onChange?.(values['collection']?.[0]);
  }, []);

  useEffect(() => {
    if (collection && deviceId && collectionName) {
      const collectionValue: CollectionDataType[] = [
        {
          paramCode: collection,
          paramName: collectionName,
          tree: {
            siteId,
            siteName,
            id: deviceId,
            deviceName,
            productId,
          },
        },
      ];
      setCollectionData(collectionValue);
      formRef?.current?.setFieldValue('collection', collectionValue);
    }
  }, [siteId, siteName, deviceId, deviceName, productId, collection, collectionName]);

  useEffect(() => {
    if (collectionData?.[0]?.tree?.productId) {
      getDeviceModel({ productId: collectionData?.[0]?.tree?.productId }).then(({ data }) => {
        const result = getModelByProps(data?.properties || []);
        const collectionModel = result[collectionData?.[0]?.paramCode || ''];
        if (collectionModel) {
          setModel(collectionModel);
        }
      });
    }
  }, [collectionData]);

  useEffect(() => {
    setChartDate(date);
  }, [date]);

  useEffect(() => {
    if (realTimeData?.[collectionData?.[0]?.paramCode || '']) {
      setChartDate((prevData) => {
        return [...(prevData || [])];
      });
    }
  }, [realTimeData]);

  return (
    <>
      <SchemaForm
        className="mt12 pl10"
        formRef={formRef}
        columns={searchColumns}
        layout="horizontal"
        layoutType="Form"
        onValuesChange={onValuesChange}
        submitter={false}
        grid={true}
      />
      <CollectionChart
        title={collectionData?.[0]?.paramName}
        deviceId={collectionData?.[0]?.tree?.id}
        collection={collectionData?.[0]?.paramCode}
        model={model}
        date={chartDate}
        height={'100%'}
        containClassName={styles.contain}
      />
    </>
  );
};

export default Chart;
