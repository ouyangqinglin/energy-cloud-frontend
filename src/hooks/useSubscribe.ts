/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 14:44:03
 * @LastEditTime: 2023-10-19 17:43:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\hooks\useSubscribe.ts
 */
import { useEffect, useCallback, useState, useMemo } from 'react';
import useWebsocket from './useWebsocket';
import { MessageEventType, RequestCommandEnum } from '@/utils/connection';
import type { EquipPropType, AnyMapType } from '@/utils/dictionary';
import { parseToObj } from '@/utils';

const flatObj = (data: Record<string, any>, parentField = '') => {
  let result: Record<string, any> = {};
  if (typeof data !== 'object' || Array.isArray(data)) {
    result = {};
  } else {
    for (const key in data) {
      const field = parentField ? parentField + '.' + key : key;
      if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
        result = { ...result, ...flatObj(data[key], field) };
      } else {
        result[field] = data[key];
      }
    }
  }
  return result;
};

const useSubscribe = (
  id: undefined | string | string[],
  open: boolean,
  type?: MessageEventType,
) => {
  const ids = useMemo(() => {
    return Array.isArray(id) ? id : id ? [id] : [];
  }, [id]);
  const [data, setData] = useState<AnyMapType>({ ids });
  const { connection } = useWebsocket();

  const onReceivedMessage = useCallback(
    (res: any) => {
      if (
        MessageEventType.DEVICE_REAL_TIME_DATA === res?.type &&
        ids.find((item) => item == res?.data?.deviceId)
      ) {
        const { data: msgData } = res;
        try {
          let obj: Record<string, any> = {};
          msgData?.keyValues?.forEach?.((item: EquipPropType) => {
            if (item.type == 'JSON') {
              const value = parseToObj(item.value + '');
              obj = { ...obj, ...flatObj(value, item?.key) };
            }
            obj[item.key] = item.value;
          });
          if (Object.keys(obj).length) {
            setData((prevData) => ({
              ...prevData,
              ...obj,
              [msgData?.deviceId]: {
                ...prevData?.[msgData?.deviceId],
                ...obj,
              },
            }));
          }
        } catch (e) {}
      }
    },
    [ids],
  );

  useEffect(() => {
    setData({
      ids,
    });
    if (open && ids.length) {
      connection.sendMessage({
        data: {
          command: RequestCommandEnum.SUBSCRIBE,
          params: ids.map((item) => ({
            device: item,
          })),
        },
        type: type ?? MessageEventType.DEVICE_REAL_TIME_DATA,
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
