/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:55:22
 * @LastEditTime: 2023-08-10 16:03:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Group.tsx
 */
import React, { useMemo } from 'react';
import Detail, { DetailItem, DetailProps } from './Detail';
import { Tabs, TabsProps } from 'antd';

export type GroupItem = {
  label?: React.ReactNode;
  items?: DetailItem[];
  tabItems?: TabsProps['items'];
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
      return (
        <>
          {item.label}
          {item.items?.length ? (
            <Detail
              className="mb16"
              key={index}
              data={data}
              items={item.items}
              {...(detailProps || {})}
            />
          ) : (
            <></>
          )}
          {item?.tabItems?.length ? <Tabs className="mb16" items={item.tabItems} /> : <></>}
        </>
      );
    });
  }, [data, items, detailProps]);

  return <>{details}</>;
};

export default Group;
