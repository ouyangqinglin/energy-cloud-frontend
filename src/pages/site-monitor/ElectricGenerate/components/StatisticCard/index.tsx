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
        return (
          <StatisticCard
            colSpan={3.5}
            className={styles.statisticCardWrapper}
            key={item.title}
            statistic={{
              title: item.title + '  (' + item.unit + ')',
              // @ts-ignore
              value:
                data[item.field] !== null || data[item.field] !== undefined
                  ? typeof data[item.field] === 'number'
                    ? Number.isInteger(data[item.field])
                      ? data[item.field]
                      : data[item.field].toFixed(2)
                    : Number(data[item.field]).toFixed(2)
                  : 0,
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
