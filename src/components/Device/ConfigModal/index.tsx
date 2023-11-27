/*
 *@Author: aoshilin
 *@Date: 2023-11-03 15:25:48
 *@parms: 自研ems详情-配置--系统化设置
 *@Description:
 */
import React, { useState, useEffect, useCallback } from 'react';
import type { ProtectFormType, RemoteSettingDataType } from './config';
import Button from 'antd/lib/button';
import SchemaForm, { FormTypeEnum, SchemaFormProps } from '@/components/SchemaForm';
import { useBoolean } from 'ahooks';
import { editSetting, editEquipConfig } from '@/services/equipment';
import moment from 'moment';
export type StackProps = SchemaFormProps & {
  deviceId: string;
  realTimeData?: Record<string, any>;
  columns: any;
  serviceId: string;
  title: string;
};

const SystemSetting: React.FC<StackProps> = (props) => {
  const { realTimeData, deviceId, columns, serviceId, title, ...restProps } = props;
  const [open, { set, setTrue }] = useBoolean(false);
  const [isEditing, { setFalse: setIsEditingFalse, setTrue: setIsEditingTrue }] = useBoolean(false);
  const [initialValues, setInitialValues] = useState<ProtectFormType['realTimeData']>();

  const beforeSubmit = useCallback(
    (formData: any) => {
      let result: RemoteSettingDataType<ProtectFormType['realTimeData']> = {
        deviceId,
        input: formData,
        serviceId,
      };
      if (serviceId === 'correctionTime') {
        result.input = { correctionTime: moment(formData.correctionTime).valueOf() };
      }
      //尖峰平谷时段设置
      if (serviceId === 'PeakAndValleyTimeSettings') {
        if (formData.ElectrovalenceTimeFrame.length > 0) {
          const timeFormData = formData.ElectrovalenceTimeFrame.map((item: any) => {
            return {
              ...item,
              ElectrovalenceType: item.ElectrovalenceType,
              TimeFrame:
                moment('2023-01-01 ' + item.TimeFrame[0]).format('HH:mm') +
                '-' +
                moment('2023-01-01 ' + item.TimeFrame[1]).format('HH:mm'),
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
    [deviceId, realTimeData, serviceId],
  );

  const onClick = useCallback(() => {
    setTrue();
    setIsEditingFalse();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      setInitialValues({ ...realTimeData });
    }
  }, [realTimeData]);

  return (
    <>
      <div>
        <Button type="primary" onClick={onClick}>
          配置参数
        </Button>
        <SchemaForm
          onValuesChange={setIsEditingTrue}
          open={open}
          onOpenChange={set}
          title={title}
          width={'552px'}
          type={FormTypeEnum.Edit}
          columns={columns}
          className={'distributeParameters'}
          initialValues={initialValues}
          editData={serviceId === 'report' ? editEquipConfig : editSetting}
          beforeSubmit={beforeSubmit}
          grid={true}
          colProps={{
            span: 12,
          }}
          {...restProps}
        />
      </div>
    </>
  );
};

export default SystemSetting;
