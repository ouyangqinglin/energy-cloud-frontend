import type { CSSProperties, FC } from 'react';
import { useMemo } from 'react';
import styles from './index.less';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { isNumber, isNaN, merge } from 'lodash';
import { formatMessage } from '@/utils';

TweenOne.plugins.push(Children);

export type DigitalFlipperItemProps = {
  num: string | number;
  title: string;
  floatLength?: number;
  comma?: boolean;
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
  floatLength = 2,
  unit = formatMessage({ id: 'common.rmb', defaultMessage: '元' }),
  unitStyle = {},
}) => {
  const textNode = useMemo(() => {
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
  }, [num, floatLength, comma]);

  return (
    <div className={styles.wrapper} style={itemStyleWrapper}>
      <div className={styles.content}>
        <div className={styles.number} style={numStyle}>
          {textNode}
        </div>
        <span className={styles.unit} style={unitStyle}>
          {unit}
        </span>
      </div>
      <div className={styles.title} title={title} style={titleStyle}>
        {title}
      </div>
    </div>
  );
};
export default DigitalFlipperItem;
