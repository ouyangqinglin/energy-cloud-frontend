import type { FC } from 'react';
import { DigitalFlop } from '@jiaminghi/data-view-react';
import styles from './index.less';

export type DigitalFlipperItemProps = {
  num: number;
  title: string;
  unit?: string;
};

const formatter = (num: number[]) => {
  const numbers = num.toString().split('').reverse();
  const segs = [];
  while (numbers.length) segs.push(numbers.splice(0, 3).join(''));
  return segs.join(',').split('').reverse().join('');
};

const DigitalFlipperItem: FC<DigitalFlipperItemProps> = ({ num, title, unit = '元' }) => {
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
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        <div className={styles.number}>{formatter([num])}</div>
        <span className={styles.unit}>{unit}</span>
      </div>
    </div>
  );
};
export default DigitalFlipperItem;
