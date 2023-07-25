import Cell from '@/pages/screen/components/LayoutCell';
import { SubSystemType, SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { keepTwoDecimalWithoutNull } from '@/pages/site-monitor/Overview/helper';
import classnames from 'classnames';
import styles from './index.less';
const RealTimeData = ({ data }: { data?: SystemDiagramRes }) => {
  const pv = data?.[SubSystemType.PV];
  const electricSupply = data?.[SubSystemType.E];
  const energyStore = data?.[SubSystemType.ES];
  const chargeStack = data?.[SubSystemType.CS];
  const load = data?.[SubSystemType.L];
  return (
    <>
      <Cell width={170} height={42} left={40} top={90}>
        <div className={classnames([styles.boxWrapper, styles.boxBackgroundMini])}>
          <div className={styles.box}>
            <span className={styles.label}>电网功率(kW)：</span>
            <span className={styles.value}>{electricSupply?.p ?? '--'}</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={66} left={40} top={302}>
        <div className={styles.boxWrapper}>
          <div className={styles.box}>
            <span className={styles.label}>发电功率(kW)：</span>
            <span className={styles.value}>{pv?.p ?? '--'}</span>
          </div>
          <div className={styles.box}>
            <span className={styles.label}>当日发电(kWh)：</span>
            <span className={styles.value}>{pv?.charge ?? '--'}</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={66} left={766} top={90}>
        <div className={styles.boxWrapper}>
          <div className={styles.box}>
            <span className={styles.label}>储能功率(kW)：</span>
            <span className={styles.value}>{energyStore?.p ?? '--'}</span>
          </div>
          <div className={styles.box}>
            <span className={styles.label}>SoC：</span>
            <span className={styles.value}>{energyStore?.soc ?? '--'}%</span>
          </div>
        </div>
      </Cell>
      <Cell width={170} height={42} left={766} top={302}>
        <div className={classnames([styles.boxWrapper, styles.boxBackgroundMini])}>
          <div className={styles.box}>
            <span className={styles.label}>用电功率(kW)：</span>
            <span className={styles.value}>
              {keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
            </span>
          </div>
        </div>
      </Cell>
    </>
  );
};

export default RealTimeData;
