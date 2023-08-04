/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-03 09:54:35
 * @LastEditTime: 2023-08-03 10:40:21
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\OverviewSetting\config.ts
 */
import { ProFormColumnsType } from '@ant-design/pro-components';
import { enableStatus } from '@/utils/dictionary';
import { getEnergyList } from './service';
import { ConfigDataType } from '@/services/station';

export type EnergyOptionType = {
  id?: string;
  name?: string;
};

export const columns: ProFormColumnsType<ConfigDataType>[] = [
  {
    title: '状态',
    dataIndex: 'status',
    valueType: 'radio',
    valueEnum: enableStatus,
    formItemProps: {
      rules: [{ required: true, message: '请选择状态' }],
    },
  },
  {
    title: '能流图',
    dataIndex: 'energyFlowDiagramIds',
    valueType: 'select',
    request: () => {
      return getEnergyList().then(({ data }) => {
        return data?.map?.((item) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });
      });
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择能流图' }],
    },
    fieldProps: {
      mode: 'multiple',
    },
  },
];
