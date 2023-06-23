import BackgroundBottom from '@/assets/image/screen/Geometry/background_bottom.png';
import BackgroundTop from '@/assets/image/screen/Geometry/background_top.png';
import BackgroundRight from '@/assets/image/screen/Geometry/background_right.png';
import BackgroundPark from '@/assets/image/screen/Geometry/background_park.png';

// import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/Geometry/background_energy_flow.svg';
import { FC, ReactNode, useCallback } from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { chargingStackCeils } from './config';
import { otherCeils } from './configOtherDevice';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
// import { ReactComponent as EnergyFlowLine } from '@/assets/image/screen/scenes/能流图@2x(3).svg';
import DeviceDialog from './Dialog';
import type { CellConfigItem, DeviceInfoType, DeviceMark } from './type';
import { bindDeviceMark, getDeviceList } from './service';
import { useRequest } from 'umi';
import { cloneDeep, find, isEmpty, isNil } from 'lodash';
import useResize from './useResize';
import useDragging from './useDragging';
import QueueAnim from 'rc-queue-anim';
import { useBoolean, useToggle } from 'ahooks';
import { message } from 'antd';
import Cell from '../../components/LayoutCell';
import EnergyFlowLine from './EnergyFlowAnimation/EnergyFlowLine';
import BindDevice from './Dialog/BindDevice';

type BindDeviceType = {
  id: number;
  deviceName: string;
};

const DEFAULT_DEVICE_INFO = {
  deviceId: '',
  deviceType: null,
  loopNum: 12,
};

const Geometry: FC = () => {
  const { data: deviceList } = useRequest(getDeviceList);
  const { run: runForBindDeviceMark } = useRequest(bindDeviceMark, { manual: true });

  const ceilsConfig = cloneDeep([...chargingStackCeils, ...otherCeils]);

  const addDevicePropsToCeilAccordingMark = (
    mark: DeviceMark,
    device: { deviceId?: number; deviceName?: string },
  ) => {
    const ceil = find(ceilsConfig, (it) => it?.mark === mark);
    if (ceil) {
      ceil.deviceId = device?.deviceId ?? null;
      ceil.deviceName = device?.deviceName ?? '';
    }
  };

  const fillDeviceIdForMarkDevices = () => {
    if (deviceList && deviceList?.length) {
      deviceList.forEach((device) => {
        const { mark } = device;
        if (!isNil(mark)) {
          // addDevicePropsToCeilAccordingMark(mark, device);
          const ceil = find(ceilsConfig, (it) => it?.mark === mark);
          if (ceil) {
            ceil.deviceId = device.deviceId;
          }
        }
      });
    }
  };
  fillDeviceIdForMarkDevices();

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>({} as DeviceInfoType);
  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
  };
  const handleGeometry = (cell: CellConfigItem) => {
    const { deviceId, deviceType, loopNum, mark, deviceName } = cell;
    console.log(cell);

    if (!deviceId || !deviceType) {
      message.error('该设备未配置');
      return;
    }

    setDeviceInfo({
      deviceId,
      deviceType,
      loopNum,
      // deviceName,
      // mark,
    });
  };

  // const [openBindDevice, { setTrue, setFalse }] = useBoolean(false);
  // const onContextMenu = useCallback((e: MouseEvent) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   setTrue();
  // }, []);
  // const onBindDevice = async (value: BindDeviceType[]) => {
  //   const { mark } = deviceInfo;
  //   if (!mark) {
  //     return;
  //   }
  //   const { id: currentDeviceId, deviceName: currentDeviceName } = value[0];
  //   try {
  //     const params = {
  //       mark: mark as DeviceMark,
  //     };
  //     if (!isNil(currentDeviceId)) {
  //       Object.assign(params, { deviceId: currentDeviceId });
  //     }
  //     await runForBindDeviceMark(params);
  //     addDevicePropsToCeilAccordingMark(mark, {
  //       deviceName: currentDeviceName,
  //       deviceId: currentDeviceId,
  //     });
  //   } catch (error) {}
  // };

  const ceils = useMemo<ReactNode[]>(() => {
    return ceilsConfig.map((cell) => {
      const { cellStyle } = cell;
      console.log(cellStyle);

      return (
        <Cell
          key={cell.key}
          zIndex={3}
          onClick={() => handleGeometry(cell)}
          {...cellStyle}
          // onContextMenu={onContextMenu}
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
  // }, [ceilsConfig, onContextMenu]);
  console.log(ceilsConfig);

  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const { resize } = useResize(sceneWrapperRef.current);
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
      <div
        className={styles.backgroundBottom}
        style={{ backgroundImage: `url(${BackgroundBottom})` }}
      />
      <div className={styles.backgroundTop} style={{ backgroundImage: `url(${BackgroundTop})` }} />
      <div
        className={styles.backgroundRight}
        style={{ backgroundImage: `url(${BackgroundRight})` }}
      />
      <div
        className={styles.backgroundPark}
        style={{ backgroundImage: `url(${BackgroundPark})` }}
      />

      <DeviceDialog
        {...deviceInfo}
        onCancel={closeDialog}
        onChange={handleGeometry}
        value={deviceInfo}
      />
      <BindDevice<BindDeviceType>
        open={openBindDevice}
        onCancel={setFalse}
        value={[
          {
            id: deviceInfo.deviceId as number,
            deviceName: deviceInfo.deviceName ?? '',
          },
        ]}
        onChange={onBindDevice}
      />
      <QueueAnim duration={1500} type={['top', 'bottom']} ease="easeInOutQuart">
        <Cell width={865} height={390} left={142} top={86}>
          <EnergyFlowLine />
          <EnergyFlowAnimation />
        </Cell>
        {ceils}
      </QueueAnim>
    </Cell>
  );
};

export default Geometry;
