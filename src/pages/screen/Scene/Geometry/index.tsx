import BackgroundBottom from '@/assets/image/screen/Geometry/background_bottom.png';
import BackgroundTop from '@/assets/image/screen/Geometry/background_top.png';
import BackgroundRight from '@/assets/image/screen/Geometry/background_right.png';
import BackgroundPark from '@/assets/image/screen/Geometry/background_park.png';
import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';
import { useMemo, useRef } from 'react';
import { useState } from 'react';
import { chargingStackCeils } from './config';
import { otherCeils } from './configOtherDevice';
import EnergyFlowAnimation from './EnergyFlowAnimation';
import styles from './index.less';
import DeviceDialog from './Dialog';
import type {
  CellConfigItem,
  CellStyle,
  ChargingGun,
  DeviceInfoType,
  DeviceMark,
  DeviceStatusRes,
} from './type';
import { GunStatus } from './type';
import { bindDeviceMark, getDeviceStatus } from './service';
import { useRequest } from 'umi';
import { assignIn, find, isEmpty, isNil } from 'lodash';
import useResize from './useResize';
import { useBoolean } from 'ahooks';
import { message } from 'antd';
import Cell from '../../components/LayoutCell';
import EnergyFlowLine from './EnergyFlowAnimation/EnergyFlowLine';
import BindDevice from './Dialog/BindDevice';
import { useWatchingGunStatus } from './Subscribe/useWatchingGunStatus';
import CeilGun from './Gun';
import type { AlarmTreeData } from '../Alarm/useSubscribe';
import { formatMessage, getLocale } from '@/utils';
const isUS = getLocale().isEnUS;

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

const Geometry = ({
  alarmDeviceTree,
  alarmShow,
}: {
  alarmDeviceTree: AlarmTreeData;
  alarmShow: boolean;
}) => {
  const [ceilsConfig, setCeilsConfig] = useState(
    [...otherCeils, ...chargingStackCeils].map((item, index) => {
      if (item?.cellStyle) {
        item.cellStyle.zIndex = index + 1;
      }
      return item;
    }),
  );

  const addDevicePropsToCeilAccordingMark = (deviceList: DeviceInfoType[]) => {
    if (isEmpty(deviceList)) {
      return;
    }
    const newCeilsConfig = [...ceilsConfig];
    deviceList.forEach((device) => {
      const { mark, deviceId } = device;
      if (!isNil(mark) || !isNil(deviceId)) {
        const ceil = find(newCeilsConfig, (it) => it?.mark === mark || it?.deviceId === deviceId);

        if (!ceil) {
          return;
        }
        assignIn(ceil, device);

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

  // 监听设备告警状态
  useEffect(() => {
    if (isEmpty(alarmDeviceTree)) {
      return;
    }

    const readyAlarmDevices = Object.entries(alarmDeviceTree).map(([deviceId, alarmList]) => {
      return {
        deviceId: Number(deviceId),
        alarmStatus: {
          status: !!alarmList.length,
        },
      } as unknown as DeviceInfoType;
    });

    addDevicePropsToCeilAccordingMark(readyAlarmDevices);
  }, [alarmDeviceTree]);

  // 订阅监听充电桩状态
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
  useEffect(() => {
    if (!isNil(gunsData?.deviceId)) {
      if (window.DEVTOOL) {
        console.log('[ws] gunsData: ', gunsData);
      }
      const parentDeviceId = gunIdsMapToDeviceId.get(gunsData.deviceId);
      const index = ceilsConfig.findIndex((c) => c.deviceId === parentDeviceId);
      const ceil = index >= 0 ? ceilsConfig[index] : null;
      if (ceil && ceil.chargingGuns) {
        ceil.chargingGuns = ceil.chargingGuns.map((gun) => {
          if (gun.deviceId === gunsData?.deviceId) {
            gun.status = gunsData.Status ?? GunStatus.IDLE;
          }
          return gun;
        });
        setCeilsConfig((preValue) => {
          const newValue = [...preValue];
          newValue[index] = { ...ceil };
          return newValue;
        });
      }
    }
  }, [gunsData]);

  /**
   * 将后端的数据格式转为前端的数据格式
   * @param res DeviceStatusRes
   * @returns DeviceInfoType[]
   */
  const convertResDataToList = (res: DeviceStatusRes) => {
    const deviceListRes = Object.values(res);
    const deviceList: DeviceInfoType[] = [];
    if (deviceListRes.length) {
      deviceListRes.forEach(
        ({ deviceId, mark, alarmStatus, directionStatus, childer, directionPower }) => {
          const device: DeviceInfoType = {
            deviceId,
            mark,
            alarmStatus: { status: !alarmStatus },
            directionStatus,
            directionPower,
            chargingGuns: [],
          };
          if (childer) {
            const chargingGuns = Object.values(childer);
            chargingGuns.forEach(({ deviceId: gunDeviceId, name, status, num }) => {
              const gun: ChargingGun = {
                deviceId: gunDeviceId,
                name,
                status,
                mark: num,
              };
              device?.chargingGuns?.push(gun);
            });
          }
          deviceList.push(device);
        },
      );
    }
    return deviceList;
  };
  useRequest(getDeviceStatus, {
    onSuccess: (res) => {
      const deviceList = convertResDataToList(res);
      addDevicePropsToCeilAccordingMark(deviceList);
      readyToWatchGunStatus();
    },
  });

  // 展示设备详情
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfoType>(DEFAULT_DEVICE_INFO);
  const [openDeviceInfo, setOpenDeviceInfo] = useState(false);
  const closeDialog = () => {
    setDeviceInfo({ ...DEFAULT_DEVICE_INFO });
    setOpenDeviceInfo(false);
  };
  const handleGeometry = (cell: CellConfigItem) => {
    const { deviceId, deviceType, loopNum, mark, deviceName } = cell;

    if (!deviceId || !deviceType) {
      message.error(
        formatMessage({ id: 'screen.deviceNotConfigured', defaultMessage: '该设备未配置' }),
      );
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

  // 绑定设备
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
  const bindingDeviceValue = useMemo(() => {
    if (isNil(deviceInfo?.deviceId)) {
      return [];
    }
    return [
      {
        id: deviceInfo.deviceId as number,
        deviceName: deviceInfo.deviceName,
      },
    ];
  }, [deviceInfo]);

  // 操作一次图面板
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const { resize } = useResize(sceneWrapperRef.current);
  const sceneWrapper = {
    transform: `scale(${resize})`,
  };

  const ceils = useMemo<ReactNode[]>(() => {
    return ceilsConfig.map((cell) => {
      const { cellStyle = {} as CellStyle, alarmStatus, alarmConfig } = cell;
      const shouldSupportClick = cellStyle?.cursor !== 'default';

      return (
        <Cell
          key={cell.key}
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
              {alarmShow && alarmStatus?.status && alarmConfig ? (
                <div
                  className={isUS ? styles.deviceAlarmUS : styles.deviceAlarm}
                  style={{
                    left: alarmConfig?.left ?? 0,
                    top: alarmConfig?.top ?? 0,
                    height: alarmConfig?.height ?? 43,
                    width: alarmConfig?.width ?? 64,
                  }}
                />
              ) : (
                <></>
              )}
              <CeilGun ceil={cell} />
            </div>
          </div>
        </Cell>
      );
    });
  }, [ceilsConfig, onContextMenu]);

  return (
    <Cell
      ref={sceneWrapperRef}
      width={1040}
      height={682}
      left={441}
      top={221}
      zIndex={0}
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
        value={bindingDeviceValue}
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
