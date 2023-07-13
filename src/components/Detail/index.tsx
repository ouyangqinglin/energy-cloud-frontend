/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 11:33:11
 * @LastEditTime: 2023-06-05 15:18:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\index.tsx
 */
import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { isEmpty } from '@/utils';

export type DetailItem = {
  label: React.ReactNode;
  field: string;
  format?: (value: any, data?: any) => React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  show?: boolean;
};

export type DetailProps = DescriptionsProps & {
  items: DetailItem[];
  data: any;
  format?: (value: any, data?: any) => React.ReactNode;
};

const Detail: React.FC<DetailProps> = (props) => {
  const {
    items,
    column = 3,
    labelStyle = {},
    contentStyle = {},
    colon = true,
    format,
    ...restProps
  } = props;

  const data = props?.data || {};

  const content: React.ReactNode[] = [];
  items.forEach((item) => {
    if (item.show !== false) {
      content.push(
        <Descriptions.Item
          label={item.label}
          labelStyle={item.labelStyle}
          contentStyle={contentStyle}
          span={item.span || 1}
          key={item.field}
        >
          {!isEmpty(data[item.field])
            ? item.format
              ? item.format(data[item.field] ?? '', data)
              : format
              ? format(data[item.field] ?? '', data)
              : data[item.field] ?? ''
            : '--'}
        </Descriptions.Item>,
      );
    }
  });

  return (
    <Descriptions
      column={column}
      labelStyle={labelStyle}
      contentStyle={contentStyle}
      colon={colon}
      {...restProps}
    >
      {content}
    </Descriptions>
  );
};

export default Detail;
