import type { FC, PureComponent, ReactNode } from 'react';
import { useState } from 'react';
import Cell from '../../LayoutCell';
import { CellList } from './config';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
import EnergyDialog from '../../EnergyDialog';
import type { DeviceType } from '../Dialog';
import DeviceDialog from '../Dialog';

export type CellConfigItem = {
  key: string;
  deviceId?: string;
  deviceType?: DeviceType;
  cellStyle: CellStyle;
  component: PureComponent | undefined;
  default: PureComponent;
  active?: PureComponent;
  hover?: PureComponent;
};

export type CellStyle = {
  width: number;
  height: number;
  left: number;
  top: number;
};

const enum EventType {
  CLICK,
  MOUSE_OUT,
  MOUSE_ENTER,
}

const Geometry: FC = () => {
  const [configs, setConfigs] = useState(CellList);

  const [isOpen, setIsOpen] = useState(false);
  const [chargeId, setChargeId] = useState('1');

  const [deviceId, setDeviceId] = useState('');
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null);

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setDeviceId('');
    setDeviceType(null);
  };

  const handleGeometry = (cell: CellConfigItem, eventType: EventType) => {
    if (cell.deviceId && cell.deviceType) {
      setDeviceId(cell.deviceId);
      setDeviceType(cell.deviceType);
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
      <DeviceDialog
        deviceType={deviceType}
        activeDeviceId={deviceId}
        resetActiveDeviceId={closeModal}
      />
      {/* <EnergyDialog id={chargeId} open={isOpen} model="screen" onCancel={closeModal} /> */}
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
