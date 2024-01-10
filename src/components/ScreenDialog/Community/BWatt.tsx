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
import { formatMessage } from '@/utils';

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
          message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
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
        title: formatMessage({ id: 'device.item', defaultMessage: '项目' }) + ' ID',
        dataIndex: 'projectId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'device.item', defaultMessage: '项目' }) +
                ' ID',
            },
          ],
        },
      },
      {
        title: 'BMS ID',
        dataIndex: 'bmsId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) + 'BMS ID',
            },
          ],
        },
      },
      {
        title: 'EMS ID',
        dataIndex: 'emsId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) + 'EMS ID',
            },
          ],
        },
      },
      {
        title: 'PCS ID',
        dataIndex: 'pcsId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) + 'PCS ID',
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.cellTemperature', defaultMessage: '单体温度' }) + ' ID',
        dataIndex: 'temperatureDeviceId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'device.cellTemperature', defaultMessage: '单体温度' }) +
                ' ID',
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.cellVoltage', defaultMessage: '单体电压' }) + ' ID',
        dataIndex: 'voltageDeviceId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'device.cellVoltage', defaultMessage: '单体电压' }) +
                ' ID',
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }) + ' ID',
        dataIndex: 'airConditionerId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'device.airConditioner', defaultMessage: '空调' }) +
                ' ID',
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.systemClock', defaultMessage: '系统时钟' }) + ' ID',
        dataIndex: 'clockDeviceId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({ id: 'device.systemClock', defaultMessage: '系统时钟' }) +
                ' ID',
            },
          ],
        },
      },
      {
        title:
          formatMessage({ id: 'device.energyConsumptionStatistics', defaultMessage: '能耗统计' }) +
          ' ID',
        dataIndex: 'statisticsDeviceId',
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseEnter', defaultMessage: '请输入' }) +
                formatMessage({
                  id: 'device.energyConsumptionStatistics',
                  defaultMessage: '能耗统计',
                }) +
                ' ID',
            },
          ],
        },
      },
      {
        title: formatMessage({ id: 'device.thirdPartySite', defaultMessage: '第三方站点' }) + ' ID',
        dataIndex: 'thirdSiteId',
        valueType: 'select',
        dependencies: ['loadDevice'],
        request: requestStation,
        formItemProps: {
          rules: [
            {
              required: true,
              message:
                formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }) +
                formatMessage({ id: 'device.thirdPartySite', defaultMessage: '第三方站点' }) +
                ' ID',
            },
          ],
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
        title={formatMessage({
          id: 'device.setCommunicationInformation',
          defaultMessage: '设置通信信息',
        })}
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
