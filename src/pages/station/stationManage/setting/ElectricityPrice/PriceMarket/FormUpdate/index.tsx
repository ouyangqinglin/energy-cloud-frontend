import { columns } from './config';
import type { MarketElectricityPriceInfo, MarketElectricityPriceParams } from '../type';
import { createMarketPrice, getMarketPrice, updateMarketPrice } from '../service';
import { FormUpdate } from '../../components/FormUpdate';
import type { FormUpdateBaseProps } from '../../components/FormUpdate/type';

export const FormUpdateForMarket = (props: FormUpdateBaseProps) => {
  return (
    <FormUpdate<MarketElectricityPriceInfo, MarketElectricityPriceParams>
      titleCreate={`新增市电电价规则`}
      titleUpdate={`编辑市电电价规则`}
      columns={columns}
      onFinishUpdate={updateMarketPrice}
      onFinishCreate={createMarketPrice}
      request={getMarketPrice}
      {...props}
    />
  );
};
