import { FC, useMemo } from 'react';
import BenefitsEconomic from './Economic';
import { useRequest } from 'umi';
import { getBenefits } from './service';
import BenefitSocial from './Social';
import type { BenefitsRes } from './type';

const Benefit: FC = () => {
  const { data: resData } = useRequest(getBenefits);
  const data = useMemo(() => {
    const transformData = resData ?? ({} as BenefitsRes);
    if (!resData) {
      return transformData;
    }
    const excludeKeys = ['siteId'];
    Reflect.ownKeys(resData).forEach((key) => {
      const value = resData[key];
      if (!excludeKeys.includes(value)) {
        // value = isEmpty(value) ? undefined : Math.floor(Number(value));
      }
      transformData[key] = value;
    });
    return transformData;
  }, [resData]);
  return (
    <>
      <BenefitSocial {...data} />
      <BenefitsEconomic {...data} />
    </>
  );
};
export default Benefit;
