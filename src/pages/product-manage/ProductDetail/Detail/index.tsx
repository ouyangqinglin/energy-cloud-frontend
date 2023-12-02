/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 14:46:46
 * @LastEditTime: 2023-08-22 13:35:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Detail\index.tsx
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import { Tabs, TabsProps } from 'antd';
import { detailItems, columns, CollectionDetailType } from './config';
import Detail from '@/components/Detail';
import { getData } from '../../Product/service';
import YTProTable from '@/components/YTProTable';
import { getCollection } from './service';
import { DevicePropsType } from '@/types/device';
import { DeviceModelTypeEnum } from '@/utils';

export type MyDetailProps = {
  id?: string;
};

const dealCollection = (data: DevicePropsType & CollectionDetailType) => {
  switch (data?.dataType?.type) {
    case DeviceModelTypeEnum.Int:
    case DeviceModelTypeEnum.Long:
    case DeviceModelTypeEnum.Double:
      data.value = data?.dataType?.specs?.min + '~' + data?.dataType?.specs?.max;
      data.unit = data?.dataType?.specs?.unit;
      break;
    case DeviceModelTypeEnum.Boolean:
    case DeviceModelTypeEnum.Enum:
      try {
        const values: string[] = [];
        for (const key in data?.dataType?.specs) {
          values.push(data?.dataType?.specs?.[key]);
        }
        data.value = values.join(',');
      } catch {}
      break;
    default:
  }
  data.type = data?.dataType?.type;
};

const MyDetail: React.FC<MyDetailProps> = (props) => {
  const { id } = props;

  const [activeTab, setActiveTab] = useState('properties');
  const { data: detailData, run } = useRequest(getData, {
    manual: true,
  });
  const { data: collectionData, run: runGetCollection } = useRequest(getCollection, {
    manual: true,
    formatResult: ({ data }) => {
      data?.properties?.forEach?.((item) => {
        dealCollection(item as any);
      });
      return data;
    },
  });

  const tableData = useMemo(() => {
    return collectionData?.[activeTab];
  }, [collectionData, activeTab]);

  const onTabsChange = useCallback((key) => {
    setActiveTab(key);
  }, []);

  useEffect(() => {
    if (id) {
      run(id);
      runGetCollection(id);
    }
  }, [id]);

  const items: TabsProps['items'] = [
    {
      key: 'properties',
      label: '属性',
    },
    {
      key: 'events',
      label: '事件',
    },
    {
      key: 'services',
      label: '服务',
    },
  ];

  return (
    <>
      <Detail className="p24" items={detailItems} data={detailData} column={4} />
      <Tabs
        activeKey={activeTab}
        className="page-tabs"
        tabBarGutter={34}
        items={items}
        onChange={onTabsChange}
      />
      <YTProTable
        className="p24"
        toolBarRender={false}
        columns={columns}
        dataSource={tableData}
        search={false}
        pagination={false}
      />
    </>
  );
};

export default MyDetail;
