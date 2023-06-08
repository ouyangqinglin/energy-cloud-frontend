import { columns } from './config';
import type { ChargingElectricityPriceInfo, ChargingElectricityPriceParams } from '../type';
import { createChargingPrice, getChargingPrice, updateChargingPrice } from '../service';

import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { FormUpdate } from '../../components/FormUpdate';

export const FormUpdateForCharging = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<ChargingElectricityPriceInfo, ChargingElectricityPriceParams>
      titleCreate={`新增充电电价规则`}
      titleUpdate={`编辑充电电价规则`}
      columns={columns}
      onFinishUpdate={updateChargingPrice}
      onFinishCreate={createChargingPrice}
      request={getChargingPrice}
      {...props}
    />
  );
};
