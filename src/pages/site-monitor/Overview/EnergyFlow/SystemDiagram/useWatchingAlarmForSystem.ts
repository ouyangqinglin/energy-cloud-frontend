import { useEffect, useCallback, useState, useMemo } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import { isEmpty, remove } from 'lodash';
import type { SiteAlarm, SubsystemType } from './type';
import { AlarmLevel, AlarmStatus } from './type';

export type AlarmTreeData = Record<`${SubsystemType}`, SiteAlarm[]>;

export const useWatchingAlarmForSystem = (siteId: number) => {
  const [alarmSubsystemTree, setAlarmSubsystemTree] = useState<AlarmTreeData>({});
  const { connection } = useWebsocket(true);

  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: SiteAlarm[] }) => {
    if (MessageEventType.DEVICE_EVENT_DATA === res?.type) {
      const { data: msgData } = res;
      try {
        const alarmList = msgData.filter((it) => it.level !== AlarmLevel.info);
        const { length: alarmLen } = alarmList;
        if (alarmLen) {
          alarmList.forEach((alarm) => {
            const deviceAlarmList = alarmSubsystemTree?.[alarm.subsystemId] ?? [];
            if (isEmpty(deviceAlarmList)) {
              alarmSubsystemTree[alarm.subsystemId] = deviceAlarmList;
            }
            const toResolveAlarm = alarm.status === AlarmStatus.RESOLVED;
            if (toResolveAlarm) {
              remove(deviceAlarmList, (_) => _.subsystemId === alarm.subsystemId);
            } else {
              deviceAlarmList.push(alarm);
            }
            setAlarmSubsystemTree({ ...alarmSubsystemTree });
          });
        }
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (!siteId) {
      return;
    }
    connection.sendMessage({
      data: {
        command: RequestCommandEnum.SUBSCRIBE,
        params: {
          siteId,
        },
      },
      type: MessageEventType.DEVICE_EVENT_DATA,
    });
    // connection.mock({
    //   data: [
    //     {
    //       alarmTime: '2023-06-10 13:54:54',
    //       content: '模块拨码地址错误',
    //       detailInfo: '{"val":1}',
    //       deviceId: 10390,
    //       deviceName: 'PCS',
    //       fromResource: 0,
    //       functionKey: 'moduleDialAddressErrorEvent',
    //       id: 827388908745580500,
    //       isConfirm: 0,
    //       level: 'error',
    //       name: '模块拨码地址错误',
    //       productTypeName: '工商业储能',
    //       status: 0,
    //       subsystemId: 1,
    //     },
    //   ],
    //   type: 2,
    // });

    // setTimeout(() => {
    //   connection.mock({
    //     data: [
    //       {
    //         alarmTime: '2023-06-10 13:54:54',
    //         content: '模块拨码地址错误',
    //         detailInfo: '{"val":1}',
    //         deviceId: 10390,
    //         deviceName: 'PCS',
    //         fromResource: 0,
    //         functionKey: 'moduleDialAddressErrorEvent',
    //         id: 827388908745580500,
    //         isConfirm: 0,
    //         level: 'error',
    //         name: '模块拨码地址错误',
    //         productTypeName: '工商业储能',
    //         status: 1,
    //         subsystemId: 1,
    //       },
    //     ],
    //     type: 2,
    //   });
    // }, 20000);
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      if (!siteId) {
        return;
      }
      setAlarmSubsystemTree({});
      connection.removeReceivedMessageCallback(onReceivedMessage);
      connection.sendMessage({
        data: {
          command: RequestCommandEnum.UNSUBSCRIBE,
          params: {
            siteId,
          },
        },
        type: MessageEventType.DEVICE_EVENT_DATA,
      });
    };
  }, [connection, onReceivedMessage, siteId]);

  return {
    alarmSubsystemTree,
  };
};
