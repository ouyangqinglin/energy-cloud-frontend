import Cell from '@/pages/screen/components/LayoutCell';
import type { FC } from 'react';
import styles from './index.module.less';

const EnergyFlow: FC = () => {
  const anchors = [
    {
      top: 187.940396,
      left: 0,
    },
    {
      top: 187.940396,
      left: 0,
    },
  ];

  return (
    <Cell width={684} height={332} left={640} top={372}>
      <div className={styles.wrapper}>
        {anchors.map((anchor) => {
          return (
            <div key={anchor.top} className={styles.featureBox} style={anchor}>
              <div className={styles.circle} />
              <div className={styles.circle1} />
              <div className={styles.circle2} />
            </div>
          );
        })}
      </div>
    </Cell>
  );
};

export default EnergyFlow;
