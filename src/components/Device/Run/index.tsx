/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-29 09:58:34
 * @LastEditTime: 2024-03-29 16:52:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Run\index.tsx
 */

import React, { Suspense, lazy, useCallback, useMemo, useState } from 'react';
import Button from '@/components/CollectionModal/Button';
import Detail, { DetailItem, GroupItem } from '@/components/Detail';
import Meter from '@/components/Meter';
import { GridItemType } from '@/components/Meter/helper';
import { useAuthority, useSubscribe } from '@/hooks';
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
  isEmpty,
} from '@/utils';
import { Empty, Spin } from 'antd';
import * as interceptorFn from '../components/interceptor';
import styles from './index.less';
import { merge } from 'lodash';

export type RunType = {
  deviceData?: DeviceDataType;
  realTimeData?: Record<string, any>;
  groupData?: DeviceModelDescribeType[];
  modelMap?: Record<string, DeviceModelType>;
};

type interceptorDataType = {
  id: string;
  dataInterceptor: string;
  deviceId: string;
};

const Run: React.FC<RunType> = (props) => {
  const { deviceData, realTimeData, groupData, modelMap } = props;

  const [collectionInfo, setCollectionInfo] = useState({
    title: '',
    collection: '',
    originCollection: '',
    deviceId: '',
  });
  const extralDeviceIds = useMemo(() => {
    const result = getPropsFromTree(groupData, 'deviceId');
    return Array.from(new Set(result));
  }, [groupData]);
  const extralDeviceRealTimeData = useSubscribe(extralDeviceIds, true);

  const interceptor = useMemo(() => {
    return getPropsFromTree<DeviceModelDescribeType, interceptorDataType>(
      groupData,
      ['id', 'dataInterceptor', 'deviceId'],
      'children',
      (item) => !!item.dataInterceptor,
    );
  }, [groupData]);

  const interceptorData = useMemo(() => {
    const result: Record<string, any> = {};
    interceptor.forEach(({ id, dataInterceptor, deviceId }) => {
      const resultDeviceId = deviceId || deviceData?.deviceId;
      if (resultDeviceId) {
        result[resultDeviceId] = {
          ...result[resultDeviceId],
          ...(interceptorFn as any)?.[dataInterceptor]?.(id, realTimeData?.[deviceId]?.[id]),
        };
      }
    });
    return merge({}, realTimeData, result);
  }, [realTimeData, interceptor, deviceData?.deviceId]);

  const components = useMemo<
    Record<string, React.LazyExoticComponent<React.ComponentType<any>>>
  >(() => {
    const ids = getPropsFromTree(
      groupData,
      'id',
      'children',
      (item) =>
        item.type == DeviceModelDescribeTypeEnum.Component &&
        (item.id != 'ParallelMachine' || !isEmpty(deviceData?.masterSlaveMode)),
    );
    return ids.reduce((result, item) => {
      return {
        ...result,
        [item]: lazy(() => import('@/components/Device/module/' + item)),
      };
    }, {});
  }, [groupData, deviceData]);

  const onClick = useCallback((item: DetailItem) => {
    if (item?.field) {
      const fieldArr = item?.field?.split?.('.');
      setCollectionInfo({
        title: item.label as any,
        originCollection: item?.field,
        collection: item?.deviceId ? fieldArr[fieldArr.length - 1] : item.field,
        deviceId: item?.deviceId,
      });
    }
  }, []);

  const extral = useMemo(
    () => (
      <Button
        deviceId={collectionInfo.deviceId || deviceData?.deviceId}
        title={collectionInfo.title}
        collection={collectionInfo.collection}
        model={modelMap?.[collectionInfo.originCollection]}
        onClick={onClick}
        // eslint-disable-next-line react-hooks/exhaustive-deps
      />
    ),
    [collectionInfo],
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

  const getDetailItems = useCallback(
    (service: DeviceServiceModelType[]) => {
      const result: DetailItem[] = [];
      service?.forEach?.((item, index) => {
        if (item.showType == DeviceModelShowTypeEnum.Line) {
          result[result?.length - 1].span =
            4 - (result.reduce((sum, col) => sum + (col.span ?? 1), 0) % 3);
          result.push({
            className: styles.line,
            span: 3,
            showPlaceholder: false,
            showExtra: false,
          });
        } else if (item.showType != DeviceModelShowTypeEnum.HideName) {
          result.push({
            field: item?.id || '',
            label: item?.name,
            deviceId: item?.deviceId,
            valueInterceptor: (_, data) => {
              if (item?.deviceId) {
                const realField = item?.id?.split?.('.') || [];
                return data?.[item?.deviceId || '']?.[realField?.[realField?.length - 1]];
              } else {
                return data?.[deviceData?.deviceId || '']?.[item?.id || ''];
              }
            },
            format: (value) => formatModelValue(value, item?.dataType || {}),
          });
        }
      });
      if (result.length > 1) {
        result[result?.length - 1].span =
          4 - (result.reduce((sum, item) => sum + (item.span ?? 1), 0) % 3);
      }
      return result;
    },
    [deviceData?.deviceId],
  );

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
    [passAuthority, extral],
  );

  const getGroupItems = useCallback(
    (modelDescribeItem: DeviceModelDescribeType) => {
      const result: GroupItem[] = [];
      switch (modelDescribeItem.type) {
        case DeviceModelDescribeTypeEnum.Group:
        case DeviceModelDescribeTypeEnum.PropertyGroup:
          if (passAuthority(modelDescribeItem?.authority)) {
            if (modelDescribeItem.showType != DeviceModelShowTypeEnum.HideName) {
              result.push({
                label: <Detail.Label title={modelDescribeItem.name} />,
              });
            }
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
            !!Component &&
              result.push({
                component: (data) => (
                  <Suspense
                    fallback={
                      <div className="tx-center">
                        <Spin />
                      </div>
                    }
                  >
                    <Component deviceId={deviceData?.deviceId} realTimeData={data} />
                  </Suspense>
                ),
              });
          }
          break;
        default:
      }
      return result;
    },
    [deviceData, getDetailItems, passAuthority, getGridComponent, components],
  );

  const groupsItems = useMemo(() => {
    const result: GroupItem[] = [];
    groupData?.forEach?.((item) => {
      result.push(...getGroupItems(item));
    });
    return result;
  }, [groupData, getGroupItems, authorityMap, collectionInfo]);

  return (
    <>
      {groupsItems.length ? (
        <Detail.Group
          data={{ ...interceptorData, ...extralDeviceRealTimeData }}
          items={groupsItems}
          detailProps={{
            extral,
            labelStyle: { width: 140 },
            contentStyle: { width: 50 },
          }}
        />
      ) : (
        <Empty className="mt20" />
      )}
    </>
  );
};

export default Run;
