/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-26 11:33:11
 * @LastEditTime: 2023-04-26 14:18:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\index.tsx
 */
import React from 'react';
import { Descriptions } from 'antd';

export type DetailItem = {
  label: React.ReactNode;
  field: string;
  format?: (value: any) => React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
};

export type DetailProps = {
  items: DetailItem[];
  data: any;
  column?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
};

const Detail: React.FC<DetailProps> = (props) => {
  const { items, column = 3, labelStyle = {}, contentStyle = {}, data = {} } = props;

  const content = items.map((item) => {
    return (
      <Descriptions.Item
        label={item.label}
        labelStyle={item.labelStyle}
        contentStyle={contentStyle}
        span={item.span || 1}
      >
        {item.format ? item.format(data[item.field]) : data[item.field]}
      </Descriptions.Item>
    );
  });

  return (
    <Descriptions column={column} labelStyle={labelStyle} contentStyle={contentStyle}>
      {content}
    </Descriptions>
  );
};

export default Detail;
