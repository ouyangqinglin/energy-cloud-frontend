/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-17 16:03:16
 * @LastEditTime: 2023-10-17 16:03:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\helper.ts
 */
import { ModalProps } from 'antd';
import { DeviceModelType } from '@/types/device';

export type CollectionChartType = {
  title?: string;
  deviceId?: string;
  collection?: string;
  model?: DeviceModelType;
  date?: string[];
  height?: number | string;
};

export type CollectionModalType = Omit<ModalProps, 'title'> & CollectionChartType;
