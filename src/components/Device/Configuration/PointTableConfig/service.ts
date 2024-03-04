import { downLoadZip } from '@/utils/downloadfile';
export const download = (deviceId: string) => {
  return downLoadZip(`/iot/jx/exportConfig?deviceId=${deviceId}`);
};

// export const exportList = (data: any) => {
//   return request('/iot/alarm/export', {
//     method: 'POST',
//     data,
//     responseType: 'blob',
//   });
// };
