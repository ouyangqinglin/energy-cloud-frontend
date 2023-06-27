import { useEffect, useCallback, useState, useMemo } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import { AlarmStatus, DeviceAlarm } from './type';
import { AlarmLevel } from './type';
import { getSiteId } from '../helper';
import { isEmpty, remove } from 'lodash';

export type AlarmTreeData = Record<string, DeviceAlarm[]>;

export const useWatchingAlarm = () => {
  const [alarmDeviceTree, setAlarmDeviceTree] = useState<AlarmTreeData>({});
  const [latestAlarm, setLatestAlarm] = useState<DeviceAlarm>();
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: DeviceAlarm[] }) => {
    if (MessageEventType.DEVICE_EVENT_DATA === res?.type) {
      const { data: msgData } = res;
      console.log(msgData);

      try {
        const alarmList = msgData.filter((it) => it.level !== AlarmLevel.info);
        const { length: alarmLen } = alarmList;
        if (alarmLen) {
          alarmList.forEach((alarm) => {
            const deviceAlarmList = alarmDeviceTree?.[alarm.deviceId] ?? [];
            if (isEmpty(deviceAlarmList)) {
              alarmDeviceTree[alarm.deviceId] = deviceAlarmList;
            }
            const toResolveAlarm = alarm.status === AlarmStatus.RESOLVED;
            if (toResolveAlarm) {
              remove(deviceAlarmList, (_) => _.deviceId === alarm.deviceId);
            } else {
              deviceAlarmList.push(alarm);
            }
            setAlarmDeviceTree({ ...alarmDeviceTree });
          });
          setLatestAlarm(alarmList[alarmLen - 1]);
        }
      } catch (e) {}
    }
  }, []);

  const alarmCount = useMemo(() => {
    const alarmCollection = Object.values(alarmDeviceTree);
    if (!isEmpty(alarmCollection)) {
      return alarmCollection.reduce((count, cur) => {
        return count + cur.length;
      }, 0);
    }
    return 0;
  }, [alarmDeviceTree]);

  useEffect(() => {
    connection.sendMessage({
      data: {
        command: RequestCommandEnum.SUBSCRIBE,
        params: {
          siteId: getSiteId(),
        },
      },
      type: MessageEventType.DEVICE_EVENT_DATA,
    });
    connection.mock({
      data: [
        {
          alarmTime: '2023-06-10 13:54:54',
          content: '模块拨码地址错误',
          detailInfo: '{"val":1}',
          deviceId: 10278,
          deviceName: 'PCS',
          fromResource: 0,
          functionKey: 'moduleDialAddressErrorEvent',
          id: 827388908745580500,
          isConfirm: 0,
          level: 'error',
          name: '模块拨码地址错误',
          productTypeName: '工商业储能',
          status: 0,
        },
      ],
      type: 2,
    });

    setTimeout(() => {
      connection.mock({
        data: [
          {
            alarmTime: '2023-06-10 13:54:54',
            content: '模块拨码地址错误',
            detailInfo: '{"val":1}',
            deviceId: 10278,
            deviceName: 'PCS',
            fromResource: 0,
            functionKey: 'moduleDialAddressErrorEvent',
            id: 827388908745580500,
            isConfirm: 0,
            level: 'error',
            name: '模块拨码地址错误',
            productTypeName: '工商业储能',
            status: 1,
          },
        ],
        type: 2,
      });
    }, 20000);
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
  }, [connection, onReceivedMessage]);

  return {
    alarmCount,
    latestAlarm,
    alarmDeviceTree,
  };
};
