import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import Cell from '../../LayoutCell';
import { CellList as configs } from './config';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
import DeviceDialog from '../Dialog';
import { CellConfigItem, DeviceInfoType, EventType } from './type';

const DEFAULT_DEVICE_INFO = {
  deviceId: '',
  deviceType: null,
  loopNum: 11,
};

const Geometry: FC = () => {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(DEFAULT_DEVICE_INFO);

  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
  };

  const handleGeometry = (cell: CellConfigItem, eventType: EventType) => {
    const { deviceId, deviceType, loopNum } = cell;
    if (deviceId && deviceType) {
      setDeviceInfo({
        deviceId,
        deviceType,
        loopNum,
      });
    }
  };

  const ceils: ReactNode[] = [];
  configs.forEach((cell) => {
    ceils.push(
      <Cell
        key={cell.key}
        onClick={() => handleGeometry(cell, EventType.CLICK)}
        // onMouseOut={() => handleGeometry(cell, EventType.MOUSE_OUT)}
        // onMouseEnter={() => handleGeometry(cell, EventType.MOUSE_ENTER)}
        {...cell.cellStyle}
      >
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div
              className={styles.ceils}
              style={{
                background: `url(${cell.component})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                ...cell.cellStyle,
              }}
            />
            <div className={styles.circle1} style={{ left: cell.cellStyle.width / 2 }} />
            <div className={styles.circle2} style={{ left: cell.cellStyle.width / 2 }} />
          </div>
        </div>
      </Cell>,
    );
  });

  return (
    <div>
      {/* <DeviceDialog {...deviceInfo} onCancel={closeDialog} /> */}
      <Cell width={684} height={332} left={640} top={372}>
        <EnergyFlowLine />
      </Cell>
      <EnergyFlowAnimation />
      {/* <EnergyFlowAnchor /> */}
      {ceils}
    </div>
  );
};

export default Geometry;
