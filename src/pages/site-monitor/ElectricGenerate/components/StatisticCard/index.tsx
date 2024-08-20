import { StatisticCard } from '@ant-design/pro-components';
import { ElectricGenerateStatistic } from '../../type';
import { config } from './config';
import styles from './index.less';

const imgStyle = {
  display: 'block',
  width: 20,
  height: 20,
};

// @ts-ignore
const EnergyStatisticCard = ({ data = {} }: { data: ElectricGenerateStatistic }) => {
  return (
    <StatisticCard.Group className={styles.cardGroupWrapper} direction={'row'}>
      {config.map((item) => {
        const Icon = item.icon;

        let value = (data as Record<string, any>)[item?.field] ?? 0;
        if (
          ['number', 'string'].includes(typeof value) &&
          !Number.isNaN(value) &&
          value !== '' &&
          value !== 0
        ) {
          const decimalPart = value.toString().split('.')[1];
          const decimalPartLen = decimalPart ? decimalPart.length : 0;
          decimalPartLen > 2 ? (value = Number(value).toFixed(2).toString()) : (value = value);
        } else {
          value = '0';
        }

        return (
          <StatisticCard
            colSpan={3.5}
            className={styles.statisticCardWrapper}
            key={item.title}
            statistic={{
              title: item.title + '  (' + item.unit + ')',
              value: value,
              // @ts-ignore
              icon: <Icon style={imgStyle} />,
            }}
          />
        );
      })}
    </StatisticCard.Group>
  );
};

export default EnergyStatisticCard;
