/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 10:34:31
 * @LastEditTime: 2023-12-14 10:13:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\DigitStat\index.tsx
 */
import React, { memo, useMemo } from 'react';
import { Col, Row } from 'antd';
import './index.less';
import TweenOne, { AnimObjectOrArray } from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { isEmpty } from '@/utils';
import { merge } from 'lodash';
import { formatNum, ValueUnitType } from '@/utils';

TweenOne.plugins.push(Children);

export type DigitStatItemType = {
  icon?: string;
  title?: string;
  field?: string;
  unit?: string;
  items?: DigitStatItemType[];
  fields?: DigitStatItemType[];
  valueStyle?: React.CSSProperties;
  animation?: AnimObjectOrArray;
  isformatNum?: boolean;
  format?: (value: number) => ValueUnitType;
};

export type DigitStatProps = {
  className?: string;
  items: DigitStatItemType[];
  span?: number;
  data?: Record<string, any>;
  unitLinkValue?: boolean;
};

const animation = {
  Children: { floatLength: 0 },
  duration: 1000,
  delay: 300,
};

const getContentByItem = (
  item: DigitStatItemType,
  data?: Record<string, any>,
  unitLinkValue?: boolean,
  index?: number,
) => {
  let itemValue;
  const formatValue = (item.format || formatNum)(data?.[item.field || '']);
  if (isEmpty(data?.[item.field || ''])) {
    itemValue = '--';
  } else {
    itemValue = (
      <TweenOne
        className="digit-stat-num-value"
        animation={merge({}, animation, { Children: { value: formatValue.value } }, item.animation)}
      />
    );
  }
  return (
    <>
      {item.icon ? <img src={item.icon} key={item.field || index} /> : ''}
      <div className="digit-stat-content flex1" key={'digit' + (item.field || index)}>
        <div className="digit-stat-title">
          <span title={item.title}>{item.title}</span>
          {unitLinkValue ? '' : `(${formatValue.unit}${item.unit})`}
        </div>
        {item.fields ? (
          item.fields?.map?.((child, childIndex) => {
            let childValue;
            const childFormatValue = (child.format || formatNum)(data?.[child.field || '']);
            if (isEmpty(data?.[child.field || ''])) {
              childValue = '--';
            } else {
              childValue = (
                <TweenOne
                  className="digit-stat-num-value"
                  animation={merge(
                    {},
                    animation,
                    { Children: { value: childFormatValue.value } },
                    child.animation,
                  )}
                />
              );
            }
            return (
              <span key={child.field} className="digit-stat-num" style={item.valueStyle}>
                {childValue}
                {unitLinkValue ? (
                  <span className="digit-stat-unit">{childFormatValue.unit + child.unit}</span>
                ) : (
                  ''
                )}
                <span className="digit-stat-separate">{childIndex ? '' : '/'}</span>
              </span>
            );
          })
        ) : (
          <span className="digit-stat-num" style={item.valueStyle}>
            {itemValue}
            {unitLinkValue ? (
              <span className="digit-stat-unit">{formatValue.unit + item.unit}</span>
            ) : (
              ''
            )}
          </span>
        )}
      </div>
    </>
  );
};

const DigitStat: React.FC<DigitStatProps> = memo((props) => {
  const { span = 24, items, data, unitLinkValue = true, className } = props;

  const cols = useMemo(() => {
    return items?.map?.((item, index) => {
      return (
        <Col span={span} key={item.field || index}>
          <div className="flex digit-stat-wrap">
            {item.items
              ? item.items?.map?.((child, childIndex) => {
                  const content = getContentByItem(child, data, unitLinkValue, childIndex);
                  return [
                    childIndex ? (
                      <span key={childIndex} className="digit-stat-separator"></span>
                    ) : (
                      <></>
                    ),
                    content,
                  ];
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
