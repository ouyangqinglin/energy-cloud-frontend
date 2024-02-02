import type { CSSProperties, FC, ReactNode } from 'react';
import { useMemo } from 'react';
import styles from './index.less';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { isNumber, isNaN, merge, isNil } from 'lodash';
import classnames from 'classnames';

TweenOne.plugins.push(Children);

export type DigitalFlipperItemProps<Data = any> = {
  num?: string;
  title: string;
  floatLength?: number;
  comma?: boolean;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  render?: (num: any, entity: Data) => ReactNode;
  data?: Record<string, any>;
  unit?: string;
  field?: string;
  format?: (value: number | string) => any;
  titleStyle?: CSSProperties;
  titleClassName?: string;
  numStyle?: CSSProperties;
  numClassName?: string;
  unitStyle?: CSSProperties;
  unitClassName?: string;
  itemStyleWrapper?: CSSProperties;
  itemClassNameWrapper?: string;
};

const DigitalFlipperItem: FC<DigitalFlipperItemProps> = ({
  num: rawNum,
  format,
  itemStyleWrapper = {},
  itemClassNameWrapper = '',
  numStyle = {},
  numClassName = '',
  titleStyle = {},
  titleClassName = '',
  title,
  comma = false,
  floatLength = 0,
  unit,
  unitStyle = {},
  unitClassName = '',
  render,
  prefix,
  suffix,
  field = '',
  data = {},
}) => {
  let num = isNil(rawNum) ? data?.[field] : rawNum;
  num = format ? format(num) : num;
  const textNode = () => {
    const digital = Number(num);
    if (isNumber(digital) && !isNaN(digital)) {
      const animation = {
        Children: { value: digital as number, floatLength },
        duration: 1000,
        delay: 300,
      };
      if (comma) {
        merge(animation, { Children: { formatMoney: true } });
      }
      return <TweenOne animation={animation} />;
    }
    return <span>{'--'}</span>;
  };

  return (
    <div className={classnames([styles.wrapper, itemClassNameWrapper])} style={itemStyleWrapper}>
      <div title={title} className={classnames([styles.title, titleClassName])} style={titleStyle}>
        {title}
      </div>
      <div className={classnames([styles.content])}>
        {prefix}
        {render ? (
          render(num, data)
        ) : (
          <div className={classnames([styles.number, numClassName])} style={numStyle}>
            {textNode()}
          </div>
        )}
        {unit && (
          <span className={classnames([styles.unit, unitClassName])} style={unitStyle}>
            {unit}
          </span>
        )}
        {suffix}
      </div>
    </div>
  );
};
export default DigitalFlipperItem;
