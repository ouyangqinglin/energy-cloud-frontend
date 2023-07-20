/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-30 09:30:58
 * @LastEditTime: 2023-07-19 16:16:38
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SchamaForm\index.tsx
 */
import React, { Ref, useMemo, useEffect, useCallback, useRef } from 'react';
import { useRequest } from 'umi';
import { message } from 'antd';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-components';
import type { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
// import type { FormSchema } from '@ant-design/pro-components/node_modules/@ant-design/pro-form/es/components/SchemaForm/index.d.ts';
import { FormTypeEnum } from '@/utils/dictionary';
import { CombineService } from '@ahooksjs/use-request/lib/types';
import { merge } from 'lodash';
import { useBoolean } from 'ahooks';

export { FormTypeEnum };

export type SchemaFormProps<FormData, ValueType> = FormSchema<FormData, ValueType> & {
  formRef?: React.Ref<ProFormInstance | undefined>;
  type?: FormTypeEnum;
  suffixTitle?: string;
  id?: string | number;
  idKey?: string;
  getData?: CombineService<any, any>;
  addData?: CombineService<any, any>;
  editData?: CombineService<any, any>;
  afterRequest?: (formData: FormData, formRef: React.Ref<ProFormInstance | undefined>) => void;
  beforeSubmit?: (formData: FormData) => boolean | void;
  onSuccess?: (formData: FormData) => boolean | void;
  extraData?: Record<string, any>;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
};

const SchemaForm = <FormData = Record<string, any>, ValueType = 'text'>(
  props: SchemaFormProps<FormData, ValueType>,
) => {
  const {
    formRef,
    type = FormTypeEnum.Add,
    suffixTitle = '',
    id,
    idKey = 'id',
    getData,
    addData,
    editData,
    afterRequest,
    beforeSubmit,
    onSuccess,
    extraData,
    open,
    onOpenChange,
    layoutType = 'ModalForm',
    submitter,
    onValuesChange,
    ...restProps
  } = props;

  const schemaFormRef = useRef<ProFormInstance>();
  const [
    disableSubmitter,
    { setTrue: setDisableSubmitterTrue, setFalse: setDisableSubmitterFalse },
  ] = useBoolean(true);

  const { run: runGet, loading: getLoading } = useRequest(getData as any, {
    manual: true,
  });
  const { run: runAdd, loading: addLoading } = useRequest(addData as any, {
    manual: true,
  });
  const { run: runEdit, loading: editLoading } = useRequest(editData as any, {
    manual: true,
  });

  const myFormRef = useMemo(() => {
    return formRef || schemaFormRef;
  }, [formRef, schemaFormRef]);

  const title = useMemo(() => {
    if (type === FormTypeEnum.Detail) {
      return suffixTitle + '详情';
    } else {
      return (type === FormTypeEnum.Add ? '新增' : '编辑') + suffixTitle;
    }
  }, [type, suffixTitle]);

  const mergedSubmitter = useMemo(() => {
    if (typeof submitter == 'boolean') {
      return submitter;
    } else {
      const defaultSubmitter: FormSchema['submitter'] = {
        submitButtonProps: {
          disabled: disableSubmitter,
        },
      };
      return merge(defaultSubmitter, submitter);
    }
  }, [submitter, disableSubmitter]);

  const mergedOnValuesChange = useCallback(
    (changedValues, allValues) => {
      setDisableSubmitterFalse();
      onValuesChange?.(changedValues, allValues);
    },
    [onValuesChange],
  );

  const onFinish = useCallback(
    (formData: FormData) => {
      const request = type == FormTypeEnum.Add ? runAdd : runEdit;
      const beforeSubmitResult = beforeSubmit?.(formData);
      if (beforeSubmitResult !== false) {
        return request?.({ ...formData, [idKey]: id, ...(extraData || {}) })?.then?.((data) => {
          if (data) {
            const result = onSuccess?.(formData);
            if (result !== false) {
              message.success('保存成功');
              setDisableSubmitterTrue();
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        });
      } else {
        return Promise.resolve(false);
      }
    },
    [type, id, runAdd, runEdit, onSuccess, extraData],
  );

  useEffect(() => {
    if (open) {
      setDisableSubmitterTrue();
      myFormRef?.current?.resetFields?.();
      if (type !== FormTypeEnum.Add && id) {
        runGet?.({ [idKey]: id })?.then?.((data) => {
          const requestData = data || {};
          afterRequest?.(requestData, myFormRef);
          myFormRef?.current?.setFieldsValue?.(requestData);
        });
      }
    }
  }, [open, id, type, myFormRef]);

  return (
    <>
      <BetaSchemaForm<FormData, ValueType>
        formRef={myFormRef}
        layoutType={layoutType}
        width="460px"
        autoFocusFirstInput
        scrollToFirstError
        modalProps={{
          centered: true,
        }}
        loading={getLoading || addLoading || editLoading}
        title={title}
        onFinish={onFinish}
        open={open}
        onOpenChange={onOpenChange}
        rowProps={{
          gutter: [16, 0],
        }}
        submitter={mergedSubmitter}
        onValuesChange={mergedOnValuesChange}
        {...restProps}
      />
    </>
  );
};

export default SchemaForm;
