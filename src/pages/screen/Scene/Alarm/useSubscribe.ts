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
  const { connection } = useWebsocket(true);

  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: DeviceAlarm[] }) => {
    if (MessageEventType.DEVICE_EVENT_DATA === res?.type) {
      const { data: msgData } = res;
      try {
        const alarmList = msgData.filter((it) => it.level !== AlarmLevel.info);
        const { length: alarmLen } = alarmList;
        if (alarmLen) {
          setAlarmDeviceTree((prevData) => {
            alarmList.forEach((alarm) => {
              prevData[alarm.deviceId] = prevData?.[alarm.deviceId] || [];
              if (alarm.status === AlarmStatus.RESOLVED) {
                remove(prevData[alarm.deviceId], (_) => _.deviceId === alarm.deviceId);
              } else {
                prevData[alarm.deviceId].push(alarm);
              }
            });
            return { ...prevData };
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
    connection.onOpen(() => {
      setAlarmDeviceTree({}); //初始化数据，防止告警数量叠加
    });
    connection.sendMessage({
      data: {
        command: RequestCommandEnum.SUBSCRIBE,
        params: {
          siteId: getSiteId(),
        },
      },
      type: MessageEventType.DEVICE_EVENT_DATA,
    });
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
