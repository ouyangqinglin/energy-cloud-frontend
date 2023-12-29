/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-10 09:34:45
 * @LastEditTime: 2023-12-28 10:03:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceRealTime\Device\Run\index.tsx
 */
import React, { useState, useCallback, useEffect, Suspense, lazy } from 'react';
import { Spin, Tabs, TabsProps } from 'antd';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import Button from '@/components/CollectionModal/Button';
import { formatModelValue, parseToArray } from '@/utils';
import { DeviceModelDataType, DeviceModelType, DevicePropsType } from '@/types/device';
import { DeviceModelTypeEnum } from '@/utils';
import Empty from 'antd/es/empty';

const getShowExtral = (type?: DeviceModelTypeEnum) => {
  return !(
    [DeviceModelTypeEnum.Array, DeviceModelTypeEnum.Struct, DeviceModelTypeEnum.String] as any
  ).includes(type);
};

export type RunProps = {
  deviceId?: string;
  realTimeData?: Record<string, any>;
  groupData?: DeviceModelDataType;
  modelMap?: Record<string, DeviceModelType>;
};

const Run: React.FC<RunProps> = (props) => {
  const { deviceId, realTimeData, groupData, modelMap } = props;

  const [detailGroup, setDetailGroup] = useState<GroupItem[]>([]);
  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const onClick = useCallback((item: DetailItem) => {
    if (item.field) {
      setCollectionInfo({
        title: item.label as any,
        collection: item.field,
      });
    }
  }, []);

  const extral = (
    <Button
      deviceId={deviceId}
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
            format: (value: string) => formatModelValue(value, modelMap?.[field || ''] || {}),
            showExtra: getShowExtral(modelMap?.[field || '']?.type),
          });
        }
      });
      return { items, tabItems };
    },
    [modelMap, realTimeData, extral],
  );

  useEffect(() => {
    const group: GroupItem[] = [];
    groupData?.properties?.forEach?.((item) => {
      if (item.component) {
        const Component = lazy(() => import('@/components/Device/module/' + item.component));
        group.push({
          component: (
            <Suspense
              fallback={
                <div className="tx-center">
                  <Spin />
                </div>
              }
            >
              <Component deviceId={deviceId} />
            </Suspense>
          ),
        });
      } else {
        const result = getDetailByProps(item?.properties || []);
        if (result.items && result.items.length > 1) {
          result.items[result.items.length - 1].span = 4 - (result.items.length % 3);
        }
        group.push({
          label: <Detail.Label title={item?.groupName} />,
          items: result.items,
          tabItems: result.tabItems,
        });
      }
    });
    setDetailGroup(group);
  }, [groupData, modelMap, collectionInfo, realTimeData]);

  return (
    <>
      {detailGroup.length ? (
        <Detail.Group
          data={realTimeData}
          items={detailGroup}
          detailProps={{
            extral,
            colon: false,
            labelStyle: { width: 140 },
          }}
        />
      ) : (
        <Empty />
      )}
    </>
  );
};

export default Run;
