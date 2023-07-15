import { TimeType } from '@/components/TimeButtonGroup';
import { sumBy } from 'lodash';
import { SubSystemType } from '../..';
import styles from './index.less';
import { AllChartType, PVChart } from './type';

const descByTimeType = new Map([
  [TimeType.DAY, '日'],
  [TimeType.MONTH, '月'],
  [TimeType.YEAR, '年'],
  [TimeType.TOTAL, '累计'],
]);

const getDescByTimeType = (type: TimeType = TimeType.DAY) => {
  return descByTimeType.get(type);
};

const getCounts = (chartData: AllChartType, key: keyof AllChartType) => {
  return sumBy(chartData?.[key], function (o) {
    return o.amount;
  });
};

const RenderTitle = ({
  subSystemType,
  timeType,
  chartData,
}: {
  subSystemType: SubSystemType;
  timeType: TimeType;
  chartData: AllChartType;
}) => {
  const desc = getDescByTimeType(timeType);

  if (subSystemType === SubSystemType.PV)
    return (
      <div className={styles.title}>
        {desc}发电量/kWh:<span>{getCounts(chartData, 'pvPowerGeneration')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.ES)
    return (
      <div className={styles.title}>
        {desc}充电量/kWh: <span>{getCounts(chartData, 'charge')}</span>
        {desc}放电量/kWh: <span>{getCounts(chartData, 'discharge')}</span>
      </div>
    );
  return (
    <div className={styles.title}>
      {desc}光伏收益/元: <span>{getCounts(chartData, 'pvIncome')}</span>
      {desc}储能收益/元: <span>{getCounts(chartData, 'esIncome')}</span>
    </div>
  );
};

export default RenderTitle;
