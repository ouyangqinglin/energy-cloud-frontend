/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-09-28 09:02:14
 * @LastEditTime: 2023-09-28 09:09:28
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\Community\BWatt.tsx
 */

import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import type { CommunityType } from './data.d';
import type { EquipFormType } from '@/components/EquipForm/data.d';
import { getEquipInfo, editEquipConfig, getThirdStation } from '@/services/equipment';
import { getModalProps } from '@/components/Dialog';
import { CommunityProps } from './';
import { OptionType } from '@/types';

const BWatt: React.FC<CommunityProps> = (props) => {
  const { id, type, productConfigType, open, onOpenChange, model } = props;
  const formRef = useRef<ProFormInstance>();
  const [equipData, setEquipData] = useState<EquipFormType>();

  const modalProps = getModalProps(model);

  const requestStation = useCallback(
    (params) => {
      if (params?.loadDevice) {
        return getThirdStation({
          current: 1,
          pageSize: 10000,
          productId: equipData?.productId,
        }).then(({ data }) => {
          return data?.list?.map?.((item: any) => {
            return {
              label: item?.siteName,
              value: item?.id,
            };
          });
        });
      } else {
        return Promise.resolve([]);
      }
    },
    [equipData?.productId],
  );

  const onFinish = useCallback(
    (formData) => {
      return editEquipConfig({
        deviceId: id,
        productId: equipData?.productId,
        paramConfigType: type,
        config: JSON.stringify(formData),
        productConfigType,
      }).then(({ data }) => {
        if (data) {
          message.success('保存成功');
          return true;
        }
      });
    },
    [id, equipData, productConfigType],
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
        formRef?.current?.setFieldsValue?.({ ...config, loadDevice: true });
      });
    }
  }, [open]);

  const columns = useMemo<ProFormColumnsType<CommunityType>[]>(() => {
    const result: ProFormColumnsType<CommunityType>[] = [
      {
        dataIndex: 'loadDevice',
        hideInForm: true,
      },
      {
        title: '项目 ID',
        dataIndex: 'projectId',
        formItemProps: {
          rules: [{ required: true, message: '请输入项目 ID' }],
        },
      },
      {
        title: 'BMS ID',
        dataIndex: 'bmsId',
        formItemProps: {
          rules: [{ required: true, message: '请输入BMS ID' }],
        },
      },
      {
        title: 'EMS ID',
        dataIndex: 'emsId',
        formItemProps: {
          rules: [{ required: true, message: '请输入EMS ID' }],
        },
      },
      {
        title: 'PCS ID',
        dataIndex: 'pcsId',
        formItemProps: {
          rules: [{ required: true, message: '请输入PCS ID' }],
        },
      },
      {
        title: '单体温度 ID',
        dataIndex: 'temperatureDeviceId',
        formItemProps: {
          rules: [{ required: true, message: '请输入单体温度 ID' }],
        },
      },
      {
        title: '单体电压 ID',
        dataIndex: 'voltageDeviceId',
        formItemProps: {
          rules: [{ required: true, message: '请输入单体电压 ID' }],
        },
      },
      {
        title: '空调 ID',
        dataIndex: 'airConditionerId',
        formItemProps: {
          rules: [{ required: true, message: '请输入空调 ID' }],
        },
      },
      {
        title: '系统时钟 ID',
        dataIndex: 'clockDeviceId',
        formItemProps: {
          rules: [{ required: true, message: '请输入系统时钟 ID' }],
        },
      },
      {
        title: '能耗统计 ID',
        dataIndex: 'statisticsDeviceId',
        formItemProps: {
          rules: [{ required: true, message: '请输入能耗统计 ID' }],
        },
      },
      {
        title: '第三方站点',
        dataIndex: 'thirdSiteId',
        valueType: 'select',
        dependencies: ['loadDevice'],
        request: requestStation,
        formItemProps: {
          rules: [{ required: true, message: '请选择第三方站点ID' }],
        },
        fieldProps: (form) => {
          return {
            onChange: (_: any, option: OptionType) => {
              form?.setFieldValue('thirdSiteName', option?.label);
            },
            getPopupContainer: (triggerNode: any) => triggerNode?.parentElement,
          };
        },
      },
      {
        dataIndex: 'thirdSiteName',
        formItemProps: {
          hidden: true,
        },
      },
    ];
    return result;
  }, [requestStation, productConfigType]);

  return (
    <>
      <BetaSchemaForm<CommunityType>
        formRef={formRef}
        layoutType="ModalForm"
        title="设置通信信息"
        width={552}
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
    </>
  );
};

export default BWatt;
