/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-09 10:20:46
 * @LastEditTime: 2023-06-09 14:07:35
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationManage\info\stationInfo\components\customPageForm.tsx
 */
import React, { useRef, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { editDefaultPage, getCustomPage } from '../service';
import { getDefaultPage } from '@/services/station';
import { pageType } from '@/utils/dictionary';

type CustomPageFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  siteId: string;
};

const CustomPageForm: React.FC<CustomPageFormProps> = (props) => {
  const { open, onOpenChange, siteId } = props;
  const formRef = useRef<ProFormInstance>();

  const requestCustomPage = useCallback(() => {
    return getCustomPage().then(({ data }) => {
      return data?.map?.((item: any) => {
        return {
          label: item.name,
          value: item.id + '',
        };
      });
    });
  }, []);

  const onFinish = useCallback(
    (formData) => {
      return editDefaultPage({ ...formData, siteId }).then(({ code }) => {
        if (code == 200) {
          message.success('保存成功');
          return true;
        }
      });
    },
    [siteId],
  );

  useEffect(() => {
    if (open) {
      formRef?.current?.resetFields?.();
      getDefaultPage(siteId).then(({ data }) => {
        formRef?.current?.setFieldsValue({
          homeType: data?.homeType + '',
          customPageId: data?.customPageId + '',
        });
      });
    }
  }, [open, siteId]);

  const columns: ProFormColumnsType[] = [
    {
      title: '默认首页',
      dataIndex: 'homeType',
      valueType: 'radio',
      valueEnum: pageType,
      formItemProps: {
        rules: [{ required: true, message: '默认首页必选' }],
      },
    },
    {
      valueType: 'dependency',
      name: ['homeType'],
      columns: ({ homeType }) => {
        return homeType == 1
          ? [
              {
                title: '定制页',
                dataIndex: 'customPageId',
                valueType: 'select',
                request: requestCustomPage,
                formItemProps: {
                  rules: [{ required: true, message: '定制页必选' }],
                },
              },
            ]
          : [];
      },
    },
  ];

  return (
    <>
      <BetaSchemaForm
        formRef={formRef}
        layoutType="ModalForm"
        title="选择默认首页"
        width="460px"
        open={open}
        onOpenChange={onOpenChange}
        columns={columns}
        onFinish={onFinish}
      />
    </>
  );
};

export default CustomPageForm;
