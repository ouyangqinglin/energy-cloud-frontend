/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-29 09:58:34
 * @LastEditTime: 2023-12-29 14:32:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Run\index.tsx
 */

import Button from '@/components/CollectionModal/Button';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import Meter from '@/components/Meter';
import { GridItemType } from '@/components/Meter/helper';
import { useAuthority } from '@/hooks';
import { DeviceDataType } from '@/services/equipment';
import {
  DeviceModelAuthorityType,
  DeviceModelDescribeType,
  DeviceModelType,
  DeviceServiceModelType,
} from '@/types/device';
import {
  DeviceModelDescribeTypeEnum,
  DeviceModelShowTypeEnum,
  formatModelValue,
  getPropsFromTree,
} from '@/utils';
import { Empty, Spin } from 'antd';
import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react';

export type RunType = {
  deviceData?: DeviceDataType;
  realTimeData?: Record<string, any>;
  groupData?: DeviceModelDescribeType[];
  modelMap?: Record<string, DeviceModelType>;
};

const Run: React.FC<RunType> = (props) => {
  const { deviceData, realTimeData, groupData, modelMap } = props;

  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
  });

  const components = useMemo<
    Record<string, React.LazyExoticComponent<React.ComponentType<any>>>
  >(() => {
    const ids = getPropsFromTree(
      groupData,
      'id',
      'children',
      (item) => item.type == DeviceModelDescribeTypeEnum.Component,
    );
    return ids.reduce((result, item) => {
      return {
        ...result,
        [item]: lazy(() => import('@/components/Device/module/' + item)),
      };
    }, {});
  }, [groupData]);

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
      deviceId={deviceData?.deviceId}
      title={collectionInfo.title}
      collection={collectionInfo.collection}
      model={modelMap?.[collectionInfo.collection]}
      onClick={onClick}
    />
  );

  const authorityCodes = useMemo(() => {
    const result: string[] = [];
    const authoritys = getPropsFromTree<DeviceModelDescribeType, DeviceModelAuthorityType[]>(
      groupData,
      'authority',
    );
    authoritys?.forEach?.((item) => {
      item?.forEach?.((child) => {
        if (child.detail) {
          result.push(child.detail);
        }
      });
    });
    return result;
  }, [groupData]);

  const { authorityMap } = useAuthority(authorityCodes);

  const passAuthority = useCallback(
    (authoritys?: DeviceModelAuthorityType[]) => {
      const codes: string[] = [];
      authoritys?.forEach?.((item) => {
        if (item?.detail) {
          codes.push(item.detail);
        }
      });
      const passCodes = codes?.some?.((item) => authorityMap.get(item));
      if (!codes?.length || passCodes) {
        return true;
      } else {
        return false;
      }
    },
    [authorityMap],
  );

  const getDetailItems = useCallback((service: DeviceServiceModelType[]) => {
    const result: DetailItem[] = [];
    service?.forEach?.((item) => {
      result.push?.({
        field: item?.id || '',
        label: item?.name,
        format: (value) => formatModelValue(value, item?.dataType || {}),
      });
    });
    return result;
  }, []);

  const getGridComponent = useCallback(
    (group?: DeviceModelDescribeType[], columns = 5) => {
      const grid: GridItemType[] = [];
      group?.forEach?.((item) => {
        if (passAuthority(item?.authority)) {
          grid.push({
            title: item?.name,
            icon: item?.icon,
            width: 100 / columns + '%',
            item: item?.children?.map?.((child) => ({
              label: child?.name,
              field: child?.id,
            })),
          });
        }
      });
      return (data: any) => (
        <Meter
          items={grid}
          data={data}
          detailProps={{
            extral,
            colon: false,
            valueStyle: { flex: 1, textAlign: 'right' },
          }}
        />
      );
    },
    [passAuthority],
  );

  const getGroupItems = useCallback(
    (modelDescribeItem: DeviceModelDescribeType) => {
      const result: GroupItem[] = [];
      switch (modelDescribeItem.type) {
        case DeviceModelDescribeTypeEnum.Group:
          if (passAuthority(modelDescribeItem?.authority)) {
            result.push({
              label: <Detail.Label title={modelDescribeItem.name} />,
            });
            if (modelDescribeItem.showType == DeviceModelShowTypeEnum.Grid) {
              result.push({
                component: getGridComponent(modelDescribeItem.children, modelDescribeItem?.columns),
              });
            } else {
              if (modelDescribeItem?.children?.[0]?.type == DeviceModelDescribeTypeEnum.Property) {
                result.push({
                  items: getDetailItems(modelDescribeItem?.children),
                });
              } else {
                modelDescribeItem?.children?.forEach?.((item) => {
                  if (passAuthority(item?.authority)) {
                    result.push(...getGroupItems(item));
                  }
                });
              }
            }
          }
          break;
        case DeviceModelDescribeTypeEnum.Tab:
          const tabItems: GroupItem['tabItems'] = [];
          modelDescribeItem?.children?.forEach?.((item) => {
            if (passAuthority(item?.authority)) {
              if (item?.type == DeviceModelDescribeTypeEnum.TabItem) {
                const tabGroupItems: GroupItem[] = [];
                (item as DeviceModelDescribeType)?.children?.forEach?.((tabGroupItem) => {
                  tabGroupItems.push(...getGroupItems(tabGroupItem));
                });
                tabItems.push({
                  key: item.id || '',
                  label: item.name,
                  groupItems: tabGroupItems,
                });
              }
            }
          });
          result.push({
            tabItems,
          });
          break;
        case DeviceModelDescribeTypeEnum.Component:
          if (modelDescribeItem.id) {
            const Component = components[modelDescribeItem.id];
            result.push({
              component: (
                <Suspense
                  fallback={
                    <div className="tx-center">
                      <Spin />
                    </div>
                  }
                >
                  <Component deviceId={deviceData?.deviceId} />
                </Suspense>
              ),
            });
          }
          break;
        default:
      }
      return result;
    },
    [realTimeData, deviceData, getDetailItems, passAuthority, getGridComponent, components],
  );

  const groupsItems = useMemo(() => {
    const result: GroupItem[] = [];
    groupData?.forEach?.((item) => {
      result.push(...getGroupItems(item));
    });
    return result;
  }, [groupData, getGroupItems, realTimeData, authorityMap]);

  return (
    <>
      {groupsItems.length ? (
        <Detail.Group
          data={realTimeData}
          items={groupsItems}
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
