/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 14:44:03
 * @LastEditTime: 2023-07-13 15:54:42
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useSubscribe.ts
 */
import { useEffect, useCallback, useState, useMemo } from 'react';
import useWebsocket from './useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { EquipPropType, AnyMapType } from '@/utils/dictionary';

const useSubscribe = (id: string | string[], open: boolean) => {
  const ids = useMemo(() => {
    return Array.isArray(id) ? id : id ? [id] : [];
  }, [id]);
  const [data, setData] = useState<AnyMapType>({});
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback(
    (res: any) => {
      if (
        MessageEventType.DEVICE_REAL_TIME_DATA === res?.type &&
        ids.find((item) => item == res?.data?.deviceId)
      ) {
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
    [ids],
  );

  useEffect(() => {
    setData({});
    if (open && ids.length) {
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
  }, [open, ids]);

  return data;
};

export default useSubscribe;
