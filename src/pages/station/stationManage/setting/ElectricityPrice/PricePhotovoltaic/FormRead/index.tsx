import { columns } from './config';
import type { PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams } from '../type';
import { getPhotovoltaicPrice } from '../service';
import { FormRead } from '../../components/FormRead';
import type { FormReadBaseProps } from '../../components/FormRead/type';

export const FormReadForCharging = (props: FormReadBaseProps) => {
  return (
    <FormRead<PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams>
      title={'光伏上网电价规则详情'}
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
