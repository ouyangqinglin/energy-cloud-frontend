import { columns } from './config';
import type { PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams } from '../type';
import { getPhotovoltaicPrice } from '../service';
import { FormRead } from '../../components/FormRead';
import type { FormReadBaseProps } from '../../components/FormRead/type';
import { formatMessage } from '@/utils';

export const FormReadForCharging = (props: FormReadBaseProps) => {
  return (
    <FormRead<PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams>
      title={formatMessage({ id: 'common.detail', defaultMessage: '查看详情' })}
      columns={columns}
      request={(param) => {
        return getPhotovoltaicPrice(param).then((res) => {
          return res.data;
        });
      }}
      {...props}
    />
  );
};
