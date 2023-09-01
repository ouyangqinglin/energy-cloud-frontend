/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-01 15:17:19
 * @LastEditTime: 2023-06-21 16:14:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\Meter.tsx
 */

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { message } from 'antd';
import { ProConfigProvider, BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import type { MeterCommunityType } from './data';
import type { EquipFormType } from '@/components/EquipForm/data.d';
import { getEquipInfo, editEquipConfig } from '@/services/equipment';
import { getModalProps } from '@/components/Dialog';
import type { CommunityProps } from './index';
import { tableTreeSelectValueTypeMap } from '@/components/TableSelect';
import type { TABLETREESELECTVALUETYPE } from '@/components/TableSelect';
import { omit } from 'lodash';

type DeviceDataType = {
  id: string;
  deviceName: string;
};

const Meter: React.FC<CommunityProps> = (props) => {
  const { id, open, onOpenChange, model } = props;
  const formRef = useRef<ProFormInstance>();
  const [equipData, setEquipData] = useState<EquipFormType>();

  const modalProps = getModalProps(model);

  const onFinish = useCallback(
    (formData: MeterCommunityType<DeviceDataType[]>) => {
      const formParams = omit(formData, ['associateDevices']);
      formParams.associateIds = formData?.associateDevices?.map?.((item) => item.id).join(',');
      return editEquipConfig({
        deviceId: id,
        name: equipData?.name,
        productId: equipData?.productId,
        paramConfigType: 2,
        config: JSON.stringify(formParams),
      }).then(({ data }) => {
        if (data) {
          message.success('保存成功');
          return true;
        }
      });
    },
    [id, equipData],
  );

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
        config.associateDevices = data?.bindList?.map((item: any) => {
          return {
            ...item,
            id: item.deviceId,
          };
        });
        formRef?.current?.setFieldsValue?.(config);
      });
    }
  }, [open]);

  const columns: ProFormColumnsType<
    MeterCommunityType<DeviceDataType[]>,
    TABLETREESELECTVALUETYPE
  >[] = [
    {
      title: 'mqtt用户名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [{ required: true, message: '请填写mqtt用户名' }],
      },
    },
    {
      title: 'mqtt密码',
      dataIndex: 'password',
      formItemProps: {
        rules: [{ required: true, message: '请填写mqtt密码' }],
      },
    },
    {
      title: '电流变比',
      dataIndex: 'currentRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '请填写电流变比' }],
      },
    },
    {
      title: '电压变比',
      dataIndex: 'voltageRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '请填写电压变比' }],
      },
    },
    {
      title: '电能变比',
      dataIndex: 'energyRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '请填写电能变比' }],
      },
    },
    {
      title: '功率变比',
      dataIndex: 'powerRatio',
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true, message: '请填写功率变比' }],
      },
    },
  ];

  return (
    <>
      <ProConfigProvider valueTypeMap={tableTreeSelectValueTypeMap}>
        <BetaSchemaForm
          formRef={formRef}
          layoutType="ModalForm"
          title="设置通信信息"
          width="600px"
          visible={open}
          onVisibleChange={onOpenChange}
          columns={columns}
          onFinish={onFinish}
          modalProps={{
            centered: true,
            destroyOnClose: true,
            ...modalProps,
          }}
          grid={true}
          colProps={{
            span: 12,
          }}
        />
      </ProConfigProvider>
    </>
  );
};

export default Meter;
