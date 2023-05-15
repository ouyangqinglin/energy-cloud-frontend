import type { FC } from 'react';
import Decoration from '../../../Decoration';
import Cell from '../../../LayoutCell';
import DigitalFlipperGroup from '../../../DigitalFlipper/Group';
import type { DigitalFlipperItemProps } from '../../../DigitalFlipper/Item';
import type { BenefitsRes } from '../type';

type Props = Pick<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree'>;

const BenefitSocial: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: '累计节能减排',
      unit: '吨',
      comma: true,
      num: props.conserveEnergyReduceEmissions,
    },
    {
      title: '等效种植树木',
      unit: '颗',
      comma: true,
      num: props.cumulativeTree,
    },
  ];

  return (
    <Cell width={328} height={118} left={1108} top={58}>
      <Decoration disableIcon disableDecoration title="社会效益">
        <DigitalFlipperGroup config={config} />
      </Decoration>
    </Cell>
  );
};
export default BenefitSocial;
