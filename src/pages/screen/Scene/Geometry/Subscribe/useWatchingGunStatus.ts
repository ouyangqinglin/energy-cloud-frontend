import { useCallback, useState } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { EquipPropType, AnyMapType } from '@/utils/dictionary';
import type { GunStatus } from '../type';

type GunData = { Status?: GunStatus; deviceId: number };

export const useWatchingGunStatus = () => {
  const [data, setData] = useState<GunData>({} as GunData);
  const [idsStore, setIdsStore] = useState<number[]>([]);
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback(
    (res: any) => {
      const { data: msgData } = res;
      const { deviceId } = msgData?.data;
      if (
        MessageEventType.DEVICE_REAL_TIME_DATA === res?.type &&
        idsStore.find((item) => item == deviceId)
      ) {
        try {
          const obj = {} as { Status: GunStatus };
          msgData?.keyValues?.forEach?.((item: EquipPropType) => {
            obj[item.key] = item.value;
          });
          if (Object.keys(obj).length) {
            setData({ deviceId, ...obj });
          }
        } catch (e) {}
      }
    },
    [idsStore],
  );

  return {
    data,
    run: (ids: number[]) => {
      if (ids.length) {
        setIdsStore(ids);
        connection.sendMessage({
          data: {
            command: RequestCommandEnum.SUBSCRIBE,
            params: ids.map((item) => ({
              device: item,
            })),
          },
          type: MessageEventType.DEVICE_REAL_TIME_DATA,
        });
        connection.addReceivedMessageCallback(onReceivedMessage);
      }
      return () => {
        connection.removeReceivedMessageCallback(onReceivedMessage);
      };
      // 待优化
    },
  };
};
