/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-27 19:08:24
 * @LastEditTime: 2023-07-27 19:08:24
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\config.ts
 */
import type { BasicDataNode } from 'rc-tree';
import type { DataNode } from 'antd/lib/tree';
import { DeviceDataType } from '@/services/equipment';

export type TreeNode = BasicDataNode & DataNode & DeviceDataType;
