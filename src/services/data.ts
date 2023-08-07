import request, { ResponseCommonData, ResponsePageData } from '@/utils/request';

export type CollectionDataType = {
  details?: {
    data?: {
      time?: string;
      collection?: {
        eventTs?: string;
        value?: number;
      }[];
    }[];
    deviceName?: string;
    startTime?: string;
    endTime?: string;
  }[];
};

export type CollectionSearchType = {
  devices?: {
    deviceId?: string;
    keys?: string[];
  }[];
  startTime?: string;
  endTime?: string;
  current?: number;
  pageSize?: number;
};

export const getCollectionData = (data: CollectionSearchType) => {
  return request<ResponseCommonData<CollectionDataType>>(
    `/iot/deviceData/deviceHistoryInformation`,
    {
      method: 'POST',
      data,
    },
  );
};
