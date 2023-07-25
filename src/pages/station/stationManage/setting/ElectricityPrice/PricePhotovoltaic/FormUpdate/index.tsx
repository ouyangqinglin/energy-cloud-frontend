import { columns } from './config';
import type { PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams } from '../type';
import { createPhotovoltaicPrice, getPhotovoltaicPrice, updatePhotovoltaicPrice } from '../service';

import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { FormUpdate } from '../../components/FormUpdate';

export const FormUpdateForCharging = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<PhotovoltaicElectricityPriceInfo, PhotovoltaicElectricityPriceParams>
      titleCreate={`新建`}
      titleUpdate={`编辑`}
      columns={columns}
      onFinishUpdate={updatePhotovoltaicPrice}
      onFinishCreate={createPhotovoltaicPrice}
      request={getPhotovoltaicPrice}
      {...props}
    />
  );
};
