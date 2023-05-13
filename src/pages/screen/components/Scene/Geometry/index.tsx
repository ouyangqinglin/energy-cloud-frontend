import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import Cell from '../../LayoutCell';
import { CellList as defaultConfigs } from './config';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
import DeviceDialog from './Dialog';
import type { CellConfigItem, DeviceInfoType } from './type';
import { EventType } from './type';
import { getDeviceList } from './service';
import { useRequest } from 'umi';
import { find, isNil } from 'lodash';

const DEFAULT_DEVICE_INFO = {
  deviceId: '',
  deviceType: null,
  loopNum: 11,
};

const Geometry: FC = () => {
  const { data: deviceList } = useRequest(getDeviceList);
  const ceilsConfig = defaultConfigs;
  const fillDeviceIdForMarkDevices = () => {
    if (deviceList && deviceList.length) {
      deviceList.forEach((device) => {
        const { mark } = device;
        if (!isNil(mark)) {
          const ceil = find(ceilsConfig, (it) => it?.mark === mark);
          if (ceil) {
            ceil.deviceId = device.deviceId;
          }
        }
      });
    }
  };
  fillDeviceIdForMarkDevices();
  console.log(ceilsConfig);

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(DEFAULT_DEVICE_INFO);
  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
  };
  const handleGeometry = (cell: CellConfigItem) => {
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
  ceilsConfig.forEach((cell) => {
    ceils.push(
      <Cell
        key={cell.key}
        onClick={() => handleGeometry(cell)}
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
      <DeviceDialog {...deviceInfo} onCancel={closeDialog} />
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
