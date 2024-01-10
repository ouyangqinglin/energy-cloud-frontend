import DecorationCarousel from '@/pages/screen/components/DecorationCarousel';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipperV2/Group';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipperV2/Item';
import Cell from '@/pages/screen/components/LayoutCell';
import type { FC } from 'react';
import type { BenefitsRes } from '../type';
import { formatMessage } from '@/utils';

type Props = Omit<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree'>;

const BenefitsEconomic: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: formatMessage({ id: 'screen.currentMonthIncome', defaultMessage: '当月收益' }),
      comma: true,
      num: props.monthEconomicPerformance,
      numStyle: {
        backgroundImage: 'linear-gradient(180deg, #fff 0%, #FFDD9B 82%, #FFC34F 100%)',
      },
    },
    {
      title: formatMessage({ id: 'screen.currentYearIncome', defaultMessage: '当年收益' }),
      comma: true,
      num: props.yearEconomicPerformance,
      numStyle: {
        backgroundImage: 'linear-gradient(180deg, #fff 0%, #FFDD9B 82%, #FFC34F 100%)',
      },
    },
    {
      title: formatMessage({ id: 'screen.accumulatedIncome', defaultMessage: '累计收益' }),
      comma: true,
      num: props.cumulativeEconomicPerformance,
      numStyle: {
        backgroundImage: 'linear-gradient(180deg, #fff 0%, #FFDD9B 82%, #FFC34F 100%)',
      },
    },
  ];
  return (
    <Cell width={474} height={113} left={474} top={81}>
      <DecorationCarousel
        disableDecoration
        title={formatMessage({ id: 'screen.economicBenefits', defaultMessage: '经济效益' })}
      >
        <DigitalFlipperGroup config={config} />
      </DecorationCarousel>
    </Cell>
  );
};
export default BenefitsEconomic;
