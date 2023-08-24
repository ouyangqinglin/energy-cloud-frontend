import { TimeType } from '@/components/TimeButtonGroup';
import { sumBy } from 'lodash';
import { SubSystemType } from '../..';
import styles from './index.less';
import { AllChartType, PVChart } from './type';
import { SiteTypeEnum, SiteTypeEnumType } from '@/utils/dictionary';

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
        {desc}发电量/kWh:<span>{getCounts(chartData, 'totalPowerGeneration')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.ES)
    return (
      <div className={styles.title}>
        {desc}充电量/kWh: <span>{getCounts(chartData, 'totalCharge')}</span>
        {desc}放电量/kWh: <span>{getCounts(chartData, 'totalDischarge')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.CS)
    return (
      <div className={styles.title}>
        {desc}充电量/kWh: <span>{getCounts(chartData, 'totalPowerConsumption')}</span>
      </div>
    );
  if (subSystemType === SubSystemType.ELEC)
    return (
      <div className={styles.title}>
        {desc}用电量/kWh: <span>{getCounts(chartData, 'totalConsumption')}</span>
      </div>
    );
  return (
    <div className={styles.title}>
      {![SiteTypeEnum.ES + '', SiteTypeEnum.CS + '', SiteTypeEnum.ES_CS + ''].includes(
        siteType || '',
      ) ? (
        <>
          {desc}光伏收益/元: <span>{getCounts(chartData, 'pvTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
      {![SiteTypeEnum.PV + '', SiteTypeEnum.CS + ''].includes(siteType || '') ? (
        <>
          {desc}储能收益/元: <span>{getCounts(chartData, 'esTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
      {![SiteTypeEnum.PV + '', SiteTypeEnum.ES + '', SiteTypeEnum.PV_ES + ''].includes(
        siteType || '',
      ) ? (
        <>
          {desc}充电桩收益/元: <span>{getCounts(chartData, 'csTotalIcome')}</span>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RenderTitle;
