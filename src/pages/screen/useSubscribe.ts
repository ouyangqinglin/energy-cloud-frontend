import { useEffect, useCallback, useState } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import { EquipPropType, AnyMapType } from '@/utils/dictionary';

export default (id: string, open: boolean) => {
  const [data, setData] = useState<AnyMapType>({});
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback(
    (res: any) => {
      if (MessageEventType.DEVICE_REAL_TIME_DATA === res?.type && id == res?.data?.deviceId) {
        const { data: msgData } = res;
        try {
          const obj = {};
          msgData?.keyValues?.forEach?.((item: EquipPropType) => {
            obj[item.key] = item.value;
          });
          if (Object.keys(obj).length) {
            setData((prevData) => ({ ...prevData, ...obj }));
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
      connection.addReceivedMessageCallback(onReceivedMessage);
    }
    return () => {
      connection.removeReceivedMessageCallback(onReceivedMessage);
    };
    // 待优化
  }, [open, id]);

  return data;
};
