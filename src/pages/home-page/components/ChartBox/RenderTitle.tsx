import { TimeType } from '@/components/TimeButtonGroup';
import { sumBy } from 'lodash';
import { SubSystemType } from '../..';
import styles from './index.less';
import { AllChartType, PVChart } from './type';
import { SiteTypeEnum, SiteTypeEnumType } from '@/utils/dict';
import { formatMessage } from '@/utils';

const descByTimeType = new Map([
  [TimeType.DAY, formatMessage({ id: 'common.time.day', defaultMessage: '日' })],
  [TimeType.MONTH, formatMessage({ id: 'common.time.month', defaultMessage: '月' })],
  [TimeType.YEAR, formatMessage({ id: 'common.time.year', defaultMessage: '年' })],
  [TimeType.TOTAL, formatMessage({ id: 'common.time.total', defaultMessage: '累计' })],
]);

const getDescByTimeType = (type: TimeType = TimeType.DAY) => {
  return descByTimeType.get(type);
};

const getCounts = (chartData: AllChartType, key: keyof AllChartType) => {
  return chartData?.[key] ?? 0;
};

const RenderTitle = ({
  subSystemType,
  timeType,
  chartData,
  siteType,
}: {
  subSystemType: SubSystemType;
  timeType: TimeType;
  chartData: AllChartType;
  siteType?: SiteTypeEnumType;
}) => {
  const desc = getDescByTimeType(timeType);

  if (subSystemType === SubSystemType.PV)
    return (
      <div className={styles.title}>
        {desc}
        {formatMessage({ id: 'index.chart.powerGeneration', defaultMessage: '发电量' })}/kWh:
        <span>{getCounts(chartData, 'totalPowerGeneration')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.ES)
    return (
      <div className={styles.title}>
        {desc}
        {formatMessage({ id: 'index.chart.powerCharge', defaultMessage: '充电量' })}/kWh:{' '}
        <span>{getCounts(chartData, 'totalCharge')}</span>
        {desc}
        {formatMessage({ id: 'index.chart.powerDischarge', defaultMessage: '放电量' })}/kWh:{' '}
        <span>{getCounts(chartData, 'totalDischarge')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.CS)
    return (
      <div className={styles.title}>
        {desc}
        {formatMessage({ id: 'index.chart.powerCharge', defaultMessage: '充电量' })}/kWh:{' '}
        <span>{getCounts(chartData, 'totalPowerConsumption')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.ELEC)
    return (
      <div className={styles.title}>
        {desc}
        {formatMessage({ id: 'index.chart.powerConsum', defaultMessage: '用电量' })}/kWh:{' '}
        <span>{getCounts(chartData, 'totalConsumption')}</span>
      </div>
    );
  return (
    <div className={styles.title}>
      {![SiteTypeEnum.ES + '', SiteTypeEnum.CS + '', SiteTypeEnum.ES_CS + ''].includes(
        siteType || '',
      ) ? (
        <>
          {desc}
          {formatMessage({ id: 'index.chart.pvIncome', defaultMessage: '光伏收益/元' })}:{' '}
          <span>{getCounts(chartData, 'pvTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
      {![SiteTypeEnum.PV + '', SiteTypeEnum.CS + ''].includes(siteType || '') ? (
        <>
          {desc}
          {formatMessage({ id: 'index.chart.energyIncome', defaultMessage: '储能收益/元' })}:{' '}
          <span>{getCounts(chartData, 'esTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
      {![SiteTypeEnum.PV + '', SiteTypeEnum.ES + '', SiteTypeEnum.PV_ES + ''].includes(
        siteType || '',
      ) ? (
        <>
          {desc}
          {formatMessage({ id: 'index.chart.chargeIncome', defaultMessage: '充电桩收益/元' })}:{' '}
          <span>{getCounts(chartData, 'csTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RenderTitle;
