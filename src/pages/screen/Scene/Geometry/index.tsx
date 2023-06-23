import BackgroundBottom from '@/assets/image/screen/Geometry/background_bottom.png';
import BackgroundTop from '@/assets/image/screen/Geometry/background_top.png';
import BackgroundRight from '@/assets/image/screen/Geometry/background_right.png';
import BackgroundPark from '@/assets/image/screen/Geometry/background_park.png';
import type { FC, ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { chargingStackCeils } from './config';
import { otherCeils } from './configOtherDevice';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import DeviceDialog from './Dialog';
import {
  CellConfigItem,
  CellStyle,
  ChargingGun,
  DeviceInfoType,
  DeviceMark,
  GunStatus,
} from './type';
import { bindDeviceMark, getDeviceList } from './service';
import { useRequest } from 'umi';
import { find, isEmpty, isNil } from 'lodash';
import useResize from './useResize';
import { useBoolean } from 'ahooks';
import { message } from 'antd';
import Cell from '../../components/LayoutCell';
import EnergyFlowLine from './EnergyFlowAnimation/EnergyFlowLine';
import BindDevice from './Dialog/BindDevice';
import { useSubScribeGunStatus, useWatchingGunStatus } from './Subscribe/useWatchingGunStatus';
import { Lottie } from '@/components/Lottie';
import ChargingLeft from './lottie/ChargingLeft.json';
import ChargingRight from './lottie/ChargingRight.json';
import ChargeCompleteLeft from './lottie/ChargeCompleteLeft.json';
import ChargeCompleteRight from './lottie/ChargeCompleteRight.json';

type BindDeviceType = {
  id?: number | null;
  deviceName?: string;
};

const DEFAULT_DEVICE_INFO: DeviceInfoType = {
  deviceId: undefined,
  deviceType: null,
  loopNum: 12,
};

// new Map<gunDeviceId, deviceId>
const gunIdsMapToDeviceId = new Map<number, number>();

const Geometry: FC = () => {
  const [ceilsConfig, setCeilsConfig] = useState([...chargingStackCeils, ...otherCeils]);

  const { run, data: gunsData } = useWatchingGunStatus();
  const readyToWatchGunStatus = () => {
    const gunDevices: ChargingGun[] = [];
    ceilsConfig.forEach((curDevice) => {
      if (curDevice.chargingGuns) {
        gunDevices.push(...curDevice.chargingGuns);
      }
    });
    const ids = gunDevices.map((gun) => gun.deviceId);
    if (ids) {
      run(ids);
    }
  };
  // useEffect(() => {
  //   if (!isNil(gunsData?.deviceId)) {
  //     const parentDeviceId = gunIdsMapToDeviceId.get(gunsData.deviceId);
  //     const ceil = ceilsConfig.find((c) => c.deviceId === parentDeviceId);
  //     if (ceil && ceil.chargingGuns) {
  //       ceil.chargingGuns = ceil.chargingGuns.map((gun) => {
  //         if (gun.deviceId === gunsData?.deviceId) {
  //           gun.status = gunsData.Status ?? GunStatus.IDLE;
  //         }
  //         return gun;
  //       });
  //       setCeilsConfig((preValue) => [...preValue]);
  //     }
  //   }
  // }, [ceilsConfig, gunsData]);

  const addDevicePropsToCeilAccordingMark = (deviceList: DeviceInfoType[]) => {
    if (isEmpty(deviceList)) {
      return;
    }
    const newCeilsConfig = [...ceilsConfig];
    deviceList.forEach((device) => {
      const { mark } = device;
      if (!isNil(mark)) {
        const ceil = find(newCeilsConfig, (it) => it?.mark === mark);
        if (!ceil) {
          return;
        }
        Object.assign(ceil, device);

        if (!device.chargingGuns || !device.deviceId) {
          return;
        }
        device.chargingGuns.forEach((gunInfo) => {
          gunIdsMapToDeviceId.set(gunInfo.deviceId, device.deviceId as number);
        });
      }
    });
    setCeilsConfig(newCeilsConfig);
  };

  useRequest(getDeviceList, {
    onSuccess: (res) => {
      addDevicePropsToCeilAccordingMark(res);
      // readyToWatchGunStatus();
    },
  });

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(DEFAULT_DEVICE_INFO);
  const [openDeviceInfo, setOpenDeviceInfo] = useState(false);
  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
    setOpenDeviceInfo(false);
  };
  const handleGeometry = (cell: CellConfigItem) => {
    const { deviceId, deviceType, loopNum, mark, deviceName } = cell;

    if (!deviceId || !deviceType) {
      message.error('该设备未配置');
      return;
    }
    setOpenDeviceInfo(true);
    setDeviceInfo({
      deviceId,
      deviceType,
      loopNum,
      mark,
      deviceName,
    });
  };

  const { run: runForBindDeviceMark } = useRequest(bindDeviceMark, { manual: true });
  const [openBindDevice, { setTrue, setFalse }] = useBoolean(false);
  const onContextMenu = useCallback((e: MouseEvent, cell: CellConfigItem) => {
    e.stopPropagation();
    e.preventDefault();
    setTrue();

    const { deviceId, deviceType, loopNum, mark, deviceName } = cell;
    setDeviceInfo({
      deviceId,
      deviceType,
      loopNum,
      mark,
      deviceName,
    });
  }, []);

  const onBindDevice = async (value: BindDeviceType[]) => {
    const { mark } = deviceInfo;
    console.log(value, mark);
    if (!mark) {
      return;
    }

    let selectedDevice = value;
    if (isEmpty(selectedDevice)) {
      selectedDevice = [{ id: null, deviceName: '' }];
    }
    const { id: deviceId, deviceName } = selectedDevice[0];
    try {
      const params = {
        mark: mark as DeviceMark,
      };
      if (!isNil(deviceId)) {
        Object.assign(params, { deviceId });
      }
      await runForBindDeviceMark(params);
      addDevicePropsToCeilAccordingMark([{ ...params, ...{ deviceName } }]);
    } catch (error) {}
  };

  const ceils = useMemo<ReactNode[]>(() => {
    return ceilsConfig.map((cell) => {
      const { cellStyle = {} as CellStyle } = cell;
      const shouldSupportClick = cellStyle?.cursor !== 'default';
      console.log(cellStyle);

      return (
        <Cell
          key={cell.key}
          zIndex={4}
          onClick={() => shouldSupportClick && handleGeometry(cell)}
          onContextMenu={(e: Event) => shouldSupportClick && onContextMenu(e, cell)}
          {...cellStyle}
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
              {/* <div className={styles.leftGun}>
                <Lottie width={14} height={32} animationData={ChargingLeft} />
              </div>
              <div className={styles.rightGun}>
                <Lottie width={14} height={32} animationData={ChargingRight} />
              </div> */}
            </div>
          </div>
        </Cell>
      );
    });
  }, [ceilsConfig, onContextMenu]);

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
      <DeviceDialog open={openDeviceInfo} onCancel={closeDialog} {...deviceInfo} />
      <Cell width={865} height={390} left={142} top={86}>
        <EnergyFlowLine />
        <EnergyFlowAnimation />
      </Cell>
      {ceils}
    </Cell>
  );
};

export default Geometry;
