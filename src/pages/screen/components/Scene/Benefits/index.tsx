import type { FC } from 'react';
import BenefitsEconomic from './Economic';
import { useRequest } from 'umi';
import { getBenefits } from './service';
import BenefitSocial from './Social';
import { DEFAULT_DATA } from './config';
import { defaults, isEmpty } from 'lodash';
import type { BenefitsRes } from './type';

const Benefit: FC = () => {
  const { data: resData } = useRequest(getBenefits);
  const formatData = (res: BenefitsRes | undefined) => {
    const transformData = res ?? {};
    if (!res) {
      return transformData;
    }
    const excludeKeys = ['siteId'];
    Reflect.ownKeys(res).forEach((key) => {
      let value = res[key];
      if (!excludeKeys.includes(value)) {
        value = isEmpty(value) ? undefined : Math.floor(Number(value));
      }
      transformData[key] = value;
    });
    return transformData;
  };
  const data: BenefitsRes = defaults(formatData(resData), DEFAULT_DATA);

  return (
    <>
      <BenefitSocial {...data} />
      <BenefitsEconomic {...data} />
    </>
  );
};
export default Benefit;
