/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 15:17:19
 * @LastEditTime: 2023-06-02 10:38:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\MeterCommunity.tsx
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { MeterCommunityType } from './data.d';
import { EquipFormType } from '@/components/EquipForm/data.d';
import { getEquipInfo, editEquipConfig, getThirdStation } from '@/services/equipment';
import { getModalProps } from '@/components/Dialog';
import { CommunityProps } from './index';

const MeterCommunity: React.FC<CommunityProps> = (props) => {
  const { id, open, onOpenChange, model } = props;
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
        paramConfigType: 2,
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
      title: 'mqtt用户名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
    {
      title: 'mqtt密码',
      dataIndex: 'password',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
    {
      title: '电流变比',
      dataIndex: 'currentRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
    {
      title: '电压变比',
      dataIndex: 'voltageRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
    {
      title: '电能变比',
      dataIndex: 'energyRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
    {
      title: '功率变比',
      dataIndex: 'powerRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
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

export default MeterCommunity;
