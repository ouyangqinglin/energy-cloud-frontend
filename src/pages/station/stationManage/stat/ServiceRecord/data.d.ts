/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-19 17:11:19
 * @LastEditTime: 2023-06-19 17:11:23
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\stat\ServiceRecord\data.d.ts
 */
export type ServiceRecordType = {
  id: string;
  serviceType: number;
  taskId: string;
  maintenanceStaff: string;
  currentProgress: string;
  appointmentTime: string;
  endTime: string;
};

export type AgentFormType = {
  name: string;
  id: string;
  status: number;
  phone: string;
  service: string;
  remark: string;
};
