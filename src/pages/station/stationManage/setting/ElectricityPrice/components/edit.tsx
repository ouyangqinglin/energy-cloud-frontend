import { saveCustomerInfo } from '../service';
import YTModalForm from '@/components/YTModalForm';
import type { FormOperations } from '@/components/YTModalForm/typing';
import useSafeTimeRangeColum from './SafeTimeRange';
import { columns } from './config';
import type { MarketElectricityPriceInfo } from './type';
import { getMarketPrice } from './service';
import dayjs from 'dayjs';

const DEFAULT_PROPS = {
  layout: 'vertical' as 'vertical',
  labelCol: { flex: 'auto' },
  wrapperCol: { flex: 'auto' },
};

export const UpdateModal = (props: {
  visible: boolean;
  onVisibleChange: (state: boolean) => void;
  operations: FormOperations;
  initialValues?: any;
}) => {
  const { resetTimeStore, colum: timeColum } = useSafeTimeRangeColum();
  const convertTimeData = (data: MarketElectricityPriceInfo) => {
    if (!data) {
      return {} as MarketElectricityPriceInfo;
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
    console.log({ ...data, effectiveTimeList, hoursPriceList });

    return { ...data, effectiveTimeList, hoursPriceList };
  };
  return (
    <YTModalForm<MarketElectricityPriceInfo>
      title={'新增市电电价规则'}
      {...DEFAULT_PROPS}
      colProps={{
        span: 24,
      }}
      layoutType={'ModalForm'}
      columns={columns(timeColum)}
      onSubmitCapture={() => {
        resetTimeStore();
      }}
      onFinish={async (values) => {
        console.log(values);
        await saveCustomerInfo(values);
        return true;
      }}
      request={(param) => {
        return getMarketPrice(param).then((res) => {
          return convertTimeData(res.data);
        });
      }}
      {...props}
    />
  );
};
