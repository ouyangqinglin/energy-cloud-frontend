import { useCallback, useMemo, type SVGProps } from 'react';
import MarketEleIcon from './svg/market_ele.svg';
import { ReactComponent as EsIcon } from './svg/es.svg';
import { ReactComponent as PVcon } from './svg/pv.svg';
import { ReactComponent as LoadCSIcon } from './svg/load_cs.svg';
import { ReactComponent as LoadOtherIcon } from './svg/load_other.svg';
import styles from './index.less';
import { keepTwoDecimalWithoutNull } from '../../helper';
import type { SystemDiagramRes } from '../type';
import { SubSystemType } from '../type';
import { history } from 'umi';
import { deviceAlarmStatusFormat } from '@/utils/format';
import type { AlarmTreeData } from './useWatchingAlarmForSystem';
import { SubsystemType } from './type';
import { formatMessage, isEmpty } from '@/utils';
import { SiteTypeStrEnum } from '@/utils/enum';

type SvgComponentType = SVGProps<SVGSVGElement> & {
  data: SystemDiagramRes;
  alarmData: AlarmTreeData;
  siteType: string;
  siteId: number;
};

const SvgComponent: React.FC<SvgComponentType> = (props) => {
  const { data, alarmData, siteType, siteId } = props;
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  const chargeStack = data?.[SubSystemType.CS] ?? {};
  const load = data?.[SubSystemType.L] ?? {};

  const chargeAndElestNum = useMemo(() => {
    return (alarmData?.[SubsystemType.EC] || 0) + (alarmData?.[SubsystemType.OT] || 0);
  }, [alarmData]);

  const onClick = useCallback(() => {
    history.push({
      pathname: '/alarm/current',
      search: `?siteId=${siteId}`,
    });
  }, [siteId]);

  return (
    <div className={styles.activeWrapper}>
      <div
        className={styles.cell}
        style={{
          top: 23,
          left: ['3'].includes(siteType) ? 271 : 78,
        }}
      >
        <img
          src={MarketEleIcon}
          style={{
            width: 82,
            height: 102,
            opacity: electricSupply.flag ? 1 : 0,
          }}
        />
        {electricSupply.flag && (
          <div className={styles.desc}>
            <span className={styles.title}>
              {formatMessage({ id: 'siteMonitor.mainsPower', defaultMessage: '市电功率' })}(kW)：
            </span>
            <span className={styles.value}>{electricSupply.p ?? '--'}</span>
          </div>
        )}
      </div>
      <div
        className={styles.cell}
        style={{
          top: 32,
          left: ['12', '123'].includes(siteType) ? 418 : 441,
        }}
      >
        <EsIcon
          style={{
            opacity: energyStore.flag ? 1 : 0,
          }}
        />
        {energyStore.flag && (
          <>
            <div className={styles.desc}>
              <span className={styles.title}>
                {formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' })}
                (kW)：
              </span>
              <span className={styles.value}>{energyStore?.p ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>
                {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
              </span>
              <span className={styles.alarm}>
                {deviceAlarmStatusFormat(alarmData?.[SubsystemType.ES] ? '1' : '0')}
                <span className={`cursor-pure ${styles.number}`} onClick={onClick}>
                  {alarmData?.[SubsystemType.ES] ? alarmData?.[SubsystemType.ES] : ''}
                </span>
              </span>
            </div>
          </>
        )}
      </div>
      <div
        className={styles.cell}
        style={{
          top: ['13', '1'].includes(siteType) ? 45 : 230,
          left: ['13', '1'].includes(siteType) ? 440 : 84,
        }}
      >
        <PVcon
          style={{
            opacity: pv.flag ? 1 : 0,
          }}
        />
        {pv.flag && (
          <>
            <div className={styles.desc}>
              <span className={styles.title} style={{ maxWidth: 160 }}>
                {formatMessage({
                  id: 'siteMonitor.generatingCapacity',
                  defaultMessage: '发电功率',
                })}
                (kW)：
              </span>
              <span className={styles.value}>{pv.p ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title} style={{ maxWidth: 188 }}>
                {formatMessage({
                  id: 'device.todayElectricitygeneration',
                  defaultMessage: '今日发电量',
                })}
                (kWh)：
              </span>
              <span className={styles.value}>{pv.charge ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>
                {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
              </span>
              <span className={styles.alarm}>
                {deviceAlarmStatusFormat(alarmData?.[SubsystemType.PG] ? '1' : '0')}
                <span className={`cursor-pure ${styles.number}`} onClick={onClick}>
                  {alarmData?.[SubsystemType.PG] ? alarmData?.[SubsystemType.PG] : ''}
                </span>
              </span>
            </div>
          </>
        )}
      </div>
      {['3'].includes(siteType) ? (
        <div>
          <div
            className={styles.cell}
            style={{
              top: 224,
              left: 100,
            }}
          >
            <LoadCSIcon style={{ width: 86, height: 86 }} />
            <div className={styles.desc}>
              <span className={styles.title} style={{ fontSize: 12, width: 'auto' }}>
                {formatMessage({
                  id: 'siteMonitor.chargingPowerOfChargingPile',
                  defaultMessage: '充电桩充电功率',
                })}
                (kW)：
              </span>
              <span className={styles.value} style={{ fontSize: 12 }}>
                {chargeStack?.p ?? '--'}
              </span>
            </div>
            <div>
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
                </span>
                <span className={styles.alarm}>
                  {deviceAlarmStatusFormat(chargeAndElestNum ? '1' : '0')}
                  <span className={`cursor-pure ${styles.number}`} onClick={onClick}>
                    {chargeAndElestNum ? chargeAndElestNum : ''}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div
            className={styles.cell}
            style={{
              top: 224,
              left: 445,
            }}
          >
            <LoadOtherIcon
              style={{
                marginBottom: '2px',
                width: 99,
                height: 84,
              }}
            />
            {chargeStack.flag && (
              <div className={styles.desc}>
                <span className={styles.title} style={{ fontSize: 12, width: 'auto' }}>
                  {formatMessage({
                    id: 'siteMonitor.electricPowerConsumptionOfOtherLoads',
                    defaultMessage: '其他负载用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value} style={{ fontSize: 12 }}>
                  {load.p ?? '--'}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={styles.cell}
          style={{
            top: ['12', '123'].includes(siteType)
              ? 227
              : ['13', '23'].includes(siteType)
              ? 254
              : 261,
            left: ['13', '23'].includes(siteType) ? 299 : ['1', '2'].includes(siteType) ? 239 : 418,
            transform: ['13', '23'].includes(siteType) ? 'translateX(-50%)' : '',
          }}
        >
          <div
            className="flex py8"
            style={{
              minWidth: 240,
              border: chargeStack.flag ? '1px solid #E4E6E8' : 0,
              alignItems: 'end',
            }}
          >
            <div
              className="px20"
              style={{ display: chargeStack.flag ? 'block' : 'none', marginRight: '-20px' }}
            >
              <LoadCSIcon />
              <div className={styles.desc}>
                <span className={styles.title} style={{ fontSize: 12, width: 'auto' }}>
                  {formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })}(kW)：
                </span>
                <span className={styles.value} style={{ fontSize: 12 }}>
                  {chargeStack?.p ?? '--'}
                </span>
              </div>
            </div>

            <div className="px20">
              <LoadOtherIcon
                style={{
                  marginBottom: '2px',
                  ...(chargeStack.flag ? {} : { transform: 'scale(1.5)' }),
                }}
              />
              {chargeStack.flag && (
                <div className={styles.desc}>
                  <span className={styles.title} style={{ fontSize: 12, width: 'auto' }}>
                    {formatMessage({ id: 'common.other', defaultMessage: '其他' })}(kW)：
                  </span>
                  <span className={styles.value} style={{ fontSize: 12 }}>
                    {load.p ?? '--'}
                  </span>
                </div>
              )}
            </div>
          </div>
          {['2'].includes(siteType) ? (
            <div>
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerConsumption',
                    defaultMessage: '负载用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value}>{keepTwoDecimalWithoutNull(load?.p)}</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                margin: [
                  SiteTypeStrEnum.CS,
                  SiteTypeStrEnum.PV_CS,
                  SiteTypeStrEnum.ES_CS,
                  SiteTypeStrEnum.PV_ES_CS,
                ].includes(siteType)
                  ? '5px auto'
                  : '',
              }}
            >
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerConsumption',
                    defaultMessage: '用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value}>
                  {isEmpty(load?.p) && isEmpty(chargeStack?.p)
                    ? '--'
                    : keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
                </span>
              </div>
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerQuantity',
                    defaultMessage: '用电电量',
                  })}
                  (kWh)：
                </span>
                <span className={styles.value}>
                  {isEmpty(load?.charge) && isEmpty(chargeStack?.charge)
                    ? '--'
                    : keepTwoDecimalWithoutNull((load?.charge ?? 0) + (chargeStack?.charge ?? 0))}
                </span>
              </div>

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
                </span>
                <span className={styles.alarm}>
                  {deviceAlarmStatusFormat(chargeAndElestNum ? '1' : '0')}
                  <span className={`cursor-pure ${styles.number}`} onClick={onClick}>
                    {chargeAndElestNum ? chargeAndElestNum : ''}
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default SvgComponent;
