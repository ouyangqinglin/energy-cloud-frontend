import { useEffect, useCallback, useState } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { DeviceAlarm } from './type';
import { AlarmLevel } from './type';
import { getSiteId } from '../helper';

export default () => {
  const [data, setData] = useState<DeviceAlarm[]>([]);
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: DeviceAlarm[] }) => {
    if (MessageEventType.DEVICE_EVENT_DATA === res?.type) {
      const { data: msgData } = res;
      try {
        setData((prevData) => [
          ...prevData,
          ...msgData.filter((it) => it.level !== AlarmLevel.info),
        ]);
      } catch (e) {}
    }
  }, []);

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
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
  }, [connection, onReceivedMessage]);

  return data;
};
