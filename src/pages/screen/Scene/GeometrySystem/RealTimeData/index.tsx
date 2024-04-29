import Cell from '@/pages/screen/components/LayoutCell';
import { SubSystemType, SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { keepTwoDecimalWithoutNull } from '@/pages/site-monitor/Overview/helper';
import classnames from 'classnames';
import styles from './index.less';
import { formatMessage } from '@/utils';
const RealTimeData = ({ data }: { data?: SystemDiagramRes }) => {
  const pv = data?.[SubSystemType.PV];
  const electricSupply = data?.[SubSystemType.E];
  const energyStore = data?.[SubSystemType.ES];
  const chargeStack = data?.[SubSystemType.CS];
  const load = data?.[SubSystemType.L];
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
  return (
    <>
      <Cell width={170} height={42} left={40} top={90}>
        <div className={classnames([styles.boxWrapper, styles.boxBackgroundMini])}>
          <div className={styles.box}>
            <span className={styles.label} title={title_powerGrid}>
              {title_powerGrid}
            </span>
            <span className={styles.value}>：{electricSupply?.p ?? '--'}</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={66} left={40} top={302}>
        <div className={styles.boxWrapper}>
          <div className={styles.box}>
            <span className={styles.label} title={title_powerGeneration}>
              {title_powerGeneration}
            </span>
            <span className={styles.value}>：{pv?.p ?? '--'}</span>
          </div>
          <div className={styles.box}>
            <span className={styles.label} title={title_dailyPowerGeneration}>
              {title_dailyPowerGeneration}
            </span>
            <span className={styles.value}>：{pv?.charge ?? '--'}</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={66} left={766} top={90}>
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
      <Cell width={170} height={42} left={766} top={302}>
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
    </>
  );
};

export default RealTimeData;
