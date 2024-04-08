/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-18 11:51:31
 * @LastEditTime: 2024-04-02 16:55:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Detail\Detail\index.tsx
 */
import React, { cloneElement, memo, useMemo } from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { isEmpty } from '@/utils';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import styles from './index.less';

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
  unit?: React.ReactNode;
  extral?: React.ReactElement;
  [key: string]: any;
};

export type FormAndDetailType = ProFormColumnsType & DetailItem;

export type DetailProps = DescriptionsProps & {
  className?: string;
  items: DetailItem[];
  data: any;
  format?: (value: any, data?: any) => React.ReactNode;
  extral?: React.ReactElement;
  valueStyle?: React.CSSProperties;
  unitInLabel?: boolean;
};

const Detail: React.FC<DetailProps> = (props) => {
  const {
    className = '',
    items,
    column = 3,
    labelStyle = {},
    contentStyle = {},
    colon = true,
    format,
    extral,
    valueStyle = {},
    unitInLabel = false,
    ...restProps
  } = props;

  const data = useMemo(() => {
    return props?.data || {};
  }, [props?.data]);

  const descriptionItems = useMemo(() => {
    const content: React.ReactNode[] = [];
    items.forEach((item) => {
      let fieldValue = data[(item?.field ?? item?.dataIndex) || ''];
      if (item?.valueInterceptor) {
        fieldValue = item?.valueInterceptor?.(fieldValue, data);
      }
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
        const value =
          !isEmpty(fieldValue) || item.showPlaceholder === false
            ? item.format
              ? item.format(fieldValue ?? '', data)
              : format
              ? format(fieldValue ?? '', data)
              : fieldValue ?? ''
            : '--';
        content.push(
          <Descriptions.Item
            className={item.className || ''}
            label={
              <>
                <span className={styles.label} title={(item.label ?? item.title) as string}>
                  {item.label ?? item.title}
                </span>
                {unitInLabel && (item?.unit ? `(${item?.unit})` : '')}
              </>
            }
            labelStyle={item.labelStyle}
            contentStyle={item.contentStyle}
            span={item.span || 1}
            key={item?.field ?? item?.dataIndex}
          >
            <div className="flex w-full detail-value">
              <span
                className={styles.value}
                style={item.valueStyle || valueStyle}
                title={['function', 'object', 'symbol'].includes(typeof value) ? undefined : value}
              >
                {value}
              </span>
              {!unitInLabel && <span>{item.unit || ''}</span>}
              {item.extral}
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
      className={`${styles.detail} ${className}`}
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

export default memo(Detail);
