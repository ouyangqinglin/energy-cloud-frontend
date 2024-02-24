import { columns } from './config';
import type { ChargingElectricityPriceInfo, ChargingElectricityPriceParams } from '../type';
import { createChargingPrice, getChargingPrice, updateChargingPrice } from '../service';

import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { FormUpdate } from '../../components/FormUpdate';
import { formatMessage } from '@/utils';

export const FormUpdateForCharging = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<ChargingElectricityPriceInfo, ChargingElectricityPriceParams>
      titleCreate={formatMessage({ id: 'common.add', defaultMessage: '新建' })}
      titleUpdate={formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
      columns={columns}
      onFinishUpdate={updateChargingPrice}
      onFinishCreate={createChargingPrice}
      request={getChargingPrice}
      {...props}
    />
  );
};
