import type { FC } from 'react';
import Decoration from '../../../Decoration';
import Cell from '../../../LayoutCell';
import DigitalFlipperGroup from '../../../DigitalFlipper/Group';
import type { DigitalFlipperItemProps } from '../../../DigitalFlipper/Item';
import type { BenefitsRes } from '../type';

type Props = Omit<BenefitsRes, 'conserveEnergyReduceEmissions' | 'cumulativeTree'>;

const BenefitsEconomic: FC<Props> = (props) => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: '今日收益',
      num: props.todayEconomicPerformance,
    },
    {
      title: '本月收益',
      num: props.monthEconomicPerformance,
    },
    {
      title: '今年收益',
      num: props.yearEconomicPerformance,
    },
    {
      title: '累计收益',
      num: props.cumulativeEconomicPerformance,
    },
  ];
  return (
    <Cell width={600} height={118} left={484} top={58}>
      <Decoration disableIcon disableDecoration title="社会效益">
        <DigitalFlipperGroup config={config} />
      </Decoration>
    </Cell>
  );
};
export default BenefitsEconomic;
