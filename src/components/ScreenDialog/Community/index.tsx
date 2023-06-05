/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 14:56:51
 * @LastEditTime: 2023-06-02 15:42:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\index.tsx
 */

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { CommunityType } from './data.d';
import { EquipFormType } from '@/components/EquipForm/data.d';
import { getEquipInfo, editEquipConfig, getThirdStation } from '@/services/equipment';
import { getModalProps } from '@/components/Dialog';

export type CommunityProps = {
  id: string;
  model?: string;
  open: boolean;
  onOpenChange: (value: boolean) => void;
};

const Community: React.FC<CommunityProps> = (props) => {
  const { id, open, onOpenChange, model } = props;
  const formRef = useRef<ProFormInstance>();
  const [equipData, setEquipData] = useState<EquipFormType>();

  const modalProps = getModalProps(model);

  const requestStation = useCallback(() => {
    return getThirdStation({
      current: 1,
      pageSize: 10000,
      productId: equipData?.productId,
    }).then(({ data }) => {
      return data?.list?.map?.((item: any) => {
        return {
          label: item.siteName,
          value: item.id,
        };
      });
    });
  }, [equipData?.productId]);

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
        paramConfigType: 3,
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

  const columns: ProFormColumnsType<CommunityType>[] = [
    {
      title: '第三方站点',
      dataIndex: 'thirdSiteId',
      valueType: 'select',
      request: requestStation,
      formItemProps: {
        rules: [{ required: true, message: '第三方站点ID必选' }],
      },
      fieldProps: {
        getPopupContainer: (triggerNode: any) => triggerNode?.parentElement,
      },
    },
    {
      title: '任一充电枪序列码',
      dataIndex: 'anyGnSn',
      formItemProps: {
        rules: [{ required: true, message: '必填' }],
      },
    },
  ];

  return (
    <>
      <BetaSchemaForm<CommunityType>
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

export default Community;
