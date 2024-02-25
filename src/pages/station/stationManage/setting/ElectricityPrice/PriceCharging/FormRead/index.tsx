import { columns } from './config';
import type { ChargingElectricityPriceInfo } from '../type';
import { getChargingPrice } from '../service';
import { FormRead } from '../../components/FormRead';
import type { FormReadBaseProps } from '../../components/FormRead/type';

export const FormReadForCharging = (props: FormReadBaseProps) => {
  return (
    <FormRead<ChargingElectricityPriceInfo, any>
      title={formatMessage({ id: 'common.detail', defaultMessage: '查看详情' })}
      columns={columns}
      request={(param) => {
        return getChargingPrice(param).then((res) => {
          return res.data;
        });
      }}
      {...props}
    />
  );
};
