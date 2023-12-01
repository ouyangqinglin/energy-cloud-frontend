/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:51:31
 * @LastEditTime: 2023-11-16 14:17:33
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Detail\index.tsx
 */
import React, { cloneElement, useMemo } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { isEmpty } from '@/utils';

export type DetailItem = {
  className?: string;
  label: React.ReactNode;
  field: string;
  format?: (value: any, data?: any) => React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  show?: boolean;
  showExtra?: boolean;
  unit?: string;
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
            onClick: () => extral.props?.onClick?.(item, data[item.field], data),
          });
        }
        content.push(
          <Descriptions.Item
            className={item.className || ''}
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
              <span>{item.unit || ''}</span>
              {item.showExtra !== false && extralNode}
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
