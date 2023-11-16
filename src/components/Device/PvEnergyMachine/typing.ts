/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-15 17:05:04
 * @LastEditTime: 2023-11-15 17:05:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\PvEnergyMachine\typing.ts
 */

import React from 'react';
import { DetailItem } from '@/components/Detail';

export type OverviewItemType = {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  style: React.CSSProperties;
  items?: DetailItem[];
};
