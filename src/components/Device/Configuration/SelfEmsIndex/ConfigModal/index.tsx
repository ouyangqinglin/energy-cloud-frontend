/*
 *@Author: aoshilin
 *@Date: 2023-11-03 15:25:48
 *@parms: 自研ems详情-配置--系统化设置
 *@Description:
 */
import React, { useState, useEffect, useCallback } from 'react';
import type { ProtectFormType, RemoteSettingDataType } from './config';
import Button from 'antd/lib/button';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { useBoolean } from 'ahooks';
import { editSetting, editEquipConfig } from '@/services/equipment';
import { message } from 'antd';
export type StackProps = {
  deviceId: string;
  productId: string;
  realTimeData?: Record<string, any>;
  columns: any;
  serviceId: string;
  title: string;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, columns, serviceId, title, productId } = props;
  const [open, { set, setTrue }] = useBoolean(false);
  const [initialValues, setInitialValues] = useState<ProtectFormType['realTimeData']>();

  useEffect(() => {
    if (!open) {
      setInitialValues({ ...realTimeData });
    }
  }, [realTimeData, open, serviceId]);
  const beforeSubmit = useCallback(
    (formData: any) => {
      let result: RemoteSettingDataType<ProtectFormType['realTimeData']> = {
        deviceId,
        input: formData,
        serviceId,
      };
      if (serviceId === 'report') {
        result = {
          deviceId,
          productId,
          paramConfigType: realTimeData && realTimeData.paramConfigType,
          config: JSON.stringify(formData),
        };
      }
      //尖峰平谷时段设置
      if (serviceId === 'PeakAndValleyTimeSettings') {
        if (formData.ElectrovalenceTimeFrame.length > 0) {
          const timeFormData = formData.ElectrovalenceTimeFrame.map((item: any) => {
            return {
              ...item,
              ElectrovalenceType: item.ElectrovalenceType,
              TimeFrame: item.TimeFrame[0] + '-' + item.TimeFrame[1],
            };
          });
          result = {
            deviceId,
            input: { ...formData, ElectrovalenceTimeFrame: timeFormData },
            serviceId,
          };
        }
      }
      return result;
    },
    [deviceId, productId, realTimeData, serviceId],
  );
  const onSuccess = useCallback(() => {
    message.success('下发成功');
  }, []);
  return (
    <>
      <div>
        <Button type="primary" onClick={setTrue}>
          配置参数
        </Button>
        <SchemaForm
          open={open}
          onOpenChange={set}
          title={title}
          width={'50%'}
          type={FormTypeEnum.Edit}
          columns={columns}
          initialValues={initialValues}
          editData={serviceId === 'report' ? editEquipConfig : editSetting}
          beforeSubmit={beforeSubmit}
          onSuccess={onSuccess}
        />
      </div>
    </>
  );
};

export default SystemSetting;
