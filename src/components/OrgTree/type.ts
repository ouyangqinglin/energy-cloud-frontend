/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-21 11:00:05
 * @LastEditTime: 2023-07-10 11:45:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\OrgTree\type.ts
 */

import type { BasicDataNode } from 'rc-tree';
import type { DataNode } from 'antd/lib/tree';

export enum OrgTypeEnum {
  Site = 'site',
  Service = 'service',
}

export type TreeNode = BasicDataNode &
  DataNode & {
    id?: string | number;
    name?: string;
    type?: OrgTypeEnum;
    parentId?: number;
    children?: TreeNode[];
  };

export type TreeData = TreeNode[];
