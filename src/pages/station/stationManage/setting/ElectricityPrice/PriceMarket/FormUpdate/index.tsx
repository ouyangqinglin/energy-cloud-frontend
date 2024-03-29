import { columns } from './config';
import type { MarketElectricityPriceInfo, MarketElectricityPriceParams } from '../type';
import { createMarketPrice, getMarketPrice, updateMarketPrice } from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';
import { formatMessage } from '@/utils';

export const FormUpdateForMarket = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<MarketElectricityPriceInfo, MarketElectricityPriceParams>
      titleCreate={formatMessage({ id: 'common.new', defaultMessage: '新建' })}
      titleUpdate={formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
      columns={columns}
      onFinishUpdate={updateMarketPrice}
      onFinishCreate={createMarketPrice}
      request={getMarketPrice}
      {...props}
    />
  );
};
