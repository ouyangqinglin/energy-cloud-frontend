/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:51:31
 * @LastEditTime: 2023-07-19 09:51:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Detail\Detail.tsx
 */
import React, { cloneElement, useMemo } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { isEmpty } from '@/utils';

export type DetailItem = {
  label: React.ReactNode;
  field: string;
  format?: (value: any, data?: any) => React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  show?: boolean;
};

export type DetailProps = DescriptionsProps & {
  items: DetailItem[];
  data: any;
  format?: (value: any, data?: any) => React.ReactNode;
  extral?: React.ReactElement;
  valueStyle?: React.CSSProperties;
};

const Detail: React.FC<DetailProps> = (props) => {
  const {
    items,
    column = 3,
    labelStyle = {},
    contentStyle = {},
    colon = true,
    format,
    extral,
    valueStyle,
    ...restProps
  } = props;

  const data = useMemo(() => {
    return props?.data || {};
  }, [props?.data]);

  const descriptionItems = useMemo(() => {
    const content: React.ReactNode[] = [];
    items.forEach((item) => {
      if (item.show !== false) {
        let extralNode = <></>;
        if (extral) {
          extralNode = cloneElement(extral, {
            onClick: () => extral.props?.onClick?.(item, data[item.field]),
          });
        }
        content.push(
          <Descriptions.Item
            label={item.label}
            labelStyle={item.labelStyle}
            contentStyle={item.contentStyle}
            span={item.span || 1}
            key={item.field}
          >
            <div className="flex w-full">
              <span style={item.valueStyle || valueStyle}>
                {!isEmpty(data[item.field])
                  ? item.format
                    ? item.format(data[item.field] ?? '', data)
                    : format
                    ? format(data[item.field] ?? '', data)
                    : data[item.field] ?? ''
                  : '--'}
              </span>
              {extralNode}
            </div>
          </Descriptions.Item>,
        );
      }
    });
    return content;
  }, [items, contentStyle, valueStyle, data, extral]);

  return (
    <Descriptions
      column={column}
      labelStyle={labelStyle}
      contentStyle={contentStyle}
      colon={colon}
      {...restProps}
    >
      {descriptionItems}
    </Descriptions>
  );
};

export default Detail;
