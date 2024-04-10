import { useMemo, type SVGProps } from 'react';
import MarketEleIcon from './svg/market_ele.svg';
import { ReactComponent as EsIcon } from './svg/es.svg';
import { ReactComponent as PVcon } from './svg/pv.svg';
import { ReactComponent as LoadCSIcon } from './svg/load_cs.svg';
import { ReactComponent as LoadOtherIcon } from './svg/load_other.svg';
import styles from './index.less';
import { keepTwoDecimalWithoutNull } from '../../helper';
import type { SystemDiagramRes } from '../type';
import { SubSystemType } from '../type';
import { Col, Row } from 'antd';
import { deviceAlarmStatusFormat } from '@/utils/format';
import type { AlarmTreeData } from './useWatchingAlarmForSystem';
import { SubsystemType } from './type';
import { formatMessage } from '@/utils';
import { useEffect, useState } from 'react';
const SvgComponent = (
  props: SVGProps<SVGSVGElement> & { data: SystemDiagramRes; alarmData: AlarmTreeData },
) => {
  const { data, alarmData, siteType } = props;
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  const chargeStack = data?.[SubSystemType.CS] ?? {};
  const load = data?.[SubSystemType.L] ?? {};

  const chargeAndElestNum = useMemo(() => {
    return (alarmData?.[SubsystemType.EC] || 0) + (alarmData?.[SubsystemType.OT] || 0);
  }, [alarmData]);

  const [styleInfo, setStyleInfo] = useState({ show: true });

  useEffect(() => {
    switch (siteType) {
      case '23':
      case '13':
      case '1':
      case '2':
        setStyleInfo({});
        break;
      default:
        setStyleInfo({});
    }
  }, [siteType]);

  return (
    <div className={styles.activeWrapper}>
      <div
        className={styles.cell}
        style={{
          top: 37,
          left: ['3'].includes(siteType) ? 271 : 91,
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
          top: 42,
          left: 424,
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
              <span className={styles.title}>SOC：</span>
              <span className={styles.value}>
                {energyStore.soc ?? '--'}
                <span className={styles.unit}>%</span>
              </span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>
                {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
              </span>
              <span className={styles.alarm}>
                {deviceAlarmStatusFormat(alarmData?.[SubsystemType.ES] ? '1' : '0')}
                <span className={styles.number}>
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
          top: ['13', '1'].includes(siteType) ? 28 : 230,
          left: ['13', '1'].includes(siteType) ? 443 : 84,
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
                  id: 'siteMonitor.dayPowerGeneration',
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
                <span className={styles.number}>
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
            <LoadCSIcon />
            <div className={styles.desc}>
              <span
                className={styles.title}
                style={{ fontSize: 12, width: 'auto', marginLeft: '-12px' }}
              >
                {formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })}(kW)：
              </span>
              <span className={styles.value} style={{ fontSize: 12 }}>
                {chargeStack?.p ?? '--'}
              </span>
            </div>
            <div>
              {/* <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerConsumption',
                    defaultMessage: '用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value}>
                  {keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
                </span>
              </div> */}

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerQuantity',
                    defaultMessage: '用电电量',
                  })}
                  (kWh)：
                </span>
                <span className={styles.value}>
                  {keepTwoDecimalWithoutNull((load?.charge ?? 0) + (chargeStack?.charge ?? 0))}
                </span>
              </div>

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
                </span>
                <span className={styles.alarm}>
                  {deviceAlarmStatusFormat(chargeAndElestNum ? '1' : '0')}
                  <span className={styles.number}>
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
              left: 453,
            }}
          >
            <LoadOtherIcon
              style={{
                marginBottom: '2px',
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
            <div>
              {/* <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerConsumption',
                    defaultMessage: '用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value}>
                  {keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
                </span>
              </div> */}

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerQuantity',
                    defaultMessage: '用电电量',
                  })}
                  (kWh)：
                </span>
                <span className={styles.value}>
                  {keepTwoDecimalWithoutNull((load?.charge ?? 0) + (chargeStack?.charge ?? 0))}
                </span>
              </div>

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
                </span>
                <span className={styles.alarm}>
                  {deviceAlarmStatusFormat(chargeAndElestNum ? '1' : '0')}
                  <span className={styles.number}>
                    {chargeAndElestNum ? chargeAndElestNum : ''}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.cell}
          style={{
            top: 224,
            left: ['13', '23'].includes(siteType) ? 185 : ['1', '2'].includes(siteType) ? 241 : 385,
          }}
        >
          <Row
            // gutter={21}
            justify={'center'}
            style={{
              width: 240,
              height: 110,
              border: chargeStack.flag ? '1px solid #E4E6E8' : 0,
            }}
          >
            <Col
              span={chargeStack.flag ? 12 : 0}
              style={{
                padding: '8px 20px',
              }}
            >
              <LoadCSIcon />
              <div className={styles.desc}>
                <span
                  className={styles.title}
                  style={{ fontSize: 12, width: 'auto', marginLeft: '-12px' }}
                >
                  {formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' })}(kW)：
                </span>
                <span className={styles.value} style={{ fontSize: 12 }}>
                  {chargeStack?.p ?? '--'}
                </span>
              </div>
            </Col>
            <Col
              span={!chargeStack.flag ? 24 : 12}
              style={{
                padding: '16px 20px',
              }}
            >
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
            </Col>
          </Row>
          {['2'].includes(siteType) ? (
            <div
              style={{
                marginTop: '-18px',
              }}
            >
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerConsumption',
                    defaultMessage: '负载用电功率',
                  })}
                  (kW)：
                </span>
                <span className={styles.value}>{keepTwoDecimalWithoutNull(load?.p ?? 0)}</span>
              </div>
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.loadElectricConsumption',
                    defaultMessage: '负载用电量',
                  })}
                  (kWh)：
                </span>
                <span className={styles.value}>{keepTwoDecimalWithoutNull(load?.charge ?? 0)}</span>
              </div>
            </div>
          ) : (
            <div
              style={{
                margin: ['1', '2'].includes(siteType) ? '0' : '5px auto',
              }}
            >
              {/* <div className={styles.desc}>
              <span className={styles.title}>
                {formatMessage({ id: 'siteMonitor.powerConsumption', defaultMessage: '用电功率' })}
                (kW)：
              </span>
              <span className={styles.value}>
                {keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
              </span>
            </div> */}
              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({
                    id: 'siteMonitor.powerQuantity',
                    defaultMessage: '用电电量',
                  })}
                  (kWh)：
                </span>
                <span className={styles.value}>
                  {keepTwoDecimalWithoutNull((load?.charge ?? 0) + (chargeStack?.charge ?? 0))}
                </span>
              </div>

              <div className={styles.desc}>
                <span className={styles.title}>
                  {formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：
                </span>
                <span className={styles.alarm}>
                  {deviceAlarmStatusFormat(chargeAndElestNum ? '1' : '0')}
                  <span className={styles.number}>
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
