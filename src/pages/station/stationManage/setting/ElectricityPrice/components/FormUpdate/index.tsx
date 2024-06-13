import { useEffect, useCallback } from 'react';
import { useModel } from 'umi';
import { Button, Form, message } from 'antd';
import YTModalForm from '@/components/YTModalForm';
import { FormOperations } from '@/components/YTModalForm/typing';
import useSafeTimeRangeColum from './SafeTimeSelect';

import type { BasePriceInfo, FormUpdateProps } from './type';
import type { ProFormColumnsType } from '@ant-design/pro-form';
import moment from 'moment';
import { formatMessage } from '@/utils';

const DEFAULT_PROPS = {
  layout: 'vertical' as 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

export const FormUpdate = <FormData extends BasePriceInfo, Param = Record<string, any>>(
  props: FormUpdateProps<FormData, Param>,
) => {
  const {
    operations,
    titleCreate,
    titleUpdate,
    onFinishUpdate,
    onFinishCreate,
    columns,
    request,
    id,
    setType,
    onSuccess,
    ...resetProps
  } = props;
  const isCreate = operations === FormOperations.CREATE;
  const title = isCreate ? titleCreate : titleUpdate;
  const [form] = Form.useForm();
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id }));

  const { resetTimeStore, colum: timeColum } = useSafeTimeRangeColum();
  const statusColumn: ProFormColumnsType = {
    dataIndex: 'status',
    formItemProps: {
      hidden: true,
    },
  };
  const convertTimeData = (data: FormData) => {
    if (!data) {
      return {} as FormData;
    }
    const effectiveTimeList =
      data?.effectiveTimeList?.map((it) => {
        return {
          ...it,
          effectiveDateScoped: [it.effectiveTime, it.expirationTime],
        };
      }) ?? [];

    const hoursPriceList = data?.hoursPriceList?.map?.((time) => {
      return {
        ...time,
        timeRange: [
          moment(moment().format('YYYY-MM-DD ') + time.intervalStartTime),
          moment(
            moment().format('YYYY-MM-DD ') +
              (time.intervalEndTime == '24:00' ? '23:59' : time.intervalEndTime),
          ),
        ],
      };
    });
    return { ...data, effectiveTimeList, hoursPriceList };
  };
  const onFinish = useCallback(
    (formData) => {
      formData?.effectiveTimeList?.forEach?.((item: any) => {
        item.effectiveTime = moment(item.effectiveDateScoped[0]).format('MM-DD');
        item.expirationTime = moment(item.effectiveDateScoped[1]).format('MM-DD');
      });
      formData?.hoursPriceList?.forEach?.((item: any) => {
        item.intervalStartTime = moment(moment().format('YYYY-MM-DD ') + item.timeRange[0]).format(
          'HH:mm',
        );
        const endTime = moment(moment().format('YYYY-MM-DD ') + item.timeRange[1]).format('HH:mm');
        item.intervalEndTime = endTime == '23:59' ? '24:00' : endTime;
      });
      const run = isCreate ? onFinishCreate : onFinishUpdate;
      return run({ type: setType, ...formData, siteId, id }, {}).then(({ data }) => {
        if (data) {
          message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
          onSuccess?.();
          return true;
        }
      });
    },
    [id, isCreate, onFinishCreate, onFinishUpdate],
  );

  useEffect(() => {
    if (props.visible) {
      form?.resetFields();
      if (id) {
        request({ id }, {}).then(({ data }) => {
          form?.setFieldsValue(convertTimeData(data));
        });
      }
    }
  }, [props.visible, form, id, request]);

  return (
    <YTModalForm<FormData>
      form={form}
      title={title}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={[...columns(timeColum, setType), statusColumn]}
      onSubmitCapture={() => {
        resetTimeStore();
      }}
      operations={operations}
      onFinish={onFinish}
      submitter={{
        searchConfig: {
          resetText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
        },
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
        render: (formProps, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              type="primary"
              key="save"
              onClick={() => {
                form?.setFieldsValue?.({ status: 0 });
                formProps.submit();
              }}
            >
              {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
            </Button>,
            <Button
              type="primary"
              key="saveAndeffect"
              onClick={() => {
                form?.setFieldsValue?.({ status: 1 });
                formProps.submit();
              }}
            >
              {formatMessage({ id: 'common.saveAndeffect', defaultMessage: '保存并生效' })}
            </Button>,
          ];
        },
      }}
      {...resetProps}
    />
  );
};
