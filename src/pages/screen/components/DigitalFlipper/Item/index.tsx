import type { CSSProperties, FC } from 'react';
import styles from './index.less';

export type DigitalFlipperItemProps = {
  num: string;
  title: string;
  comma?: boolean;
  unit?: string;
  titleStyle?: CSSProperties;
  numStyle?: CSSProperties;
  unitStyle?: CSSProperties;
  itemStyleWrapper?: CSSProperties;
};

const formatter = (num: string) => {
  const numbers = num.toString().split('').reverse();
  const segs = [];
  while (numbers.length) segs.push(numbers.splice(0, 3).join(''));
  return segs.join(',').split('').reverse().join('');
};

const DigitalFlipperItem: FC<DigitalFlipperItemProps> = ({
  num,
  itemStyleWrapper = {},
  numStyle = {},
  titleStyle = {},
  title,
  comma,
  unit = '元',
  unitStyle = {},
}) => {
  // const config = {
  //   number: [num],
  //   style: {
  //     fontSize: '32px',
  //     // fill: '#fff',
  //     // linear-gradient(180deg, #FFFFFF 0%, #A2D3FF 67%, #4DABFF 100%)
  //     gradientWith: 'stroke',
  //     gradientColor: ['#FFFFFF', '#A2D3FF', '#4DABFF'],
  //     gradientParams: [0, 100, 50, 100],
  //     gradientType: 'linear',
  //     gradientStops: [0, 0.67, 1],
  //   },
  //   formatter,
  // };

  // return <DigitalFlop config={config} style={{ width: '200px', height: '50px' }} />;
  return (
    <div className={styles.wrapper} style={itemStyleWrapper}>
      <div className={styles.title} style={titleStyle}>
        {title}
      </div>
      <div className={styles.content}>
        <div className={styles.number} style={numStyle}>
          {comma ? formatter(num) : num}
        </div>
        <span className={styles.unit} style={unitStyle}>
          {unit}
        </span>
      </div>
    </div>
  );
};
export default DigitalFlipperItem;
