/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 15:52:41
 * @LastEditTime: 2023-06-02 08:57:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\AccountCommunity.tsx
 */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { MeterCommunityType } from './data.d';
import { EquipFormType } from '@/components/EquipForm/data.d';
import { getEquipInfo, editEquipConfig } from '@/services/equipment';
import { getModalProps } from '@/components/Dialog';
import { CommunityProps } from './index';

type AccountCommunityType = CommunityProps & {
  userLabel?: string;
  passwordLabel?: string;
};

const AccountCommunity: React.FC<AccountCommunityType> = (props) => {
  const {
    id,
    open,
    onOpenChange,
    model,
    userLabel = 'mqtt用户名',
    passwordLabel = 'mqtt密码',
  } = props;
  const formRef = useRef<ProFormInstance>();
  const [equipData, setEquipData] = useState<EquipFormType>();

  const modalProps = getModalProps(model);

  useEffect(() => {
    if (open) {
      formRef?.current?.resetFields?.();
      getEquipInfo({ deviceId: id }).then(({ data }) => {
        setEquipData(data || {});
        let config = (data || {})?.config || '{}';
        try {
          config = JSON.parse(config);
        } catch (e) {
          config = {};
        }
        formRef?.current?.setFieldsValue?.(config);
      });
    }
  }, [open]);

  const onFinish = useCallback(
    (formData) => {
      return editEquipConfig({
        deviceId: id,
        productId: equipData?.productId,
        paramConfigType: 1,
        config: JSON.stringify(formData),
      }).then(({ data }) => {
        if (data) {
          message.success('保存成功');
          return true;
        }
      });
    },
    [id, equipData],
  );

  const columns: ProFormColumnsType<MeterCommunityType>[] = [
    {
      title: userLabel,
      dataIndex: 'userName',
      formItemProps: {
        rules: [{ required: true, message: userLabel + '必填' }],
      },
    },
    {
      title: passwordLabel,
      dataIndex: 'password',
      valueType: 'password',
      formItemProps: {
        rules: [{ required: true, message: passwordLabel + '必填' }],
      },
    },
  ];

  return (
    <>
      <BetaSchemaForm<MeterCommunityType>
        formRef={formRef}
        layoutType="ModalForm"
        title="设置通信信息"
        width="460px"
        visible={open}
        onVisibleChange={onOpenChange}
        columns={columns}
        onFinish={onFinish}
        modalProps={{
          centered: true,
          destroyOnClose: true,
          ...modalProps,
        }}
      />
    </>
  );
};

export default AccountCommunity;
