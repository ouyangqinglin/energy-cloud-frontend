/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:55:22
 * @LastEditTime: 2023-07-18 11:55:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Group.tsx
 */
import React, { useMemo } from 'react';
import Detail, { DetailItem, DetailProps } from './Detail';

export type GroupItem = {
  label?: React.ReactNode;
  items: DetailItem[];
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
          <Detail
            className="mb16"
            key={index}
            data={data}
            items={item.items}
            {...(detailProps || {})}
          />
        </>
      );
    });
  }, [data, items, detailProps]);

  return <>{details}</>;
};

export default Group;
