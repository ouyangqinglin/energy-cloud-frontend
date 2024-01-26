/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:51:31
 * @LastEditTime: 2024-01-23 17:12:25
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Detail\index.tsx
 */
import React, { cloneElement, useMemo } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { isEmpty } from '@/utils';
import { ProFormColumnsType } from '@ant-design/pro-components';

export type DetailItem = {
  className?: string;
  title?: React.ReactNode;
  label?: React.ReactNode;
  dataIndex?: any;
  field?: string;
  showPlaceholder?: boolean;
  valueInterceptor?: (value: any, data?: any) => any;
  format?: (value: any, data?: any) => React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  valueStyle?: React.CSSProperties;
  show?: boolean | ((value: any, data?: any) => boolean);
  showExtra?: boolean;
  unit?: string;
  [key: string]: any;
};

export type FormAndDetailType = ProFormColumnsType & DetailItem;

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
      let fieldValue = data[(item?.field ?? item?.dataIndex) || ''];
      fieldValue = item?.valueInterceptor?.(fieldValue, data) ?? fieldValue;
      let show;
      if (typeof item.show == 'function') {
        show = item?.show?.(fieldValue, data);
      } else {
        show = item.show;
      }
      if (show !== false) {
        let extralNode = <></>;
        if (extral) {
          extralNode = cloneElement(extral, {
            onClick: () => extral.props?.onClick?.(item, fieldValue, data),
          });
        }
        content.push(
          <Descriptions.Item
            className={item.className || ''}
            label={item.label ?? item.title}
            labelStyle={item.labelStyle}
            contentStyle={item.contentStyle}
            span={item.span || 1}
            key={item?.field ?? item?.dataIndex}
          >
            <div className="flex w-full detail-value">
              <span style={item.valueStyle || valueStyle}>
                {!isEmpty(fieldValue) || item.showPlaceholder === false
                  ? item.format
                    ? item.format(fieldValue ?? '', data)
                    : format
                    ? format(fieldValue ?? '', data)
                    : fieldValue ?? ''
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
