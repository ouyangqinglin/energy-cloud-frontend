import { StatisticCard } from '@ant-design/pro-components';
import { get } from 'lodash';
import { ElectricGenerateStatistic } from '../../type';
import { config } from './config';
import styles from './index.less';

const EnergyStatisticCard = ({ data = {} }: { data: ElectricGenerateStatistic }) => {
  return (
    // <></>
    <StatisticCard.Group className={styles.cardGroupWrapper} direction={'row'} gutter={20}>
      {config.map((item) => {
        // const Icon = item.icon;
        return (
          <StatisticCard
            colSpan={3.5}
            bodyStyle={{ paddingRight: 0 }}
            className={styles.statisticCardWrapper}
            key={item.title}
            statistic={{
              title: item.title,
              value: item.value ? item.value(data) : get(data, item?.field) ?? 0,
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
