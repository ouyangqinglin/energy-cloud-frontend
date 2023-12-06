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
import { formatMessage } from '@/utils';

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
        title: formatMessage({ id: 'device.upgradeVersion', defaultMessage: '升级版本' }),
        dataIndex: 'packageId',
        valueType: 'select',
        formItemProps: {
          rules: [{ required: true, message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) + formatMessage({ id: 'device.upgradeVersion', defaultMessage: '升级版本' }) }],
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
      {formatMessage({ id: 'device.upgrades', defaultMessage: '升级' })}
      </Button>
      <SchemaForm
        open={open}
        onOpenChange={set}
        title={formatMessage({ id: 'device.remoteUpgrade', defaultMessage: '远程升级' })}
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
