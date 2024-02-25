import { columns } from './config';
import type { MarketElectricityPriceInfo } from '../type';
import { getMarketPrice } from '../service';
import { FormRead } from '../../components/FormRead';
import type { FormReadBaseProps } from '../../components/FormRead/type';
import { formatMessage } from '@/utils';

export const FormReadForMarket = (props: FormReadBaseProps) => {
  return (
    <FormRead<MarketElectricityPriceInfo, any>
      title={formatMessage({ id: 'common.detail', defaultMessage: '查看详情' })}
      columns={columns}
      request={(param) => {
        return getMarketPrice(param).then((res) => {
          return res?.data;
        });
      }}
      {...props}
    />
  );
};
