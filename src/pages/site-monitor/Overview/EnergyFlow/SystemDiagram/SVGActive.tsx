import { isNumber } from 'lodash';
import type { SVGProps } from 'react';
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
const SvgComponent = (
  props: SVGProps<SVGSVGElement> & { data: SystemDiagramRes; alarmData: AlarmTreeData },
) => {
  const { data, alarmData } = props;
  const pv = data?.[SubSystemType.PV] ?? {};
  const electricSupply = data?.[SubSystemType.E] ?? {};
  const energyStore = data?.[SubSystemType.ES] ?? {};
  const chargeStack = data?.[SubSystemType.CS] ?? {};
  const load = data?.[SubSystemType.L] ?? {};
  return (
    <div className={styles.activeWrapper}>
      <div
        className={styles.cell}
        style={{
          top: 37,
          left: 91,
        }}
      >
        <img
          src={MarketEleIcon}
          style={{
            width: 82,
            height: 102,
            opacity: electricSupply.flag ? 1 : 0.2,
          }}
        />
        {electricSupply.flag && (
          <div className={styles.desc}>
            <span className={styles.title}>{formatMessage({ id: 'siteMonitor.mainsPower', defaultMessage: '市电功率' })}(kW)：</span>
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
            opacity: energyStore.flag ? 1 : 0.2,
          }}
        />
        {energyStore.flag && (
          <>
            <div className={styles.desc}>
              <span className={styles.title}>{formatMessage({ id: 'siteMonitor.storagePower', defaultMessage: '储能功率' })}(kW)：</span>
              <span className={styles.value}>{energyStore?.p ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>SoC：</span>
              <span className={styles.value}>
                {energyStore.soc ?? '--'}
                <span className={styles.unit}>%</span>
              </span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>{formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：</span>
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
          top: 230,
          left: 84,
        }}
      >
        <PVcon
          style={{
            opacity: pv.flag ? 1 : 0.2,
          }}
        />
        {pv.flag && (
          <>
            <div className={styles.desc}>
              <span className={styles.title} style={{ width: 120 }}>
              {formatMessage({ id: 'siteMonitor.generatingCapacity', defaultMessage: '发电功率' })}(kW)：
              </span>
              <span className={styles.value}>{pv.p ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title} style={{ width: 120 }}>
              {formatMessage({ id: 'siteMonitor.dayPowerGeneration', defaultMessage: '当日发电量' })}(kWh)：
              </span>
              <span className={styles.value}>{pv.charge ?? '--'}</span>
            </div>
            <div className={styles.desc}>
              <span className={styles.title}>{formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：</span>
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
      <div
        className={styles.cell}
        style={{
          top: 224,
          left: 385,
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
              <span className={styles.title} style={{ fontSize: 12, width: 'auto' }}>
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
      </div>
      <div
        className={styles.cell}
        style={{
          top: 342,
          left: 432,
        }}
      >
        <div className={styles.desc}>
          <span className={styles.title}>{formatMessage({ id: 'siteMonitor.powerConsumption', defaultMessage: '用电功率' })}(kW)：</span>
          <span className={styles.value}>
            {keepTwoDecimalWithoutNull((load?.p ?? 0) + (chargeStack?.p ?? 0))}
          </span>
        </div>

        <div className={styles.desc}>
          <span className={styles.title}>{formatMessage({ id: 'siteMonitor.runningState', defaultMessage: '运行状态' })}：</span>
          <span className={styles.alarm}>
            {deviceAlarmStatusFormat(alarmData?.[SubsystemType.EC] ? '1' : '0')}
            <span className={styles.number}>
              {alarmData?.[SubsystemType.EC] ? alarmData?.[SubsystemType.EC] : ''}
            </span>
          </span>
        </div>
      </div>
    </div>

    // <svg xmlns="http://www.w3.org/2000/svg" {...props}>
    //   <g fill="none" fillRule="evenodd">
    //     <g transform="rotate(180 189.312 109.077)">
    //       <path
    //         id="path-1"
    //         stroke="#B4B4B4"
    //         strokeLinecap="square"
    //         d="m61.275 21.471 224.849 152.183"
    //       />
    //       <path
    //         stroke="#B4B4B4"
    //         strokeLinecap="square"
    //         d="M61.273 21.47c22.689 40.195 26.086 75.704 10.192 106.528C55.571 158.822 31.749 177.666 0 184.528"
    //       />
    //       <path
    //         stroke="#B4B4B4"
    //         strokeLinecap="square"
    //         d="M61.275 21.47C93.922 33.898 131.719 38.4 174.663 34.978 217.607 31.555 252.041 19.896 277.965 0"
    //       />
    //     </g>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(0 113)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'市电功率(kW)：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fill="#1D2129"
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(0 113)"
    //       >
    //         <tspan x={102} y={15}>
    //           {electricSupply.p ?? '--'}
    //         </tspan>
    //       </text>
    //     </g>
    //     <text
    //       fontFamily="PingFangSC-Regular, PingFang SC"
    //       fontSize={12}
    //       transform="translate(317 192)"
    //     >
    //       <tspan x={10} y={93} fill="#606266">
    //         {'充电桩(kW)：'}
    //       </tspan>
    //       <tspan x={83.5} y={93} fill="#1D2129">
    //         {chargeStack?.p ?? '--'}
    //       </tspan>
    //     </text>
    //     <text
    //       fontFamily="PingFangSC-Regular, PingFang SC"
    //       fontSize={12}
    //       transform="translate(317 192)"
    //     >
    //       <tspan x={140} y={93} fill="#606266">
    //         {'其他(kW)：'}
    //       </tspan>
    //       <tspan x={201.5} y={93} fill="#1D2129">
    //         {load.p ?? '--'}
    //       </tspan>
    //     </text>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(364 310)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'用电功率(kW)：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fill="#1D2129"
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(364 310)"
    //       >
    //         <tspan x={99} y={15}>
    //           {keepTwoDecimalWithoutNull(load.p + chargeStack.p)}
    //         </tspan>
    //       </text>
    //     </g>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(0 286)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'发电功率(kW)：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fill="#1D2129"
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(0 286)"
    //       >
    //         <tspan x={124} y={15}>
    //           {pv.p ?? '--'}
    //         </tspan>
    //       </text>
    //     </g>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(0 310)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'当日发电量(kWh)：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fill="#1D2129"
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(0 310)"
    //       >
    //         <tspan x={124} y={15}>
    //           {pv.charge ?? '--'}
    //         </tspan>
    //       </text>
    //     </g>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(368 113)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'储能功率(kW)：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fill="#1D2129"
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(368 113)"
    //       >
    //         <tspan x={102} y={15}>
    //           {energyStore?.p ?? '--'}
    //         </tspan>
    //       </text>
    //     </g>
    //     <g fontSize={14}>
    //       <text
    //         fill="#606266"
    //         fontFamily="PingFangSC-Regular, PingFang SC"
    //         transform="translate(368 139)"
    //       >
    //         <tspan x={0} y={15}>
    //           {'SoC：'}
    //         </tspan>
    //       </text>
    //       <text
    //         fontFamily="PingFangSC-Semibold, PingFang SC"
    //         fontWeight={500}
    //         transform="translate(368 139)"
    //         x={102}
    //         y={15}
    //       >
    //         <tspan fill="#1D2129">{energyStore.soc ?? '--'}</tspan>
    //         <tspan fill="#999" fontSize={12}>
    //           {'%'}
    //         </tspan>
    //       </text>
    //     </g>
    //   </g>
    // </svg>
  );
};
export default SvgComponent;
