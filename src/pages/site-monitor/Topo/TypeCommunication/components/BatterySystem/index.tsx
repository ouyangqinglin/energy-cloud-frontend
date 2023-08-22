import { Col, Row } from 'antd';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import Icon_EMS_215 from '../../svg-icon/icon_储能BMS.svg';
import Icon_PCS_215 from '../../svg-icon/icon_储能pcs.svg';
import Icon_AIR_CONDITIONING_215 from '../../svg-icon/icon_储能空调.svg';

import Icon_PV_INVERTER_HW from '../../svg-icon/icon_华为逆变器2.svg';
import Icon_ES_HW from '../../svg-icon/icon_华为储能.svg';

import Icon_SUPER_CHARGING_TERMINAL_HW from '../../svg-icon/icon_华为超充终端.svg';
import Icon_CHARGING_TERMINAL_HW from '../../svg-icon/iocn_华为充电终端.svg';
import Icon_CHARGING_TERMINAL from '../../svg-icon/icon_永泰充电终端.svg';
import Icon_CHARGING_STATION_DC from '../../svg-icon/icon_直流充电桩.svg';
import Icon_CHARGING_STATION_AC from '../../svg-icon/icon_交流充电桩.svg';

import Icon_ELECTRICITY_METER from '../../svg-icon/icon_电表.svg';

import type { ExtraNodeData } from '../../../type';
import styles from './index.less';
import { DeviceType } from '../../type';
import { uniqueId } from 'lodash';

const iconMap = new Map([
  [DeviceType.PV_INVERTER_HW_40KWP, Icon_PV_INVERTER_HW],
  [DeviceType.PV_INVERTER_HW_50KWP, Icon_PV_INVERTER_HW],
  [DeviceType.PV_INVERTER_HW_60KWP, Icon_PV_INVERTER_HW],
  [DeviceType.ES_HW, Icon_ES_HW],

  [DeviceType.SUPER_CHARGING_TERMINAL_HW, Icon_SUPER_CHARGING_TERMINAL_HW],
  [DeviceType.CHARGING_TERMINAL_HW, Icon_CHARGING_TERMINAL_HW],
  [DeviceType.CHARGING_TERMINAL, Icon_CHARGING_TERMINAL],
  [DeviceType.CHARGING_STATION_DC160, Icon_CHARGING_STATION_DC],
  [DeviceType.CHARGING_STATION_DC120, Icon_CHARGING_STATION_DC],
  [DeviceType.CHARGING_STATION_AC, Icon_CHARGING_STATION_AC],

  [DeviceType.PCS_215, Icon_PCS_215],
  [DeviceType.EMS_215, Icon_EMS_215],
  [DeviceType.AIR_CONDITIONING_215, Icon_AIR_CONDITIONING_215],

  [DeviceType.ELECTRICITY_METER, Icon_ELECTRICITY_METER],
  [DeviceType.ELECTRICITY_METER_215, Icon_ELECTRICITY_METER],
  [DeviceType.ELECTRICITY_METER_RAIG200, Icon_ELECTRICITY_METER],
]);

const BatterySystem = ({ data }: { data: ExtraNodeData }) => {
  const { width = 80, title, colSpan = 3, boxData } = data;
  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          width,
        }}
      >
        <BoxText
          boxStyle={{
            position: 'absolute',
            left: 45,
            top: -16,
            border: '1px solid #00B42A',
            background: '#fff',
          }}
          label={title}
        />
        {boxData && (
          <Row className={styles.boxContent}>
            {boxData.map((d) => (
              <Col key={d.name + uniqueId()} span={24 / colSpan}>
                <div className={styles.boxImage}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      backgroundImage: `url(${iconMap.get(d.type)})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '100% 100%',
                    }}
                  />
                  <div className={styles.boxTitle}>{d.name}</div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{
          visibility: 'hidden',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default BatterySystem;
