import type { FC } from 'react';
import BenefitsEconomic from './Economic';
import { useRequest } from 'umi';
import { getBenefits } from './service';
import BenefitSocial from './Social';
import { isEmpty } from 'lodash';
import type { BenefitsRes } from './type';

const Benefit: FC = () => {
  const { data: resData } = useRequest(getBenefits);
  const formatData = (res: BenefitsRes | undefined) => {
    const transformData = res ?? ({} as BenefitsRes);
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
  const data: BenefitsRes = formatData(resData);

  return (
    <>
      <BenefitSocial {...data} />
      <BenefitsEconomic {...data} />
    </>
  );
};
export default Benefit;
