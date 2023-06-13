import type { CSSProperties, FC, ReactNode } from 'react';
import { useMemo } from 'react';
import styles from './index.less';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { isNumber, isNaN, merge } from 'lodash';

TweenOne.plugins.push(Children);

export type DigitalFlipperItemProps = {
  num?: string;
  title: string;
  floatLength?: number;
  comma?: boolean;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
  render?: (num: any) => string | ReactNode;
  unit?: string;
  titleStyle?: CSSProperties;
  numStyle?: CSSProperties;
  unitStyle?: CSSProperties;
  itemStyleWrapper?: CSSProperties;
};

const DigitalFlipperItem: FC<DigitalFlipperItemProps> = ({
  num,
  itemStyleWrapper = {},
  numStyle = {},
  titleStyle = {},
  title,
  comma = false,
  floatLength = 0,
  unit,
  unitStyle = {},
  render,
  prefix,
  suffix,
}) => {
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
    <div className={styles.wrapper} style={itemStyleWrapper}>
      <div className={styles.title} style={titleStyle}>
        {title}
      </div>
      <div className={styles.content}>
        {prefix}
        {render ? (
          render(num)
        ) : (
          <div className={styles.number} style={numStyle}>
            {textNode()}
          </div>
        )}
        {unit && (
          <span className={styles.unit} style={unitStyle}>
            {unit}
          </span>
        )}
        {suffix}
      </div>
    </div>
  );
};
export default DigitalFlipperItem;
