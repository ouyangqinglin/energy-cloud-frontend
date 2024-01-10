import DecorationCarousel from '@/pages/screen/components/DecorationCarousel';
import DigitalFlipperGroup from '@/pages/screen/components/DigitalFlipperV2/Group';
import type { DigitalFlipperItemProps } from '@/pages/screen/components/DigitalFlipperV2/Item';
import Cell from '@/pages/screen/components/LayoutCell';
import type { FC } from 'react';
import type { BenefitsRes } from '../type';
import { formatMessage } from '@/utils';

type Props = Pick<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree' | 'coal'>;

const BenefitSocial: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: formatMessage({ id: 'screen.saveStandardCoal', defaultMessage: '节约标准煤' }),
      unit: formatMessage({ id: 'screen.ton', defaultMessage: '吨' }),
      comma: true,
      num: props.coal,
    },
    {
      title: formatMessage({ id: 'screen.emissionReduction', defaultMessage: 'CO₂减排量' }),
      unit: formatMessage({ id: 'screen.ton', defaultMessage: '吨' }),
      comma: true,
      num: props.conserveEnergyReduceEmissions,
    },
    {
      title: formatMessage({ id: 'screen.equivalentTreePlanting', defaultMessage: '等效植树量' }),
      unit: formatMessage({ id: 'screen.tree', defaultMessage: '棵' }),
      comma: true,
      num: props.cumulativeTree,
      floatLength: 0,
    },
  ];

  return (
    <Cell width={474} height={113} left={972} top={81}>
      <DecorationCarousel
        disableDecoration
        title={formatMessage({ id: 'screen.socialContribution', defaultMessage: '社会贡献' })}
      >
        <DigitalFlipperGroup config={config} />
      </DecorationCarousel>
    </Cell>
  );
};
export default BenefitSocial;
