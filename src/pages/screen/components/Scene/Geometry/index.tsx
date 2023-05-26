import { ReactComponent as DemonstrationBackground } from '@/assets/image/screen/demonstration_bg.svg';
import type { FC, ReactNode } from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import Cell from '../../LayoutCell';
import { CellList as defaultConfigs } from './config';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
import DeviceDialog from './Dialog';
import type { CellConfigItem, DeviceInfoType } from './type';
import { getDeviceList } from './service';
import { useRequest } from 'umi';
import { cloneDeep, find, isNil } from 'lodash';
import useResize from './useResize';
import useDragging from './useDragging';
import QueueAnim from 'rc-queue-anim';
import { useToggle } from 'ahooks';

const DEFAULT_DEVICE_INFO = {
  deviceId: '',
  deviceType: null,
  loopNum: 11,
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
  const ceilsConfig = cloneDeep(defaultConfigs);
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
    if (deviceId && deviceType) {
      setDeviceInfo({
        deviceId,
        deviceType,
        loopNum,
      });
    }
  };

  const ceils = useMemo<ReactNode[]>(() => {
    return ceilsConfig.map((cell) => {
      const { cellStyle } = cell;
      cellStyle.left = cellStyle.left - 440;
      cellStyle.top = cellStyle.top - 280;
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
      height={667}
      left={440}
      top={280}
      zIndex={9999}
      cursor="default"
      style={sceneWrapper}
    >
      <DemonstrationBackground width={1040} height={667} />
      <DeviceDialog {...deviceInfo} onCancel={closeDialog} />
      {showChild && (
        <QueueAnim duration={1500} type={['top', 'bottom']} ease="easeInOutQuart">
          <Cell width={684} height={332} left={200} top={92}>
            <EnergyFlowLine />
          </Cell>
          <EnergyFlowAnimation />
          {ceils}
        </QueueAnim>
      )}
    </Cell>
  );
};

export default Geometry;
