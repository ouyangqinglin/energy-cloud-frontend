import { StatisticCard } from '@ant-design/pro-components';
import { ElectricGenerateStatistic } from '../../type';
import { config } from './config';
import styles from './index.less';

const imgStyle = {
  display: 'block',
  width: 20,
  height: 20,
};

const EnergyStatisticCard = ({ data = {} }: { data: ElectricGenerateStatistic }) => {
  return (
    <StatisticCard.Group className={styles.cardGroupWrapper} direction={'row'}>
      {config.map((item) => {
        const Icon = item.icon;
        return (
          <StatisticCard
            colSpan={3.5}
            className={styles.statisticCardWrapper}
            key={item.title}
            statistic={{
              title: item.title,
              value: data[item.field] ?? 0,
              icon: <Icon style={imgStyle} />,
              suffix: <span className={styles.unit}>{item.unit}</span>,
            }}
          />
        );
      })}
    </StatisticCard.Group>
  );
};

export default EnergyStatisticCard;
