import type { FC } from 'react';
import Decoration from '../../Decoration';
import Cell from '../../LayoutCell';
import DigitalFlipperGroup from '../../DigitalFlipper/Group';
import type { DigitalFlipperItemProps } from '../../DigitalFlipper/Item';

const BenefitsEconomic: FC = () => {
  const config: DigitalFlipperItemProps[] = [
    {
      title: '今日收益',
      num: 123,
    },
    {
      title: '本月收益',
      num: 123,
    },
    {
      title: '今年收益',
      num: 8025,
    },
    {
      title: '累计收益',
      num: 28025,
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
