import { StatisticCard } from '@ant-design/pro-components';
import { config } from './config';
import styles from './index.less';

const imgStyle = {
  display: 'block',
  width: 42,
  height: 42,
};

const EnergyStatisticCard = () => {
  return (
    // <></>
    <StatisticCard.Group className={styles.cardGroupWrapper} direction={'row'} gutter={20}>
      {config.map((item) => {
        // const Icon = item.icon;
        return (
          <StatisticCard
            colSpan={4}
            className={styles.statisticCardWrapper}
            key={item.title}
            statistic={{
              title: item.title,
              value: item.value,
              // icon: <Icon style={imgStyle} />,
              // suffix: <span className={styles.unit}>{item.unit}</span>,
            }}
          />
        );
      })}
    </StatisticCard.Group>
  );
};

export default EnergyStatisticCard;
