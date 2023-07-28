import { useEffect, useCallback, useState } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { DeviceLog } from './type';
import { getSiteId } from '../helper';

export default () => {
  const [data, setData] = useState<DeviceLog[]>([]);
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback((res: { type: MessageEventType; data: DeviceLog[] }) => {
    if (MessageEventType.DEVICE_LOG === res?.type) {
      const { data: msgData } = res;
      try {
        setData((prevData) => [...msgData, ...prevData]);
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
      type: MessageEventType.DEVICE_LOG,
    });
    // connection.mock();
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
  }, [connection, onReceivedMessage]);

  return data;
};
