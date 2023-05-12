import type { FC } from 'react';
import useWebsocket from '@/pages/screen/useWebsocket';
import BenefitsEconomic from './Economic';
import { useRequest } from 'umi';

const BenefitSocial: FC = () => {
  const { data } = useRequest(getBenefits);

  return (
    <>
      <BenefitSocial />
      <BenefitsEconomic />
    </>
  );
};
export default BenefitSocial;
