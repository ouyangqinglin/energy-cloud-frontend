/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 10:34:31
 * @LastEditTime: 2023-08-23 18:55:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\DigitStat\index.tsx
 */
import React, { memo, useMemo } from 'react';
import { Col, Row } from 'antd';
import './index.less';

export type DigitStatItemType = {
  icon?: string;
  title?: string;
  field?: string;
  unit?: string;
  items?: DigitStatItemType[];
  fields?: DigitStatItemType[];
  valueStyle?: React.CSSProperties;
};

export type DigitStatProps = {
  className?: string;
  items: DigitStatItemType[];
  span?: number;
  data?: Record<string, any>;
  unitLinkValue?: boolean;
};

const getContentByItem = (
  item: DigitStatItemType,
  data?: Record<string, any>,
  unitLinkValue?: boolean,
) => {
  return (
    <>
      {item.icon ? <img src={item.icon} key={item.field} /> : ''}
      <div className="digit-stat-content flex1" key={'digit' + item.field}>
        <div className="digit-stat-title">
          {item.title}
          {unitLinkValue ? '' : `(${item.unit})`}
        </div>
        {item.fields ? (
          item.fields?.map?.((child, index) => {
            return (
              <span className="digit-stat-num" style={item.valueStyle}>
                {index ? '/' : ''}
                {data?.[child.field || ''] ?? '--'}
                {unitLinkValue ? <span className="digit-stat-unit">{child.unit}</span> : ''}
              </span>
            );
          })
        ) : (
          <span className="digit-stat-num" style={item.valueStyle}>
            {data?.[item.field || ''] ?? '--'}
            {unitLinkValue ? <span className="digit-stat-unit">{item.unit}</span> : ''}
          </span>
        )}
      </div>
    </>
  );
};

const DigitStat: React.FC<DigitStatProps> = memo((props) => {
  const { span = 24, items, data, unitLinkValue = true, className } = props;

  const cols = useMemo(() => {
    return items?.map?.((item) => {
      return (
        <Col span={span} key={item.field}>
          <div className="flex digit-stat-wrap">
            {item.items
              ? item.items?.map?.((child, index) => {
                  const content = getContentByItem(child, data, unitLinkValue);
                  return [index ? <span className="digit-stat-separator"></span> : <></>, content];
                })
              : getContentByItem(item, data, unitLinkValue)}
          </div>
        </Col>
      );
    });
  }, [items, data]);

  return (
    <>
      <Row className={className} gutter={16}>
        {cols}
      </Row>
    </>
  );
});

export default DigitStat;
