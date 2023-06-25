import { useCallback, useState } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { EquipPropType } from '@/utils/dictionary';
import type { GunStatus } from '../type';

type GunData = { Status?: GunStatus; deviceId: number };

export const useWatchingGunStatus = () => {
  const [data, setData] = useState<GunData>({} as GunData);
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback((res: any, ids: number[]) => {
    const { data: msgData } = res;
    const { deviceId } = msgData;
    if (
      MessageEventType.DEVICE_REAL_TIME_DATA === res?.type &&
      ids.find((item) => item == deviceId)
    ) {
      try {
        const obj = {} as { Status: GunStatus };

        const isGunData = msgData?.keyValues?.find(({ key }) => {
          return key === 'Status';
        });
        if (!isGunData) {
          return;
        }

        msgData?.keyValues?.forEach?.((item: EquipPropType) => {
          obj[item.key] = item.value;
        });
        if (Object.keys(obj).length) {
          setData({ deviceId, ...obj });
        }
      } catch (e) {}
    }
  }, []);

  return {
    data,
    run: (ids: number[]) => {
      const cb = (res: any) => onReceivedMessage(res, ids);
      if (ids.length) {
        connection.sendMessage({
          data: {
            command: RequestCommandEnum.SUBSCRIBE,
            params: ids.map((item) => ({
              device: item,
            })),
          },
          type: MessageEventType.DEVICE_REAL_TIME_DATA,
        });
        // connection.mock(
        //   {
        //     data: {
        //       deviceId: 10303,
        //       keyValues: [
        //         {
        //           key: 'Status',
        //           type: 'STRING',
        //           value: 2,
        //         },
        //       ],
        //       msgType: 'post_properties',
        //     },
        //     type: 1,
        //   },
        //   15000,
        // );
        connection.addReceivedMessageCallback(cb);
      }
      return () => {
        connection.removeReceivedMessageCallback(cb);
      };
      // 待优化
    },
  };
};
