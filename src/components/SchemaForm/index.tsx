/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-30 09:30:58
 * @LastEditTime: 2023-11-27 13:57:43
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SchemaForm\index.tsx
 */
import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import { useRequest } from 'umi';
import { message } from 'antd';
import type { ProFormInstance, ProFormLayoutType } from '@ant-design/pro-components';
import { BetaSchemaForm, ProConfigProvider } from '@ant-design/pro-components';
import type { CombineService } from '@ahooksjs/use-request/lib/types';
import { merge } from 'lodash';
import { useBoolean } from 'ahooks';
import { tableSelectValueTypeMap } from '../TableSelect';
import type { FormSchema } from '@ant-design/pro-components/node_modules/@ant-design/pro-form/es/components/SchemaForm/index.d.ts';
import type { InferResponseData } from '@/utils/request';
import { formatMessage } from '@/utils';

export enum FormTypeEnum {
  Add = 'add',
  Edit = 'edit',
  Detail = 'detail',
}

export type SchemaFormProps<FormData = any, ValueType = any, ParamData = any> = Omit<
  FormSchema<FormData, ValueType>,
  'LayoutType'
> & {
  width?: string | number;
  LayoutType?: ProFormLayoutType;
  reactRef?: React.Ref<ProFormInstance | undefined>;
  formRef?: React.Ref<ProFormInstance | undefined>;
  type?: FormTypeEnum;
  suffixTitle?: string;
  id?: string | number;
  idKey?: string;
  getData?: CombineService<InferResponseData<FormData>, any>;
  addData?: CombineService<any, any>;
  editData?: CombineService<any, any>;
  afterRequest?: (
    formData: FormData,
    formRef: React.Ref<ProFormInstance | undefined>,
  ) => FormData | void;
  beforeSubmit?: (formData: FormData) => boolean | void | ParamData;
  onSuccess?: (formData: FormData | ParamData) => boolean | void;
  onError?: (data: any) => void;
  extraData?: Record<string, any>;
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
  onRef?: (value: React.Ref<ProFormInstance | undefined>) => void;
};

const SchemaForm = <
  FormData = Record<string, any>,
  ValueType = 'text',
  ParamData = Record<string, any>,
>(
  props: SchemaFormProps<FormData, ValueType, ParamData>,
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
    onError,
    extraData,
    open,
    onOpenChange,
    layoutType = 'ModalForm',
    submitter,
    onValuesChange,
    initialValues,
    onRef,
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
    const result = formRef || schemaFormRef;
    onRef?.(result);
    return result;
  }, [formRef, schemaFormRef]);

  const title = useMemo(() => {
    if (type === FormTypeEnum.Detail) {
      return suffixTitle + formatMessage({ id: 'common.view', defaultMessage: '详情' });
    } else {
      return (
        (type === FormTypeEnum.Add
          ? formatMessage({ id: 'common.newBuilt', defaultMessage: '新建' })
          : formatMessage({ id: 'common.edit', defaultMessage: '编辑' })) + suffixTitle
      );
    }
  }, [type, suffixTitle]);

  const mergedSubmitter = useMemo(() => {
    if (typeof submitter == 'boolean') {
      return submitter;
    } else {
      const defaultSubmitter: FormSchema['submitter'] =
        layoutType !== 'QueryFilter'
          ? {
              submitButtonProps: {
                disabled: disableSubmitter,
              },
            }
          : {};
      return merge(defaultSubmitter, submitter);
    }
  }, [submitter, disableSubmitter]);

  const mergedOnValuesChange = useCallback(
    (changedValues, allValues) => {
      if (layoutType !== 'QueryFilter') {
        setDisableSubmitterFalse();
      }
      onValuesChange?.(changedValues, allValues);
    },
    [onValuesChange, layoutType],
  );

  const onFinish = useCallback(
    (formData: FormData) => {
      const request = type == FormTypeEnum.Add ? runAdd : runEdit;
      const beforeSubmitResult = beforeSubmit?.(formData);
      if (beforeSubmitResult !== false) {
        return request?.({
          ...((beforeSubmitResult as ParamData) ?? formData),
          [idKey]: id,
          ...(extraData || {}),
        })
          ?.then?.((data) => {
            if (data) {
              const result = onSuccess?.((beforeSubmitResult as ParamData) ?? formData);
              if (result !== false) {
                message.success(
                  formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }),
                );
                if (layoutType !== 'QueryFilter') {
                  setDisableSubmitterTrue();
                }
                return true;
              } else {
                return false;
              }
            } else {
              onError?.(data);
              return false;
            }
          })
          ?.catch((data) => {
            onError?.(data);
          });
      } else {
        return Promise.resolve(false);
      }
    },
    [type, id, runAdd, runEdit, onSuccess, extraData, layoutType, beforeSubmit],
  );

  useEffect(() => {
    if (open || layoutType === 'QueryFilter' || layoutType === 'Form') {
      if (layoutType !== 'QueryFilter') {
        setDisableSubmitterTrue();
      }
      myFormRef?.current?.resetFields?.();
      if (type !== FormTypeEnum.Add && id) {
        runGet?.({ [idKey]: id })?.then?.((data) => {
          const requestData = data || ({} as FormData);
          const processResult = afterRequest?.(requestData, myFormRef);
          myFormRef?.current?.setFieldsValue?.(processResult ?? (requestData as any));
        });
      } else if (initialValues) {
        myFormRef?.current?.setFieldsValue?.(initialValues as any);
      }
    }
  }, [open, id, type, myFormRef, layoutType, initialValues]);

  return (
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
        gutter: [24, 0],
      }}
      submitter={mergedSubmitter}
      onValuesChange={mergedOnValuesChange}
      {...restProps}
    />
  );
};

export const SchemaFormProvider = <
  FormData = Record<string, any>,
  ValueType = 'text',
  ParamData = Record<string, any>,
>(
  props: SchemaFormProps<FormData, ValueType, ParamData>,
) => {
  return (
    <ProConfigProvider valueTypeMap={tableSelectValueTypeMap}>
      <SchemaForm<FormData, ValueType, ParamData> {...props} />
    </ProConfigProvider>
  );
};

export default SchemaForm;
