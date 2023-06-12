import DecorationCarousel from '@/pages/screen/components/DecorationCarousel';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipperV2/Group';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipperV2/Item';
import Cell from '@/pages/screen/components/LayoutCell';
import type { FC } from 'react';
import type { BenefitsRes } from '../type';

type Props = Pick<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree'>;

const BenefitSocial: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: '节约标准煤',
      unit: '吨',
      comma: true,
      num: props.conserveEnergyReduceEmissions,
    },
    {
      title: 'CO₂减排量',
      unit: '吨',
      comma: true,
      num: props.conserveEnergyReduceEmissions,
    },
    {
      title: '等效植树量',
      unit: '颗',
      comma: true,
      num: props.cumulativeTree,
    },
  ];

  return (
    <Cell width={474} height={113} left={991} top={81}>
      <DecorationCarousel disableDecoration title="社会效益">
        <DigitalFlipperGroup config={config} />
      </DecorationCarousel>
    </Cell>
  );
};
export default BenefitSocial;
