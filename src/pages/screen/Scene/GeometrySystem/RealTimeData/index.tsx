import Cell from '@/pages/screen/components/LayoutCell';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import type { SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { keepTwoDecimalWithoutNull } from '@/pages/site-monitor/Overview/helper';
import classnames from 'classnames';
import styles from './index.less';
import { formatMessage } from '@/utils';
import { useMemo } from 'react';
import type { UnitType } from '@/models/siteType';

const RealTimeData = ({
  data,
  siteTypeConfig,
}: {
  data?: SystemDiagramRes;
  siteTypeConfig: UnitType;
}) => {
  const pv = data?.[SubSystemType.PV];
  const electricSupply = data?.[SubSystemType.E];
  const energyStore = data?.[SubSystemType.ES];
  const chargeStack = data?.[SubSystemType.CS];
  const load = data?.[SubSystemType.L];
  const fan = data?.[SubSystemType.F];
  const diesel = data?.[SubSystemType.D];
  const title_powerGrid =
    formatMessage({ id: 'screen.powerGrid', defaultMessage: '电网功率' }) + '(kW)';
  const title_powerGeneration =
    formatMessage({
      id: 'screen.powerGeneration',
      defaultMessage: '发电功率',
    }) + '(kW)';
  const title_dailyPowerGeneration =
    formatMessage({
      id: 'device.todayElectricitygeneration',
      defaultMessage: '今日发电',
    }) + '(kWh)';
  const title_energyStoragePower =
    formatMessage({
      id: 'screen.energyStoragePower',
      defaultMessage: '储能功率',
    }) + '(kW)';
  const title_powerConsumption =
    formatMessage({
      id: 'screen.powerConsumption',
      defaultMessage: '用电功率',
    }) + '(kW)';

  const group = useMemo(() => {
    const item = [] as any[];
    if (siteTypeConfig.hasPv) {
      item.push({
        title: formatMessage({ id: 'screen.pv', defaultMessage: '光伏' }),
        data: pv,
      });
    }
    if (siteTypeConfig.hasFan) {
      item.push({
        title: formatMessage({ id: 'screen.1010', defaultMessage: '风机' }),
        data: fan,
      });
    }
    if (siteTypeConfig.hasDiesel) {
      item.push({
        title: formatMessage({ id: 'screen.1009', defaultMessage: '柴发' }),
        data: diesel,
      });
    }
    switch (item.length) {
      case 1:
        item[0] = { left: 15, top: 270, ...item[0] };
        break;
      case 2:
        item[0] = { left: 15, top: 230, ...item[0] };
        item[1] = { left: 15, top: 452, ...item[1] };
        break;
      case 3:
        item[0] = { left: 15, top: 200, ...item[0] };
        item[1] = { left: 15, top: 408, ...item[1] };
        item[2] = { left: 15, top: 491, ...item[2] };
        break;
    }
    return item;
  }, [diesel, fan, pv, siteTypeConfig]);

  return (
    <>
      <Cell width={170} height={42} left={15} top={90}>
        <div className={classnames([styles.boxWrapper, styles.boxBackgroundMini])}>
          <div className={styles.box}>
            <span className={styles.label} title={title_powerGrid}>
              {title_powerGrid}
            </span>
            <span className={styles.value}>：{electricSupply?.p ?? '--'}</span>
          </div>
        </div>
      </Cell>

      <Cell width={170} height={66} right={15} top={90}>
        <div className={styles.boxWrapper}>
          <div className={styles.box}>
            <span className={styles.label} title={title_energyStoragePower}>
              {title_energyStoragePower}
            </span>
            <span className={styles.value}>：{energyStore?.p ?? '--'}</span>
          </div>
          <div className={styles.box}>
            <span className={styles.label}>SOC：</span>
            <span className={styles.value}>{energyStore?.soc ?? '--'}%</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={42} right={15} top={302}>
        <div className={classnames([styles.boxWrapper, styles.boxBackgroundMini])}>
          <div className={styles.box}>
            <span className={styles.label} title={title_powerConsumption}>
              {title_powerConsumption}
            </span>
            <span className={styles.value}>
              :{keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
            </span>
          </div>
        </div>
      </Cell>
      {group.map((item) => (
        <>
          <Cell width={166} height={75} left={item.left} top={item.top}>
            <div className={styles.boxWrapper}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.box}>
                <span className={styles.label} title={title_powerGeneration}>
                  {title_powerGeneration}
                </span>
                <span className={styles.value}>：{item.data?.p ?? '--'}</span>
              </div>
              <div className={styles.box}>
                <span className={styles.label} title={title_dailyPowerGeneration}>
                  {title_dailyPowerGeneration}
                </span>
                <span className={styles.value}>：{item.data?.charge ?? '--'}</span>
              </div>
            </div>
          </Cell>
        </>
      ))}
    </>
  );
};

export default RealTimeData;
