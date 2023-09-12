/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-12 10:27:00
 * @LastEditTime: 2023-09-12 11:34:39
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteSetting\Ems\ProtectForm\index.tsx
 */
import { Button } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { ProtectFormType } from '../typing';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns } from './helper';
import { useBoolean } from 'ahooks';
import { editSetting } from '@/services/equipment';
import { RemoteSettingDataType } from '../../typing';

const ProtectForm: React.FC<ProtectFormType> = (props) => {
  const { deviceId, protectData, onSuccess } = props;

  const [initialValues, setInitialValues] = useState<ProtectFormType['protectData']>();
  const [open, { set, setTrue }] = useBoolean(false);

  const beforeSubmit = useCallback(
    (formData: any) => {
      const result: RemoteSettingDataType<ProtectFormType['protectData']> = {
        deviceId,
        input: formData,
        serviceId: 'setChargeReleaseProtect',
      };
      return result;
    },
    [deviceId],
  );

  useEffect(() => {
    if (!open) {
      setInitialValues({ ...protectData });
    }
  }, [protectData, open]);

  return (
    <>
      <Button className="pr0" type="link" onClick={setTrue}>
        下发参数
      </Button>
      <SchemaForm
        open={open}
        onOpenChange={set}
        title={'下发参数'}
        width={552}
        type={FormTypeEnum.Edit}
        columns={columns}
        initialValues={initialValues}
        editData={editSetting}
        beforeSubmit={beforeSubmit}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default ProtectForm;
