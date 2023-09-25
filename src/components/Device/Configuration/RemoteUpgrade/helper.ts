/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 14:42:02
 * @LastEditTime: 2023-09-25 14:42:06
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpdate\helper.ts
 */

import { DetailItem } from '@/components/Detail';
import { UpgradeDataType } from './typing';

export const upgradeItems: DetailItem[] = [
  { label: '当前版本', field: 'nowVersion' },
  {
    label: '可升级版本',
    field: 'upgradeableVersionVOList',
    format: (value: UpgradeDataType[]) => {
      return value
        ?.map?.((item) => {
          return item.version + (item?.status === 0 ? '(禁用)' : '');
        })
        ?.join('，');
    },
  },
];
