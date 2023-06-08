import { columns } from './config';
import type { PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams } from '../type';
import { createPhotovoltaicPrice, getPhotovoltaicPrice, updatePhotovoltaicPrice } from '../service';

import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { FormUpdate } from '../../components/FormUpdate';

export const FormUpdateForCharging = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams>
      titleCreate={`新增光伏上网电价规则`}
      titleUpdate={`编辑光伏上网电价规则`}
      columns={columns}
      onFinishUpdate={updatePhotovoltaicPrice}
      onFinishCreate={createPhotovoltaicPrice}
      request={getPhotovoltaicPrice}
      {...props}
    />
  );
};
