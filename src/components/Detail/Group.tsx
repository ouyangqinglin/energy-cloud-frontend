/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:55:22
 * @LastEditTime: 2024-01-03 11:21:09
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Group.tsx
 */
import React, { useMemo } from 'react';
import Detail, { DetailItem, DetailProps } from './Detail';
import { Tabs, TabsProps } from 'antd';

export type GroupItem = {
  label?: React.ReactNode;
  items?: DetailItem[];
  className?: string;
  tabItems?: (Required<TabsProps>['items'][number] & {
    groupItems?: GroupItem[];
  })[];
  component?: React.ReactNode | ((data?: Record<string, any>) => React.ReactNode);
};

export type GroupProps = {
  data?: Record<string, any>;
  items: GroupItem[];
  detailProps?: Omit<DetailProps, 'items' | 'data'>;
};

const Group: React.FC<GroupProps> = (props) => {
  const { data, items, detailProps } = props;

  const details = useMemo(() => {
    return items?.map?.((item, index) => {
      return item?.component ? (
        typeof item?.component == 'function' ? (
          item?.component?.(data)
        ) : (
          item?.component
        )
      ) : (
        <>
          {item.label}
          {!!item.items?.length && (
            <Detail
              className={`mb16 ${item?.className || ''}`}
              key={index}
              data={data}
              items={item.items}
              {...(detailProps || {})}
            />
          )}
          {!!item?.tabItems?.length && (
            <Tabs
              className="mb16"
              items={item.tabItems?.map?.((tabItem) => {
                if (tabItem?.groupItems && tabItem?.groupItems?.length) {
                  tabItem.children = <Group data={data} items={tabItem?.groupItems} />;
                }
                return tabItem;
              })}
            />
          )}
        </>
      );
    });
  }, [data, items, detailProps]);

  return <>{details}</>;
};

export default Group;
