import YTModalForm from '@/components/YTModalForm';
import { FormOperations } from '@/components/YTModalForm/typing';
import dayjs from 'dayjs';
import useSafeTimeRangeColum from './SafeTimeRange';
import type { BasePriceInfo, FormUpdateProps } from './type';

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
    ...resetProps
  } = props;
  const isCreate = operations === FormOperations.CREATE;
  const title = isCreate ? titleCreate : titleUpdate;

  const { resetTimeStore, colum: timeColum } = useSafeTimeRangeColum();
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

    const hoursPriceList = data.hoursPriceList.map((time) => {
      return {
        ...time,
        timeRange: [dayjs(time.intervalStartTime, 'HH:mm'), dayjs(time.intervalEndTime, 'HH:mm')],
      };
    });

    return { ...data, effectiveTimeList, hoursPriceList };
  };
  const onFinish = isCreate ? onFinishCreate : onFinishUpdate;

  return (
    <YTModalForm<FormData>
      title={title}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={columns(timeColum)}
      onSubmitCapture={() => {
        resetTimeStore();
      }}
      operations={operations}
      onFinish={async (params) => {
        await onFinish(params, {});
        return true;
      }}
      request={(param) => {
        return request(param, {}).then((res) => {
          return convertTimeData(res?.data);
        });
      }}
      {...resetProps}
    />
  );
};
