import { useEffect, useCallback } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import { EquipPropType } from '@/utils/dictionary';

export default (id: string, open: boolean, cb: (res: any) => void) => {
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback(
    (res: any) => {
      if (MessageEventType.DEVICE_REAL_TIME_DATA === res?.type && id == res?.data?.deviceId) {
        const { data } = res;
        try {
          const obj = {};
          data?.keyValues?.forEach?.((item: EquipPropType) => {
            obj[item.key] = item.value;
          });
          if (Object.keys(obj).length) {
            cb(obj);
          }
        } catch (e) {}
      }
    },
    [id],
  );

  useEffect(() => {
    if (open && id) {
      connection.sendMessage({
        data: {
          command: RequestCommandEnum.SUBSCRIBE,
          params: [
            {
              device: id,
            },
          ],
        },
        type: MessageEventType.DEVICE_REAL_TIME_DATA,
      });
    }
    connection.addReceivedMessageCallback(onReceivedMessage);
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
    // 待优化
  }, [open, id]);
};
