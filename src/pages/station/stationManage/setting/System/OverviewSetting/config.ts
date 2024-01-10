/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-03 09:54:35
 * @LastEditTime: 2023-08-25 16:24:57
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\setting\System\OverviewSetting\config.ts
 */
import { ProFormColumnsType } from '@ant-design/pro-components';
import { enableStatus } from '@/utils/dict';
import { getEnergyList } from './service';
import { ConfigDataType, AlarmConfigDataType } from '@/services/station';
import { formatMessage } from '@/utils';

export type EnergyOptionType = {
  id?: string;
  name?: string;
};

export const columns: ProFormColumnsType<ConfigDataType>[] = [
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'status',
    valueType: 'radio',
    valueEnum: enableStatus,
    initialValue: '0',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'system.Notice.select_status',
            defaultMessage: '请选择状态',
          }),
        },
      ],
    },
  },
  {
    title: formatMessage({ id: 'common.screenArchitecture', defaultMessage: '架构图' }),
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
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'system.Notice.select_energy_flow_diagram',
            defaultMessage: '请选择能流图',
          }),
        },
      ],
    },
    fieldProps: {
      mode: 'multiple',
    },
  },
];

export const alarmcolumns: ProFormColumnsType<AlarmConfigDataType>[] = [
  {
    title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
    dataIndex: 'alarmShow',
    valueType: 'radio',
    valueEnum: enableStatus,
    // initialValue: '0',
    formItemProps: {
      rules: [
        {
          required: true,
          message: formatMessage({
            id: 'system.Notice.select_status',
            defaultMessage: '请选择状态',
          }),
        },
      ],
    },
  },
];
