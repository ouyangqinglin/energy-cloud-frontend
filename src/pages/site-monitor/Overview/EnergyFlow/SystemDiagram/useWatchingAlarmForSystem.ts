import { useEffect, useCallback, useState, useMemo } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import { isEmpty, remove } from 'lodash';
import type { SiteAlarm, SubsystemType } from './type';
import { AlarmLevel, AlarmStatus } from './type';

export type AlarmTreeData = {
  [p in SubsystemType]?: number;
};

export const useWatchingAlarmForSystem = (siteId: number) => {
  const [alarmSubsystemTree, setAlarmSubsystemTree] = useState<AlarmTreeData>({});
  const { connection } = useWebsocket(true);
  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: SiteAlarm[] }) => {
    if (MessageEventType.DEVICE_EVENT_DATA === res?.type) {
      const { data: msgData } = res;
      try {
        setAlarmSubsystemTree((prevData) => {
          msgData.forEach((item) => {
            if (item.level !== AlarmLevel.info) {
              let value = prevData[item.subsystemId] || 0;
              if (item.status === AlarmStatus.RESOLVED) {
                if (value) {
                  value--;
                }
              } else {
                value++;
              }
              prevData[item.subsystemId] = value;
            }
          });
          return { ...prevData };
        });
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    setAlarmSubsystemTree({});
  }, [siteId]);

  useEffect(() => {
    if (!siteId) {
      return;
    }
    setAlarmSubsystemTree({});
    connection.onOpen(() => {
      setAlarmSubsystemTree({});
    });
    connection.sendMessage({
      data: {
        command: RequestCommandEnum.SUBSCRIBE,
        params: {
          siteId,
        },
      },
      type: MessageEventType.DEVICE_EVENT_DATA,
    });
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      if (!siteId) {
        return;
      }
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
