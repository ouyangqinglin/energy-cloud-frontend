/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-25 14:50:53
 * @LastEditTime: 2023-11-14 08:45:31
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Configuration\RemoteUpgrade\UpgradeForm\index.tsx
 */
import { Button, message } from 'antd';
import React, { useCallback, useMemo } from 'react';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { useBoolean } from 'ahooks';
import { upgradeDevice } from '@/services/equipment';
import { UpgradeFormType } from '../typing';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { OptionType } from '@/types';

const UpgradeForm: React.FC<UpgradeFormType> = (props) => {
  const { deviceId, versionItems } = props;

  const [open, { set, setTrue }] = useBoolean(false);

  const columns = useMemo<ProFormColumnsType[]>(() => {
    const options: OptionType[] = [];
    versionItems?.forEach?.((item) => {
      options.push({
        value: item?.id || '',
        label: item?.version || '',
        disabled: item?.status === 0,
      });
    });
    return [
      {
        title: '升级版本',
        dataIndex: 'packageId',
        valueType: 'select',
        formItemProps: {
          rules: [{ required: true, message: '请选择升级版本' }],
        },
        fieldProps: {
          options,
        },
      },
    ];
  }, [versionItems]);

  return (
    <>
      <Button className="pr0" type="link" onClick={setTrue}>
        升级
      </Button>
      <SchemaForm
        open={open}
        onOpenChange={set}
        title={'远程升级'}
        width={552}
        type={FormTypeEnum.Edit}
        columns={columns}
        editData={upgradeDevice}
        extraData={{ deviceId }}
      />
    </>
  );
};

export default UpgradeForm;
