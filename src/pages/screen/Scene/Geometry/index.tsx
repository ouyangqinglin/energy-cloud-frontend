import { ReactComponent as BackgroundBottom } from '@/assets/image/screen/Geometry/background_bottom.svg';
import { ReactComponent as BackgroundTop } from '@/assets/image/screen/Geometry/background_top.svg';
import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/Geometry/background_energy_flow.svg';
import type { FC, ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { chargingStackCeils } from './config';
import { otherCeils } from './configOtherDevice';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
// import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
// import DeviceDialog from './Dialog';
import type { CellConfigItem, DeviceInfoType } from './type';
import { getDeviceList } from './service';
import { useRequest } from 'umi';
import { cloneDeep, find, isNil } from 'lodash';
import useResize from './useResize';
import useDragging from './useDragging';
import QueueAnim from 'rc-queue-anim';
import { useToggle } from 'ahooks';
import { message } from 'antd';
import Cell from '../../components/LayoutCell';

const DEFAULT_DEVICE_INFO = {
  deviceId: '',
  deviceType: null,
  loopNum: 12,
};

const Geometry: FC = () => {
  const [showChild, { toggle }] = useToggle(false);
  const renderChildren = () => {
    toggle();
  };
  const { data: deviceList } = useRequest(getDeviceList, {
    onError: renderChildren,
    onSuccess: renderChildren,
  });
  const ceilsConfig = cloneDeep([...chargingStackCeils, ...otherCeils]);
  const fillDeviceIdForMarkDevices = () => {
    if (deviceList && deviceList?.length) {
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

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(DEFAULT_DEVICE_INFO);
  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
  };
  const handleGeometry = (cell: CellConfigItem) => {
    const { deviceId, deviceType, loopNum } = cell;
    if (!deviceId || !deviceType) {
      message.error('该设备未配置');
      return;
    }

    setDeviceInfo({
      deviceId,
      deviceType,
      loopNum,
    });
  };

  const ceils = useMemo<ReactNode[]>(() => {
    return ceilsConfig.map((cell) => {
      const { cellStyle } = cell;
      // cellStyle.left = cellStyle.left - 441;
      // cellStyle.top = cellStyle.top - 221;
      return (
        <Cell key={cell.key} onClick={() => handleGeometry(cell)} {...cellStyle}>
          <div className={styles.wrapper}>
            <div className={styles.content}>
              <div
                className={styles.ceils}
                style={{
                  background: `url(${cell.component})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  ...cellStyle,
                }}
              />
              <div className={styles.circle1} style={{ left: cellStyle.width / 2 }} />
              <div className={styles.circle2} style={{ left: cellStyle.width / 2 }} />
            </div>
          </div>
        </Cell>
      );
    });
  }, [ceilsConfig]);

  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const { resize } = useResize(sceneWrapperRef.current);
  // const { offset } = useDragging(sceneWrapperRef.current, resize);
  const sceneWrapper = {
    transform: `scale(${resize})`,
  };

  return (
    <Cell
      ref={sceneWrapperRef}
      width={1040}
      height={682}
      left={441}
      top={221}
      zIndex={9999}
      cursor="default"
      style={sceneWrapper}
    >
      {/* <BackgroundBottom width={1040} height={682} /> */}
      <div className={styles.backgroundBottom} />
      <div className={styles.backgroundTop} />
      {/* <DeviceDialog {...deviceInfo} onCancel={closeDialog} /> */}

      <QueueAnim duration={1500} type={['top', 'bottom']} ease="easeInOutQuart">
        <Cell width={865} height={390} left={142} top={86}>
          <EnergyFlowLine />
        </Cell>
        <EnergyFlowAnimation />
        {ceils}
      </QueueAnim>
    </Cell>
  );
};

export default Geometry;
